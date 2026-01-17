import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
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
    services: [
      { name: "SEO & Référencement", href: "/services/seo", icon: Search },
      { name: "Marketing Digital", href: "/services/marketing-digital", icon: TrendingUp },
      { name: "Community Management", href: "/services/community-management", icon: Users },
    ],
  },
  {
    name: "Développement",
    color: "text-primary",
    bgColor: "bg-primary/10",
    services: [
      { name: "Développement Web", href: "/services/developpement-web", icon: Code },
      { name: "Applications Mobiles", href: "/services/applications-mobiles", icon: Smartphone },
      { name: "E-commerce", href: "/services/e-commerce", icon: ShoppingCart },
      { name: "Automatisation IA", href: "/services/automatisation-ia", icon: Cpu },
    ],
  },
  {
    name: "Création",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    services: [
      { name: "Design & Branding", href: "/services/design-branding", icon: Palette },
      { name: "Création de Contenu", href: "/services/creation-contenu", icon: PenTool },
    ],
  },
  {
    name: "Stratégie",
    color: "text-gold",
    bgColor: "bg-gold/10",
    services: [
      { name: "Audit Digital", href: "/services/audit-digital", icon: ClipboardCheck },
      { name: "Gadgets Numériques", href: "/services/gadgets-numeriques", icon: Gift },
    ],
  },
];

interface MobileServicesAccordionProps {
  isActive: boolean;
}

export function MobileServicesAccordion({ isActive }: MobileServicesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleAccordion = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const isServiceActive = (href: string) => location.pathname === href;

  return (
    <div className="w-full">
      {/* Accordion Trigger */}
      <button
        onClick={toggleAccordion}
        className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 touch-manipulation ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary"
        }`}
        aria-expanded={isOpen}
        aria-controls="mobile-services-menu"
      >
        <span>Services</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-services-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.2, delay: 0.05 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.1 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1">
              {/* Categories */}
              {serviceCategories.map((category, categoryIndex) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: categoryIndex * 0.04, duration: 0.2 }
                  }}
                  className="mb-4 last:mb-2"
                >
                  {/* Category Header */}
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${category.color}`}>
                    {category.name}
                  </h4>
                  
                  {/* Services List */}
                  <ul className="space-y-0.5">
                    {category.services.map((service) => (
                      <li key={service.href}>
                        <Link
                          to={service.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 touch-manipulation ${
                            isServiceActive(service.href)
                              ? "text-foreground bg-secondary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 active:bg-secondary"
                          }`}
                        >
                          {/* Icon */}
                          <div className={`flex-shrink-0 p-2 rounded-lg ${category.bgColor}`}>
                            <service.icon 
                              size={16} 
                              className={category.color} 
                            />
                          </div>
                          
                          {/* Service Name */}
                          <span className="flex-1">{service.name}</span>
                          
                          {/* Active Indicator */}
                          {isServiceActive(service.href) && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* View All Link */}
              <Link
                to="/services"
                className="flex items-center justify-between px-4 py-3 mt-2 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors touch-manipulation"
              >
                <span>Voir tous les services</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
