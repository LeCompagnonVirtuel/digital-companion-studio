import { motion } from "framer-motion";
import { ShoppingBag, CheckCircle, Zap, Clock, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ProductProblemSolutionProps {
  problem?: string;
  benefits?: string[];
  contentDetails?: string[];
}

const defaultContent = {
  fr: {
    problemTitle: "Le problème que vous rencontrez",
    solutionTitle: "Ce que vous obtenez",
    contentTitle: "Ce qui est inclus",
    defaultProblem: "Vous perdez du temps et de l'argent à chercher les bonnes solutions pour développer votre business en ligne.",
    defaultBenefits: [
      "Gagnez des heures de travail avec des templates prêts à l'emploi",
      "Évitez les erreurs coûteuses grâce à des stratégies éprouvées",
      "Accélérez votre croissance avec des méthodes qui fonctionnent",
      "Bénéficiez d'un support expert pour chaque étape"
    ],
    defaultContent: [
      "Guide complet étape par étape",
      "Templates et modèles personnalisables",
      "Exemples concrets et études de cas",
      "Accès à la communauté privée",
      "Mises à jour gratuites à vie"
    ]
  },
  en: {
    problemTitle: "The problem you're facing",
    solutionTitle: "What you get",
    contentTitle: "What's included",
    defaultProblem: "You're wasting time and money looking for the right solutions to grow your online business.",
    defaultBenefits: [
      "Save hours of work with ready-to-use templates",
      "Avoid costly mistakes with proven strategies",
      "Accelerate your growth with methods that work",
      "Get expert support for every step"
    ],
    defaultContent: [
      "Complete step-by-step guide",
      "Customizable templates and models",
      "Concrete examples and case studies",
      "Access to private community",
      "Free lifetime updates"
    ]
  }
};

export function ProductProblemSolution({ 
  problem, 
  benefits, 
  contentDetails 
}: ProductProblemSolutionProps) {
  const { language } = useLanguage();
  const t = defaultContent[language];

  const displayProblem = problem || t.defaultProblem;
  const displayBenefits = benefits?.length ? benefits : t.defaultBenefits;
  const displayContent = contentDetails?.length ? contentDetails : t.defaultContent;

  return (
    <div className="space-y-8">
      {/* Problem Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 rounded-2xl p-6 border border-rose-500/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
            <Target size={24} className="text-rose-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{t.problemTitle}</h3>
            <div className="text-muted-foreground leading-relaxed space-y-2">
              {displayProblem.split('\n').filter(line => line.trim()).map((line, index) => (
                <p key={index} className="whitespace-pre-line">{line.trim()}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Solution/Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl p-6 border border-emerald-500/20"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
            <TrendingUp size={24} className="text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{t.solutionTitle}</h3>
          </div>
        </div>
        <ul className="space-y-3 pl-16">
          {displayBenefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Content Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <ShoppingBag size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{t.contentTitle}</h3>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 pl-16">
          {displayContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-2"
            >
              <Zap size={14} className="text-primary shrink-0" />
              <span className="text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}