import { motion } from 'framer-motion';
import { Check, ShoppingCart, CreditCard, Download, Package } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  steps?: { label: string; icon: React.ReactNode }[];
}

const defaultSteps = [
  { label: 'Panier', icon: <ShoppingCart size={18} /> },
  { label: 'Informations', icon: <Package size={18} /> },
  { label: 'Paiement', icon: <CreditCard size={18} /> },
  { label: 'Accès', icon: <Download size={18} /> },
];

export function ProgressIndicator({ currentStep, steps = defaultSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--muted))',
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted || isCurrent 
                    ? 'text-primary-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  step.icon
                )}
              </motion.div>
              <span className={`text-xs mt-2 font-medium ${
                isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
