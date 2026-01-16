import { useState } from "react";
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
    services: [
      { name: "Design & Branding", href: "/services/design-branding", icon: Palette, description: "Identité visuelle" },
      { name: "Création de Contenu", href: "/services/creation-contenu", icon: PenTool, description: "Rédaction & visuels" },
    ],
  },
  {
    name: "Stratégie",
    color: "text-gold",
    bgColor: "bg-gold/10",
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

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Services
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-premium min-w-[700px]">
              <div className="grid grid-cols-4 gap-6">
                {serviceCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${category.color}`}>
                      {category.name}
                    </h3>
                    <ul className="space-y-1">
                      {category.services.map((service) => (
                        <li key={service.href}>
                          <Link
                            to={service.href}
                            className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-secondary"
                          >
                            <div className={`p-2 rounded-lg ${category.bgColor} transition-colors group-hover:scale-110`}>
                              <service.icon size={16} className={category.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground block truncate group-hover:text-primary transition-colors">
                                {service.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {service.description}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Besoin d'aide pour choisir ?
                </p>
                <Link
                  to="/services"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Voir tous les services →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
