import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer le code d'accès",
      });
      return;
    }

    setIsSubmitting(true);

    const result = await login(code);
    
    if (result.success) {
      toast({
        title: "Accès autorisé",
        description: "Bienvenue dans le tableau de bord !",
      });
      navigate('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: result.error || "Code d'accès invalide",
      });
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'var(--gradient-dark)' }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">Admin</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Accès<br />
              <span className="gradient-text">Sécurisé</span>
            </h1>

            <p className="text-lg text-white/70 mb-10 max-w-md">
              Entrez votre code d'accès unique pour accéder au tableau de bord administrateur.
            </p>

            <div className="space-y-4">
              {[
                "Gestion des leads en temps réel",
                "Modification du contenu du site",
                "Statistiques et analytics",
                "Paramètres de configuration"
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">Admin</span>
            </div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Code d'accès
            </h2>
            <p className="text-muted-foreground">
              Entrez votre code secret pour continuer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Code d'accès
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="code"
                  type={showCode ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10 pr-10 h-14 text-lg bg-secondary/50 border-border/50 focus:border-primary transition-colors tracking-widest"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Vérification...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Accéder au tableau de bord</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground">
              Accès réservé aux administrateurs autorisés.
              <br />
              Pour obtenir un code d'accès, contactez l'administrateur.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
