import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Code2 } from "lucide-react";

export const VideoShowcaseSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code2 size={16} />
            Démonstration
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Notre expertise <span className="gradient-text">en action</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre savoir-faire Full-Stack à travers cette démonstration concrète de nos réalisations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Gradient glow behind */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 rounded-3xl blur-2xl -z-10" />

          {/* Browser frame */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-premium overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 h-6 rounded-full bg-muted/50 mx-4 flex items-center px-3">
                <span className="text-xs text-muted-foreground truncate">lecompagnonlabs.cloud — Full-Stack Demo</span>
              </div>
            </div>

            {/* Video container */}
            <div className="relative aspect-video bg-background">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
                loop
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/fullstack-demo.mp4" type="video/mp4" />
              </video>

              {/* Play overlay */}
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                  onClick={handlePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow"
                  >
                    <Play size={32} className="text-primary-foreground ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium backdrop-blur-sm"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Full-Stack Development
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
