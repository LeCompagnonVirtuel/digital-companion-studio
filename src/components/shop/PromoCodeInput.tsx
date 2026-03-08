import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Loader2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface PromoResult {
  valid: boolean;
  code?: string;
  discount_percent?: number;
  discount_amount?: number;
  final_total?: number;
  error?: string;
}

interface PromoCodeInputProps {
  orderTotal: number;
  onApply: (result: PromoResult) => void;
  onClear: () => void;
  appliedCode: string | null;
}

export const PromoCodeInput = ({ orderTotal, onApply, onClear, appliedCode }: PromoCodeInputProps) => {
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode || cleanCode.length < 3) {
      setError("Entrez un code promo valide");
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('validate-promo', {
        body: { code: cleanCode, orderTotal },
      });

      if (fnError) throw new Error(fnError.message);

      if (data?.valid) {
        onApply(data);
        setError(null);
      } else {
        setError(data?.error || "Code invalide");
      }
    } catch (err: any) {
      setError("Erreur de validation. Réessayez.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setError(null);
    onClear();
  };

  if (appliedCode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600">Code appliqué</p>
            <p className="text-[10px] text-muted-foreground font-mono">{appliedCode}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear} className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive">
          <X className="w-3.5 h-3.5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Code promo"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleValidate()}
            className="pl-9 h-10 rounded-xl text-sm font-mono uppercase tracking-wider"
            maxLength={30}
          />
        </div>
        <Button
          onClick={handleValidate}
          disabled={isValidating || !code.trim()}
          variant="outline"
          className="h-10 px-4 rounded-xl text-xs font-semibold shrink-0"
        >
          {isValidating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Appliquer"}
        </Button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11px] text-destructive font-medium pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
