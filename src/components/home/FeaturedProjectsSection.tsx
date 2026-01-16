import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe, ShoppingCart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-commerce BioCosmetics",
    category: "E-commerce",
    description: "Boutique en ligne premium avec +200% de conversion",
    icon: ShoppingCart,
    color: "from-emerald-500/20 to-teal-500/20",
    stats: [
      { label: "Conversion", value: "+200%" },
      { label: "Trafic", value: "+350%" },
    ],
  },
  {
    title: "App SaaS InnovateTech",
    category: "Application Web",
    description: "Plateforme de gestion avec tableau de bord intelligent",
    icon: Smartphone,
    color: "from-primary/20 to-accent/20",
    stats: [
      { label: "Utilisateurs", value: "10K+" },
      { label: "Rétention", value: "94%" },
    ],
  },
  {
    title: "Site Corporate FinanceGroup",
    category: "Site Vitrine",
    description: "Présence digitale premium pour groupe financier",
    icon: Globe,
    color: "from-amber-500/20 to-orange-500/20",
    stats: [
      { label: "Leads", value: "+180%" },
      { label: "Temps/page", value: "+45%" },
    ],
  },
];

export function FeaturedProjectsSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Nos <span className="gradient-text">réalisations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Des projets concrets qui démontrent notre expertise et notre créativité.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild className="self-start md:self-auto">
            <Link to="/portfolio" className="group">
              Voir tous les projets
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <Link to="/portfolio" className="relative h-full rounded-2xl bg-background border border-border overflow-hidden hover:border-primary/30 hover:shadow-elevated transition-all duration-500 block">
                {/* Project Image Placeholder */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <project.icon size={36} className="text-primary" />
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary-foreground font-medium flex items-center gap-2">
                      <ExternalLink size={16} />
                      Voir le projet
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  {/* Stats */}
                  <div className="flex gap-6">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="font-display font-bold text-lg gradient-text">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
