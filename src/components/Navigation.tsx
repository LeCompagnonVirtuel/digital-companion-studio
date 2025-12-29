import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Réalisations", href: "/portfolio" },
  { name: "Tarifs", href: "/pricing" },
  { name: "À propos", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div className="container-wide">
          <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${
            isScrolled 
              ? "glass-strong px-6 py-3" 
              : "bg-transparent px-0 py-0"
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-glow"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.2 }}
              >
                CV
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg block leading-tight">
                  Le Compagnon Virtuel
                </span>
                <span className="text-xs text-muted-foreground">Agence Digitale</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="heroGhost" size="sm" asChild>
                <Link to="/contact">Audit gratuit</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact" className="group">
                  Démarrer un projet
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[88px] z-50 lg:hidden"
            >
              <div className="glass-strong rounded-2xl p-6 shadow-premium">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                          location.pathname === link.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div 
                  className="mt-6 pt-6 border-t border-border flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button variant="heroOutline" size="lg" asChild className="w-full">
                    <Link to="/contact">Audit gratuit</Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <Link to="/contact">Démarrer un projet</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}