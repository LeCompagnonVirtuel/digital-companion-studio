import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Globe,
  Code,
  Megaphone,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Simple markdown parser - no external dependency
const parseMarkdown = (text: string): string => {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Bullet lists
    .replace(/^[•\-]\s+(.*)$/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n/g, '<br/>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*?<\/li>)(<br\/>)?/g, '$1')
    .replace(/(<li>.*?<\/li>)+/g, '<ul class="list-disc pl-4 my-1 space-y-0.5">$&</ul>')
    // Clean up extra br after ul
    .replace(/<\/ul><br\/>/g, '</ul>');
};
type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
};

type QuickReply = {
  icon: React.ReactNode;
  label: string;
  message: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;

const quickReplies: QuickReply[] = [
  { icon: <Globe size={14} />, label: "Création de site", message: "Je souhaite créer un site web professionnel pour mon entreprise" },
  { icon: <Megaphone size={14} />, label: "Marketing digital", message: "Je veux améliorer ma visibilité en ligne et attirer plus de clients" },
  { icon: <Code size={14} />, label: "Application mobile", message: "J'ai besoin d'une application mobile pour mon business" },
  { icon: <Palette size={14} />, label: "Branding", message: "Je cherche à créer ou refaire mon identité visuelle" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary/60"
        animate={{ 
          y: [0, -6, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! 👋 Je suis l'assistant IA de **Le Compagnon Virtuel**. Je peux vous aider à :\n\n• Découvrir nos services\n• Obtenir un devis personnalisé\n• Répondre à vos questions\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    setShowQuickReplies(false);
    const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          throw new Error("Trop de requêtes. Veuillez patienter quelques instants.");
        }
        if (response.status === 402) {
          throw new Error("Service temporairement indisponible.");
        }
        throw new Error(errorData.error || "Erreur de connexion");
      }

      if (!response.body) {
        throw new Error("Pas de réponse du serveur");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message to update
      setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                  timestamp: new Date(),
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
      // Remove the empty assistant message if error occurred
      if (!assistantContent) {
        setMessages((prev) => prev.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Bonjour ! 👋 Je suis l'assistant IA de **Le Compagnon Virtuel**. Je peux vous aider à :\n\n• Découvrir nos services\n• Obtenir un devis personnalisé\n• Répondre à vos questions\n\nComment puis-je vous aider aujourd'hui ?",
        timestamp: new Date(),
      },
    ]);
    setShowQuickReplies(true);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  const chatWindowClasses = isExpanded
    ? "fixed inset-4 md:inset-8 z-50"
    : "fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)]";

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulse animation ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-xl flex items-center justify-center overflow-hidden">
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <MessageCircle size={26} className="relative z-10" />
              {/* Online indicator */}
              <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card text-card-foreground text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              initial={false}
            >
              <Zap size={12} className="inline mr-1 text-primary" />
              Besoin d'aide ?
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for expanded mode */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setIsExpanded(false)}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              layout
              className={`${chatWindowClasses} bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
            >
              {/* Header */}
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                      <Bot size={22} className="text-primary-foreground" />
                    </div>
                    <motion.span 
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      Assistant LCV
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                        IA
                      </span>
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Répond instantanément 24/7
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetChat}
                    className="w-8 h-8 rounded-lg hover:bg-muted/80"
                    title="Nouvelle conversation"
                  >
                    <RotateCcw size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-8 h-8 rounded-lg hover:bg-muted/80 hidden md:flex"
                    title={isExpanded ? "Réduire" : "Agrandir"}
                  >
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpanded(false);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                    title="Fermer"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, delay: index === messages.length - 1 ? 0 : 0 }}
                    className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 shadow-sm">
                        <Sparkles size={15} className="text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col max-w-[80%]">
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                            : "bg-muted/80 rounded-bl-md"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div 
                            className="prose prose-sm dark:prose-invert max-w-none [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1 [&_li]:my-0.5"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                          />
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      <span className={`text-[10px] text-muted-foreground mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0 shadow-sm">
                        <User size={15} className="text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.content === "" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                      <Sparkles size={15} className="text-primary" />
                    </div>
                    <div className="bg-muted/80 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                {/* Quick replies */}
                <AnimatePresence>
                  {showQuickReplies && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {quickReplies.map((reply, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          onClick={() => sendMessage(reply.message)}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                          {reply.icon}
                          {reply.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50 bg-gradient-to-t from-muted/30 to-transparent">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Écrivez votre message..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-muted/60 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-muted-foreground/60"
                      style={{ maxHeight: "120px" }}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="shrink-0 rounded-xl h-11 w-11 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                  <Sparkles size={10} className="text-primary" />
                  Propulsé par IA • Le Compagnon Virtuel
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
