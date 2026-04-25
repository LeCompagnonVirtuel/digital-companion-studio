import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import logoImage from "@/assets/logo.png";

const footerLinks = {
  services: [
    { name: "Marketing Digital", href: "/services/marketing-digital" },
    { name: "Développement Web", href: "/services/developpement-web" },
    { name: "E-commerce", href: "/services/ecommerce" },
    { name: "Automatisation IA", href: "/services/automatisation-ia" },
    { name: "SEO & Visibilité", href: "/services/seo" },
  ],
  boutique: [
    { name: "Formations", href: "/boutique?category=formations" },
    { name: "Templates", href: "/boutique?category=templates" },
    { name: "Ressources", href: "/boutique?category=ressources" },
    { name: "Offres spéciales", href: "/boutique?promo=true" },
  ],
  company: [
    { name: "À propos", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Tarifs", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "CGV", href: "/terms" },
  ],
};

export function Footer() {
  const { settings } = useSiteSettings();

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: settings.social_links.linkedin || "#" },
    { name: "Twitter", icon: Twitter, href: settings.social_links.twitter || "#" },
    { name: "Instagram", icon: Instagram, href: settings.social_links.instagram || "#" },
    { name: "Facebook", icon: Facebook, href: settings.social_links.facebook || "#" },
  ].filter(link => link.href !== "#" || link.name === "LinkedIn" || link.name === "Twitter" || link.name === "Instagram");

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter / CTA Section */}
      <div className="bg-card border-t border-border/50">
        <div className="container-wide py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-border/50"
            style={{ background: "var(--gradient-dark)" }}
          >
            {/* Animated bg */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 p-8 lg:p-12">
              <div className="text-center lg:text-left">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                  Prêt à transformer votre digital ?
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                  Discutons de votre projet et trouvons la solution idéale.
                </p>
              </div>
              <Button variant="hero" size="xl" asChild className="shrink-0 shadow-premium">
                <Link to="/contact" className="group">
                  <Sparkles size={16} className="mr-2" />
                  Parlons de votre projet
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: "var(--gradient-dark)" }}>
        <div className="container-wide py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-3">
              <Link to="/" className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-white/10">
                  <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <span className="font-display font-bold text-base text-white block leading-tight">
                    Le Compagnon <span className="text-destructive">Virtuel.</span>
                  </span>
                  <span className="text-[10px] text-white/40">Agence Digitale</span>
                </div>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
                {settings.site_description || "Votre partenaire digital pour concevoir, automatiser et faire croître des écosystèmes digitaux performants."}
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    aria-label={social.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">Services</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Boutique */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">Boutique</h4>
              <ul className="space-y-2.5">
                {footerLinks.boutique.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">Entreprise</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1 lg:col-span-3">
              <h4 className="font-display font-semibold text-white/80 mb-5 text-xs uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={`mailto:${settings.contact_email}`} 
                    className="flex items-center gap-3 text-sm text-white/40 hover:text-primary transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                      <Mail size={14} className="text-primary/70" />
                    </div>
                    <span className="text-xs sm:text-sm break-all">{settings.contact_email}</span>
                  </a>
                </li>
                {settings.business_info.phone && (
                  <li>
                    <a 
                      href={`tel:${settings.business_info.phone.replace(/\s/g, '')}`} 
                      className="flex items-center gap-3 text-sm text-white/40 hover:text-primary transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                        <Phone size={14} className="text-primary/70" />
                      </div>
                      {settings.business_info.phone}
                    </a>
                  </li>
                )}
                {settings.business_info.address && (
                  <li className="flex items-center gap-3 text-sm text-white/40">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                      <MapPin size={14} className="text-primary/70" />
                    </div>
                    {settings.business_info.address}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="container-wide py-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} Le Compagnon <span className="text-destructive/70">Virtuel.</span> — Tous droits réservés.
              </p>
              <div className="flex gap-5">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-xs text-white/30 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}