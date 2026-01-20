import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { MobileServicesAccordion } from "@/components/navigation/MobileServicesAccordion";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import logoImage from "@/assets/logo.png";

const navLinksFr = [
  { name: "Accueil", href: "/" },
  { name: "Réalisations", href: "/portfolio" },
  { name: "Tarifs", href: "/pricing" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Boutique", href: "/boutique", icon: true },
  { name: "Blog", href: "/blog" },
  { name: "Ressources", href: "/ressources-gratuites" },
];

const navLinksEn = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Shop", href: "/boutique", icon: true },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/ressources-gratuites" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { language, t } = useLanguage();
  
  const navLinks = language === 'en' ? navLinksEn : navLinksFr;

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
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <motion.div 
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="hidden xl:block">
                <span className="font-display font-bold text-base leading-tight">
                  Le <span className="text-primary">Compagnon</span>
                </span>
                <span className="font-display font-bold text-base leading-tight block">
                  <span className="text-destructive">Virtuel.</span>
                </span>
                <span className="text-[10px] text-muted-foreground tracking-wide">Agence Digitale</span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-0.5">
                {/* Home */}
                <Link
                  to="/"
                  className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname === "/"
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {language === 'en' ? 'Home' : 'Accueil'}
                </Link>

                {/* Services Mega Menu */}
                <ServicesDropdown isActive={location.pathname.startsWith("/services")} />

                {/* Main nav links */}
                {navLinks.filter(link => link.name !== "Accueil").map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.icon && <ShoppingBag size={14} />}
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* Cart Button */}
              <CartDrawer>
                <motion.button 
                  className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={18} className="text-muted-foreground" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </motion.button>
              </CartDrawer>
              
              <Link 
                to="/audit-gratuit"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {language === 'en' ? 'Free Audit' : 'Audit gratuit'}
              </Link>
              
              <Button asChild size="sm" className="rounded-full px-5 bg-primary hover:bg-primary/90 shadow-md">
                <Link to="/demarrer-projet" className="flex items-center gap-2">
                  {language === 'en' ? 'Start a Project' : 'Démarrer un projet'}
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
                    {/* Language Selector Mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0 }}
                      className="px-4 py-2"
                    >
                      <LanguageSelector />
                    </motion.div>
                    
                    {/* Home */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 }}
                    >
                      <Link
                        to="/"
                        className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                          location.pathname === "/"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {language === 'en' ? 'Home' : 'Accueil'}
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
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                            location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {link.icon && <ShoppingBag size={18} />}
                          {link.name}
                          {link.icon && itemCount > 0 && (
                            <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                              {itemCount}
                            </span>
                          )}
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
                    <Link to="/audit-gratuit">{language === 'en' ? 'Free Audit' : 'Audit gratuit'}</Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <Link to="/demarrer-projet">{language === 'en' ? 'Start a Project' : 'Démarrer un projet'}</Link>
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