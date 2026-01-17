import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Search,
  TrendingUp,
  Users,
  Code,
  Smartphone,
  ShoppingCart,
  Cpu,
  Palette,
  PenTool,
  ClipboardCheck,
  Gift,
} from "lucide-react";

const serviceCategories = [
  {
    name: "Marketing",
    color: "text-accent",
    bgColor: "bg-accent/10",
    hoverBg: "group-hover:bg-accent/15",
    services: [
      { name: "SEO & Référencement", href: "/services/seo", icon: Search, description: "Visibilité Google" },
      { name: "Marketing Digital", href: "/services/marketing-digital", icon: TrendingUp, description: "Campagnes publicitaires" },
      { name: "Community Management", href: "/services/community-management", icon: Users, description: "Réseaux sociaux" },
    ],
  },
  {
    name: "Développement",
    color: "text-primary",
    bgColor: "bg-primary/10",
    hoverBg: "group-hover:bg-primary/15",
    services: [
      { name: "Développement Web", href: "/services/developpement-web", icon: Code, description: "Sites & applications" },
      { name: "Applications Mobiles", href: "/services/applications-mobiles", icon: Smartphone, description: "iOS & Android" },
      { name: "E-commerce", href: "/services/e-commerce", icon: ShoppingCart, description: "Boutiques en ligne" },
      { name: "Automatisation IA", href: "/services/automatisation-ia", icon: Cpu, description: "Intelligence artificielle" },
    ],
  },
  {
    name: "Création",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    hoverBg: "group-hover:bg-destructive/15",
    services: [
      { name: "Design & Branding", href: "/services/design-branding", icon: Palette, description: "Identité visuelle" },
      { name: "Création de Contenu", href: "/services/creation-contenu", icon: PenTool, description: "Rédaction & visuels" },
    ],
  },
  {
    name: "Stratégie",
    color: "text-gold",
    bgColor: "bg-gold/10",
    hoverBg: "group-hover:bg-gold/15",
    services: [
      { name: "Audit Digital", href: "/services/audit-digital", icon: ClipboardCheck, description: "Analyse complète" },
      { name: "Gadgets Numériques", href: "/services/gadgets-numeriques", icon: Gift, description: "Cadeaux personnalisés" },
    ],
  },
];

interface ServicesDropdownProps {
  isActive: boolean;
  className?: string;
}

export function ServicesDropdown({ isActive, className }: ServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced open/close to prevent flickering
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  }, []);

  // Close on link click
  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive || isOpen
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`}
        />
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge to prevent gap issues */}
            <div className="absolute left-0 right-0 h-3 top-full" />
            
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ 
                duration: 0.2, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[100]"
              style={{ 
                willChange: 'opacity, transform',
              }}
            >
              {/* Dropdown Container */}
              <div 
                className="bg-background/98 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
                style={{
                  minWidth: 'min(720px, calc(100vw - 2rem))',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div className="p-6">
                  {/* 4-Column Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceCategories.map((category, categoryIndex) => (
                      <motion.div 
                        key={category.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: categoryIndex * 0.03,
                          ease: "easeOut"
                        }}
                      >
                        {/* Category Header */}
                        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${category.color}`}>
                          {category.name}
                        </h3>
                        
                        {/* Services List */}
                        <ul className="space-y-0.5">
                          {category.services.map((service) => (
                            <li key={service.href}>
                              <Link
                                to={service.href}
                                onClick={handleLinkClick}
                                className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-secondary/80 focus:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                              >
                                {/* Icon */}
                                <div 
                                  className={`flex-shrink-0 p-2 rounded-lg ${category.bgColor} ${category.hoverBg} transition-all duration-150`}
                                >
                                  <service.icon 
                                    size={16} 
                                    className={`${category.color} transition-transform duration-150 group-hover:scale-110`} 
                                  />
                                </div>
                                
                                {/* Text Content */}
                                <div className="flex-1 min-w-0 pt-0.5">
                                  <span className="text-sm font-medium text-foreground block leading-tight group-hover:text-primary transition-colors duration-150">
                                    {service.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground mt-0.5 block">
                                    {service.description}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-muted/30 border-t border-border/50 px-6 py-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Besoin d'aide pour choisir ?
                  </p>
                  <Link
                    to="/services"
                    onClick={handleLinkClick}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                  >
                    Voir tous les services
                    <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
