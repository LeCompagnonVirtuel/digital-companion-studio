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
      className="flex flex-wrap items-center gap-2"
    >
      <div className="flex items-center gap-2 mr-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filtrer:</span>
      </div>

      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="rounded-full"
      >
        Tous
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="rounded-full"
        >
          {categoryLabels[category] || category}
        </Button>
      ))}

      {selectedCategory && (
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={() => onCategoryChange(null)}
        >
          <X className="w-3 h-3 mr-1" />
          Effacer
        </Badge>
      )}
    </motion.div>
  );
};
