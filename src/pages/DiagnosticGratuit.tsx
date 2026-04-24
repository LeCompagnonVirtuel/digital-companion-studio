import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, CheckCircle, Target, Users, Megaphone,
  ShoppingCart, Package, BarChart3, Sparkles, AlertTriangle, TrendingUp
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

interface DiagnosticQuestion {
  id: string;
  dimension: string;
  icon: typeof Target;
  question: string;
  options: { label: string; score: number }[];
}

const questions: DiagnosticQuestion[] = [
  {
    id: "client", dimension: "Client", icon: Users,
    question: "Avez-vous identifié et validé votre client idéal ?",
    options: [
      { label: "Je ne sais pas qui est mon client idéal", score: 1 },
      { label: "J'ai une idée mais pas validée", score: 2 },
      { label: "J'ai parlé à quelques prospects", score: 3 },
      { label: "J'ai des clients payants récurrents", score: 4 },
      { label: "Je connais parfaitement mon client et ses douleurs", score: 5 },
    ],
  },
  {
    id: "offre", dimension: "Offre", icon: Package,
    question: "Votre offre est-elle claire, packagée et tarifée ?",
    options: [
      { label: "Je n'ai pas encore d'offre structurée", score: 1 },
      { label: "J'ai une idée d'offre mais pas de tarif fixe", score: 2 },
      { label: "J'ai des packs mais je ne suis pas sûr des prix", score: 3 },
      { label: "Mon offre est claire avec des packs définis", score: 4 },
      { label: "Mon offre convertit bien et mes clients sont satisfaits", score: 5 },
    ],
  },
  {
    id: "trafic", dimension: "Trafic / Acquisition", icon: Megaphone,
    question: "Comment attirez-vous vos prospects ?",
    options: [
      { label: "Je n'ai aucun système en place", score: 1 },
      { label: "Uniquement du bouche-à-oreille", score: 2 },
      { label: "Je poste parfois sur les réseaux sociaux", score: 3 },
      { label: "J'ai un canal actif qui amène des prospects", score: 4 },
      { label: "J'ai un système prévisible et mesurable", score: 5 },
    ],
  },
  {
    id: "conversion", dimension: "Conversion / Vente", icon: ShoppingCart,
    question: "Quel est votre taux de conversion prospect → client ?",
    options: [
      { label: "Je ne sais pas / je ne mesure pas", score: 1 },
      { label: "Très faible (moins de 5%)", score: 2 },
      { label: "Autour de 10-15%", score: 3 },
      { label: "Bon taux (20-30%)", score: 4 },
      { label: "Excellent (30%+), mon process de vente est rodé", score: 5 },
    ],
  },
  {
    id: "produit", dimension: "Produit / Livraison", icon: Target,
    question: "Vos clients sont-ils satisfaits de ce que vous livrez ?",
    options: [
      { label: "Je n'ai pas encore livré de client", score: 1 },
      { label: "J'ai des retours mitigés", score: 2 },
      { label: "Satisfaits mais pas de wow effect", score: 3 },
      { label: "Très satisfaits, ils me recommandent", score: 4 },
      { label: "NPS 4.5+/5, témoignages et referrals actifs", score: 5 },
    ],
  },
  {
    id: "operations", dimension: "Opérations / Process", icon: BarChart3,
    question: "Vos opérations sont-elles organisées ?",
    options: [
      { label: "C'est le chaos total", score: 1 },
      { label: "Je gère au jour le jour dans ma tête", score: 2 },
      { label: "J'ai quelques outils mais pas de process clair", score: 3 },
      { label: "Mes processus sont documentés", score: 4 },
      { label: "Tout est systématisé et délégable", score: 5 },
    ],
  },
];

interface DiagnosticResult {
  phase: string;
  bottleneck: string;
  bottleneckIcon: typeof Target;
  score: number;
  maxScore: number;
  details: { dimension: string; score: number; maxScore: number }[];
  recommendations: string[];
  problemSlugs: string[];
}

function calculateResult(answers: Record<string, number>): DiagnosticResult {
  const details = questions.map((q) => ({
    dimension: q.dimension,
    score: answers[q.id] || 0,
    maxScore: 5,
  }));

  const totalScore = details.reduce((sum, d) => sum + d.score, 0);
  const maxScore = details.length * 5;

  const weakest = details.reduce((min, d) => (d.score < min.score ? d : min), details[0]);

  let phase = "Find";
  if (totalScore >= 18) phase = "Scale";
  else if (totalScore >= 10) phase = "PMF";

  const recommendations: string[] = [];
  const problemSlugs: string[] = [];

  if (answers.client <= 2) {
    recommendations.push("Priorité n°1 : validez votre client idéal en parlant à 20 prospects cette semaine.");
    problemSlugs.push("pas-de-validation-marche");
  }
  if (answers.offre <= 2) {
    recommendations.push("Structurez votre offre en 3 packs clairs avec prix, livrables et délais.");
    problemSlugs.push("offre-pas-claire", "prix-trop-bas");
  }
  if (answers.trafic <= 2) {
    recommendations.push("Construisez UN canal d'acquisition répétable (10 actions/jour pendant 30 jours).");
    problemSlugs.push("pas-systeme-acquisition");
  }
  if (answers.conversion <= 2) {
    recommendations.push("Travaillez votre processus de vente : script d'appel, objections, suivi.");
    problemSlugs.push("peur-de-vendre");
  }
  if (answers.produit <= 2) {
    recommendations.push("Collectez du feedback client et améliorez votre livrable avant de scaler.");
    problemSlugs.push("scope-creep");
  }
  if (answers.operations <= 2) {
    recommendations.push("Documentez vos 3 processus principaux pour pouvoir déléguer.");
    problemSlugs.push("pas-de-process");
  }

  if (recommendations.length === 0) {
    recommendations.push("Votre business a de bonnes bases. Concentrez-vous sur l'optimisation et le scaling.");
  }

  return {
    phase,
    bottleneck: weakest.dimension,
    bottleneckIcon: questions.find((q) => q.dimension === weakest.dimension)?.icon || Target,
    score: totalScore,
    maxScore,
    details,
    recommendations,
    problemSlugs,
  };
}

const DiagnosticGratuit = () => {
  useDocumentMeta({
    title: "Diagnostic Gratuit — Identifiez votre blocage n°1",
    description: "Outil de diagnostic interactif gratuit pour entrepreneurs. Identifiez votre goulot d'étranglement et recevez un plan d'action personnalisé.",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const isIntro = currentStep === 0;
  const questionIndex = currentStep - 1;
  const currentQuestion = questions[questionIndex];
  const progress = isIntro ? 0 : (currentStep / (questions.length + 1)) * 100;

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));
    if (questionIndex < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const result = showResult ? calculateResult(answers) : null;

  const phaseLabels: Record<string, { label: string; color: string }> = {
    Find: { label: "Phase Découverte", color: "bg-blue-500/10 text-blue-600" },
    PMF: { label: "Phase Product-Market Fit", color: "bg-amber-500/10 text-amber-600" },
    Scale: { label: "Phase Croissance", color: "bg-green-500/10 text-green-600" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="pt-32 pb-20 relative overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="container-wide max-w-3xl mx-auto">

            {/* Progress bar */}
            {!isIntro && !showResult && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentStep}/{questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Intro */}
              {isIntro && !showResult && (
                <motion.div key="intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="text-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                    <Sparkles size={16} /> Diagnostic Gratuit
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                    Identifiez votre <span className="gradient-text">blocage n°1</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">
                    En 6 questions, découvrez exactement ce qui freine votre business et recevez un plan d'action personnalisé.
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">Basé sur la matrice PMF — utilisée par les meilleurs accélérateurs.</p>
                  <Button size="lg" onClick={() => setCurrentStep(1)} className="group">
                    Commencer le diagnostic <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {/* Questions */}
              {!isIntro && !showResult && currentQuestion && (
                <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <currentQuestion.icon size={32} className="text-primary" />
                    </div>
                    <span className="text-sm text-primary font-medium">{currentQuestion.dimension}</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold mt-2">{currentQuestion.question}</h2>
                  </div>
                  <div className="space-y-3 max-w-xl mx-auto">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.score}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full text-left p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary flex items-center justify-center shrink-0 transition-colors">
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">{option.score}</span>
                          </div>
                          <span className="text-sm">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {currentStep > 1 && (
                    <div className="text-center mt-6">
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep((s) => s - 1)}>
                        <ArrowLeft size={16} className="mr-1" /> Précédent
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Result */}
              {showResult && result && (
                <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="text-center">
                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">Votre diagnostic</h2>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${phaseLabels[result.phase]?.color}`}>
                        {phaseLabels[result.phase]?.label}
                      </span>
                    </div>
                  </div>

                  {/* Score overview */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-display font-semibold mb-4 text-center">Score global : {result.score}/{result.maxScore}</h3>
                    <div className="space-y-3">
                      {result.details.map((d) => (
                        <div key={d.dimension}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{d.dimension}</span>
                            <span className={d.score <= 2 ? "text-destructive font-medium" : "text-muted-foreground"}>{d.score}/5</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${d.score <= 2 ? "bg-destructive" : d.score <= 3 ? "bg-amber-500" : "bg-primary"}`}
                              style={{ width: `${(d.score / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottleneck */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle size={20} className="text-destructive" />
                      <h3 className="font-display font-semibold">Goulot d'étranglement : {result.bottleneck}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      C'est la dimension qui freine le plus votre croissance. Concentrez vos efforts ici en priorité.
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp size={20} className="text-primary" />
                      <h3 className="font-display font-semibold">Plan d'action recommandé</h3>
                    </div>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button asChild size="lg">
                      <Link to="/parlons-projet">
                        Obtenir un accompagnement <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/guide-entrepreneur">Explorer les 30 solutions</Link>
                    </Button>
                    <Button variant="ghost" size="lg" onClick={() => { setCurrentStep(0); setAnswers({}); setShowResult(false); }}>
                      Refaire le diagnostic
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticGratuit;
