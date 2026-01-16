import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  planId?: string; // For URL parameter
}

interface ServicePricingSectionProps {
  service: string; // Service identifier for URL (e.g., "developpement-web")
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
}

export function ServicePricingSection({ 
  service, 
  plans, 
  title = "Nos tarifs",
  subtitle = "Des solutions adaptées à chaque budget et chaque ambition."
}: ServicePricingSectionProps) {
  const getPlanId = (plan: PricingPlan, index: number): string => {
    if (plan.planId) return plan.planId;
    // Generate plan ID from name
    const nameMap: Record<string, string> = {
      "starter": "starter",
      "essentiel": "essentiel",
      "pro": "pro",
      "croissance": "croissance",
      "premium": "premium",
      "scale": "scale",
      "entreprise": "entreprise",
    };
    const normalized = plan.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return nameMap[normalized] || (index === 0 ? "starter" : index === 1 ? "pro" : "premium");
  };

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const planId = getPlanId(plan, i);
            const href = `/demarrer-projet?service=${service}&plan=${planId}`;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl bg-card border ${
                  plan.popular ? "border-primary shadow-lg scale-105" : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Recommandé
                  </span>
                )}
                <h3 className="font-display font-semibold text-xl mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full" 
                  asChild
                >
                  <Link to={href}>
                    Choisir ce plan
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Besoin d'une solution sur-mesure ?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contactez-nous
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
