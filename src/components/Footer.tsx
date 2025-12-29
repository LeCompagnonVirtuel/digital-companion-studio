import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const footerLinks = {
  services: [
    { name: "Marketing Digital", href: "/services#marketing" },
    { name: "Création de Contenu", href: "/services#content" },
    { name: "Automatisation IA", href: "/services#automation" },
    { name: "Développement Web", href: "/services#web" },
    { name: "E-commerce", href: "/services#ecommerce" },
  ],
  company: [
    { name: "À propos", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Carrières", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "CGV", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-card border-t border-border">
        <div className="container-wide py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/50"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display font-bold text-2xl mb-2">Prêt à transformer votre digital ?</h3>
              <p className="text-muted-foreground">Discutons de votre projet et trouvons la solution idéale.</p>
            </div>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                <Sparkles size={18} className="mr-2" />
                Parlons de votre projet
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-foreground text-background">
        <div className="container-wide py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-glow">
                  <img src={logoImage} alt="LCV Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-background block">
                    Le Compagnon Virtuel
                  </span>
                  <span className="text-xs text-background/50">Agence Digitale</span>
                </div>
              </Link>
              <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-xs">
                Votre partenaire digital pour concevoir, automatiser et faire croître des écosystèmes digitaux performants.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-background mb-6 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/60 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-background mb-6 text-sm uppercase tracking-wider">Entreprise</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/60 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h4 className="font-display font-semibold text-background mb-6 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:contact@lecompagnonvirtuel.fr" className="flex items-center gap-3 text-sm text-background/60 hover:text-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail size={16} className="text-primary" />
                    </div>
                    contact@lecompagnonvirtuel.fr
                  </a>
                </li>
                <li>
                  <a href="tel:+33123456789" className="flex items-center gap-3 text-sm text-background/60 hover:text-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone size={16} className="text-primary" />
                    </div>
                    +33 1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-background/60">
                  <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  Paris, France
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10">
          <div className="container-wide py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-background/40">
                © {new Date().getFullYear()} Le Compagnon Virtuel. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm text-background/40 hover:text-primary transition-colors"
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