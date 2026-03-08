import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { MobileServicesAccordion } from "@/components/navigation/MobileServicesAccordion";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCart } from "@/hooks/useCart";
import logoImage from "@/assets/logo.png";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Réalisations", href: "/portfolio" },
  { name: "Tarifs", href: "/pricing" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Boutique", href: "/boutique" },
  { name: "Blog", href: "/blog" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-wide">
          <div className={`flex items-center justify-between rounded-full transition-all duration-300 ${
            isScrolled 
              ? "bg-background/95 backdrop-blur-xl shadow-lg border border-border/50 px-4 py-2" 
              : "bg-background/80 backdrop-blur-md shadow-md border border-border/30 px-6 py-3"
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div 
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="hidden xl:block">
                <span className="font-display font-bold text-sm leading-tight">
                  Le <span className="text-primary">Compagnon</span>{" "}
                  <span className="text-destructive">Virtuel</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mx-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Accueil
              </Link>

              <ServicesDropdown 
                isActive={location.pathname.startsWith("/services")} 
              />

              {navLinks.filter(l => l.name !== "Accueil").map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.name === "Boutique" && <ShoppingBag size={14} />}
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              <motion.button 
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Rechercher"
              >
                <Search size={17} className="text-muted-foreground" />
              </motion.button>

              <CartDrawer>
                <motion.button 
                  className="relative p-2 rounded-full hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={17} className="text-muted-foreground" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </motion.button>
              </CartDrawer>
              
              <Button asChild size="sm" className="rounded-full px-5 bg-primary hover:bg-primary/90 shadow-md ml-1">
                <Link to="/demarrer-projet" className="flex items-center gap-2">
                  Démarrer
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[88px] bottom-4 z-50 lg:hidden flex flex-col"
            >
              <div className="bg-background rounded-2xl shadow-2xl border border-border flex flex-col max-h-full overflow-hidden">
                <div 
                  className="flex-1 overflow-y-auto overscroll-contain p-6 pb-0"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <nav className="flex flex-col gap-1">
                    <Link
                      to="/"
                      className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive("/")
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      Accueil
                    </Link>

                    <MobileServicesAccordion isActive={location.pathname.startsWith("/services")} />

                    {navLinks.filter(l => l.name !== "Accueil").map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive(link.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {link.name === "Boutique" && <ShoppingBag size={18} />}
                        {link.name}
                        {link.name === "Boutique" && itemCount > 0 && (
                          <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                            {itemCount}
                          </span>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div className="flex-shrink-0 p-6 pt-4 border-t border-border flex flex-col gap-3">
                  <Button variant="heroOutline" size="lg" asChild className="w-full">
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <Link to="/demarrer-projet">Démarrer un projet</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
