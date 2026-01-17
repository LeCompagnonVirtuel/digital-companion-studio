import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { MobileServicesAccordion } from "@/components/navigation/MobileServicesAccordion";
import logoImage from "@/assets/logo.png";

const navLinks = [
  { name: "Accueil", href: "/" },
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
                className="w-11 h-11 rounded-xl overflow-hidden shadow-glow"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg block leading-tight">
                  Le Compagnon <span className="text-destructive">Virtuel.</span>
                </span>
                <span className="text-xs text-muted-foreground">Agence Digitale</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Accueil */}
              <Link
                to="/"
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Accueil
                {location.pathname === "/" && (
                  <motion.div
                    layoutId="activeNavHome"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>

              {/* Services Mega Menu */}
              <ServicesDropdown isActive={location.pathname.startsWith("/services")} />

              {/* Other links */}
              {navLinks.filter(link => link.name !== "Accueil").map((link) => (
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
                      layoutId={`activeNav-${link.name}`}
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
                <Link to="/audit-gratuit">Audit gratuit</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/demarrer-projet" className="group">
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
              className="fixed inset-x-4 top-[88px] bottom-4 z-50 lg:hidden flex flex-col"
            >
              <div className="glass-strong rounded-2xl shadow-premium flex flex-col max-h-full overflow-hidden">
                {/* Scrollable Content Area */}
                <div 
                  className="flex-1 overflow-y-auto overscroll-contain p-6 pb-0"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'hsl(var(--muted-foreground) / 0.3) transparent',
                  }}
                >
                  <nav className="flex flex-col gap-1">
                    {/* Accueil */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0 }}
                    >
                      <Link
                        to="/"
                        className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                          location.pathname === "/"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        Accueil
                      </Link>
                    </motion.div>

                    {/* Services Accordion */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <MobileServicesAccordion isActive={location.pathname.startsWith("/services")} />
                    </motion.div>

                    {/* Other links */}
                    {navLinks.filter(link => link.name !== "Accueil").map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 2) * 0.05 }}
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
                </div>
                
                {/* Fixed CTA Buttons at Bottom */}
                <motion.div 
                  className="flex-shrink-0 p-6 pt-4 border-t border-border bg-background/80 backdrop-blur-sm flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button variant="heroOutline" size="lg" asChild className="w-full">
                    <Link to="/audit-gratuit">Audit gratuit</Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <Link to="/demarrer-projet">Démarrer un projet</Link>
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