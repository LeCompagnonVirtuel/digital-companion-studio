import { Share2, Facebook, MessageCircle, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || "");

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-emerald-500/10 hover:text-emerald-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-500/10 hover:text-blue-600",
    },
  ];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {
        // User cancelled
      }
    }
  }, [url, title, description]);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-muted-foreground font-medium mr-1">Partager :</span>
      
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Partager sur ${link.name}`}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-lg ${link.color} transition-colors`}
            asChild
          >
            <span>
              <link.icon className="w-3.5 h-3.5" />
            </span>
          </Button>
        </a>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg hover:bg-muted transition-colors"
        onClick={handleCopy}
        title="Copier le lien"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <LinkIcon className="w-3.5 h-3.5" />
        )}
      </Button>

      {typeof navigator.share === "function" && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg hover:bg-muted transition-colors"
          onClick={handleNativeShare}
          title="Partager"
        >
          <Share2 className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}
