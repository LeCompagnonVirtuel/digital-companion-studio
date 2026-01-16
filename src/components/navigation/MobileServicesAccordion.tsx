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

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
      >
        Services
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pt-2 space-y-4">
              {serviceCategories.map((category) => (
                <div key={category.name}>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${category.color}`}>
                    {category.name}
                  </h4>
                  <ul className="space-y-1">
                    {category.services.map((service) => (
                      <li key={service.href}>
                        <Link
                          to={service.href}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <div className={`p-1.5 rounded-lg ${category.bgColor}`}>
                            <service.icon size={14} className={category.color} />
                          </div>
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Link
                to="/services"
                className="block px-4 py-2.5 text-sm font-medium text-primary"
              >
                Voir tous les services →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
