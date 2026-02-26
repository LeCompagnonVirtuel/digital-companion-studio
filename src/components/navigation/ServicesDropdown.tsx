import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, TrendingUp, Users, Code, Smartphone, ShoppingCart, Cpu, Palette, PenTool, ClipboardCheck, Gift } from "lucide-react";

const serviceCategories = [
  {
    name: "Marketing",
    color: "text-accent",
    bgColor: "bg-accent/10",
    services: [
      { name: "SEO & Référencement", href: "/services/seo", icon: Search, desc: "Visibilité Google" },
      { name: "Marketing Digital", href: "/services/marketing-digital", icon: TrendingUp, desc: "Campagnes pub" },
      { name: "Community Management", href: "/services/community-management", icon: Users, desc: "Réseaux sociaux" },
    ],
  },
  {
    name: "Développement",
    color: "text-primary",
    bgColor: "bg-primary/10",
    services: [
      { name: "Développement Web", href: "/services/developpement-web", icon: Code, desc: "Sites & apps" },
      { name: "Applications Mobiles", href: "/services/applications-mobiles", icon: Smartphone, desc: "iOS & Android" },
      { name: "E-commerce", href: "/services/ecommerce", icon: ShoppingCart, desc: "Boutiques en ligne" },
      { name: "Automatisation IA", href: "/services/automatisation-ia", icon: Cpu, desc: "Intelligence artificielle" },
    ],
  },
  {
    name: "Création",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    services: [
      { name: "Design & Branding", href: "/services/design-branding", icon: Palette, desc: "Identité visuelle" },
      { name: "Création de Contenu", href: "/services/creation-contenu", icon: PenTool, desc: "Rédaction & visuels" },
    ],
  },
  {
    name: "Stratégie",
    color: "text-gold",
    bgColor: "bg-gold/10",
    services: [
      { name: "Audit Digital", href: "/services/audit-digital", icon: ClipboardCheck, desc: "Analyse complète" },
      { name: "Gadgets Numériques", href: "/services/gadgets-numeriques", icon: Gift, desc: "Cadeaux personnalisés" },
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

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  }, []);

  const handleLinkClick = useCallback(() => setIsOpen(false), []);

  return (
    <div
      className={`relative ${className ?? ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          isActive || isOpen
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Bridge to prevent gap */}
            <div className="absolute -left-8 -right-8 h-4 top-full" />
            
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[100]"
            >
              <div 
                className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
                style={{ 
                  minWidth: 'min(680px, calc(100vw - 2rem))',
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)',
                }}
              >
                <div className="p-5">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {serviceCategories.map((cat) => (
                      <div key={cat.name}>
                        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2.5 ${cat.color}`}>
                          {cat.name}
                        </h3>
                        <ul className="space-y-0.5">
                          {cat.services.map((svc) => (
                            <li key={svc.href}>
                              <Link
                                to={svc.href}
                                onClick={handleLinkClick}
                                className="group flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-150 hover:bg-secondary"
                              >
                                <div className={`flex-shrink-0 p-1.5 rounded-md ${cat.bgColor}`}>
                                  <svc.icon size={14} className={cat.color} />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-sm font-medium text-foreground block leading-tight group-hover:text-primary transition-colors">
                                    {svc.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground block mt-0.5">
                                    {svc.desc}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-secondary/50 border-t border-border/50 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Besoin d'aide pour choisir ?</span>
                  <Link
                    to="/services"
                    onClick={handleLinkClick}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Tous les services →
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
