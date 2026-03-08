import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  variant?: "banner" | "inline" | "compact";
  className?: string;
}

const getEndOfDay = () => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
};

const useCountdown = () => {
  const target = useMemo(() => getEndOfDay(), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, target - now);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { hours, minutes, seconds, isExpired: diff === 0 };
};

const TimeUnit = ({ value, label, variant }: { value: number; label: string; variant: string }) => {
  const str = String(value).padStart(2, "0");

  if (variant === "compact") {
    return (
      <span className="font-mono font-bold text-xs">{str}</span>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`font-mono font-bold leading-none ${
          variant === "banner"
            ? "text-lg sm:text-2xl bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[2.5rem] sm:min-w-[3.5rem] text-center"
            : "text-base sm:text-xl bg-primary/10 rounded-lg px-2 py-1.5 min-w-[2.5rem] text-center text-primary"
        }`}
      >
        {str}
      </motion.div>
      <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider mt-1 font-medium ${
        variant === "banner" ? "text-white/70" : "text-muted-foreground"
      }`}>
        {label}
      </span>
    </div>
  );
};

export const CountdownTimer = ({ variant = "inline", className = "" }: CountdownTimerProps) => {
  const { hours, minutes, seconds, isExpired } = useCountdown();

  if (isExpired) return null;

  if (variant === "compact") {
    return (
      <span className={`inline-flex items-center gap-0.5 font-mono text-xs font-bold ${className}`}>
        <span className="bg-primary/10 text-primary rounded px-1 py-0.5">{String(hours).padStart(2, "0")}</span>
        <span className="text-muted-foreground">:</span>
        <span className="bg-primary/10 text-primary rounded px-1 py-0.5">{String(minutes).padStart(2, "0")}</span>
        <span className="text-muted-foreground">:</span>
        <span className="bg-primary/10 text-primary rounded px-1 py-0.5">{String(seconds).padStart(2, "0")}</span>
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <TimeUnit value={hours} label="heures" variant={variant} />
      <span className={`text-lg sm:text-xl font-bold self-start mt-1 ${
        variant === "banner" ? "text-white/50" : "text-muted-foreground/50"
      }`}>:</span>
      <TimeUnit value={minutes} label="min" variant={variant} />
      <span className={`text-lg sm:text-xl font-bold self-start mt-1 ${
        variant === "banner" ? "text-white/50" : "text-muted-foreground/50"
      }`}>:</span>
      <TimeUnit value={seconds} label="sec" variant={variant} />
    </div>
  );
};
