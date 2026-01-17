import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryLabels: Record<string, string> = {
  formation: "Formations",
  ebook: "E-books",
  template: "Templates",
  outil: "Outils",
  service: "Services",
  pack: "Packs",
  other: "Autres",
};

export const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-nowrap items-center gap-1.5 sm:gap-2 min-w-max"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 mr-1 sm:mr-2 shrink-0">
        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
        <span className="text-xs sm:text-sm text-muted-foreground hidden xs:inline">Filtrer:</span>
      </div>

      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="rounded-full h-7 sm:h-8 px-2.5 sm:px-3 text-xs"
      >
        Tous
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="rounded-full h-7 sm:h-8 px-2.5 sm:px-3 text-xs whitespace-nowrap"
        >
          {categoryLabels[category] || category}
        </Button>
      ))}

      {selectedCategory && (
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors h-7 sm:h-8 px-2 text-xs shrink-0"
          onClick={() => onCategoryChange(null)}
        >
          <X className="w-3 h-3 mr-0.5 sm:mr-1" />
          <span className="hidden sm:inline">Effacer</span>
        </Badge>
      )}
    </motion.div>
  );
};
