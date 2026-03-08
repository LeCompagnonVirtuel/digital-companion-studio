import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Award, Clock } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface ProductGalleryProps {
  images: string[];
  title: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isLimitedOffer?: boolean;
  discountPercent?: number;
}

export const ProductGallery = ({
  images,
  title,
  isBestseller,
  isNew,
  isLimitedOffer,
  discountPercent,
}: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div
          ref={imageRef}
          className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={() => setIsZoomed(false)}
        >
          {images.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                loading="lazy"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-24 h-24 text-muted-foreground/20" />
            </div>
          )}

          {/* Zoom Lens (desktop only) */}
          {isZoomed && images.length > 0 && (
            <div
              className="absolute inset-0 hidden lg:block pointer-events-none"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundSize: "250%",
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                opacity: 1,
              }}
            />
          )}

          {/* Zoom icon hint */}
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
            <ZoomIn className="w-3.5 h-3.5" /> Survoler pour zoomer
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isBestseller && (
              <Badge className="bg-amber-500 text-white border-0 text-[10px] shadow-md">
                <Award className="w-3 h-3 mr-1" /> Best Seller
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-emerald-500 text-white border-0 text-[10px] shadow-md">Nouveau</Badge>
            )}
            {isLimitedOffer && (
              <Badge className="bg-rose-500 text-white border-0 text-[10px] shadow-md">
                <Clock className="w-3 h-3 mr-1" /> Offre Limitée
              </Badge>
            )}
          </div>

          {!!discountPercent && discountPercent > 0 && (
            <Badge className="absolute top-3 right-3 bg-rose-500 text-white border-0 text-base px-2.5 py-1 shadow-md font-bold">
              -{discountPercent}%
            </Badge>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.slice(0, 5).map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedImage(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i
                    ? "border-primary ring-2 ring-primary/20 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
