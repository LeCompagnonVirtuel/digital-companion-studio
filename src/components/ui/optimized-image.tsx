import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad"> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  aspectRatio?: string;
  blur?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  fallback,
  aspectRatio,
  blur = true,
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  // Check if already cached
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  if (error && fallback) return <>{fallback}</>;

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={cn(
        "transition-all duration-500",
        blur && !loaded && "scale-[1.02] blur-sm",
        blur && loaded && "scale-100 blur-0",
        className
      )}
      {...props}
    />
  );
};
