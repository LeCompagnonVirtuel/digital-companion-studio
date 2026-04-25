import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isBefore, startOfToday, isWeekend } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

interface AppointmentBookingProps {
  source: string;
  title?: string;
  description?: string;
}

export function AppointmentBooking({ 
  source, 
  title = "Réserver un créneau", 
  description = "Choisissez une date et un horaire qui vous convient pour un appel de 30 minutes."
}: AppointmentBookingProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const disabledDays = (date: Date) => {
    return isBefore(date, startOfToday()) || isWeekend(date);
  };

  const handleSubmit = async () => {
    if (!date || !selectedTime || !formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentDate = format(date, "EEEE d MMMM yyyy", { locale: fr });
      const isoDate = format(date, "yyyy-MM-dd");
      const message = `
[PRISE DE RENDEZ-VOUS]
Date: ${appointmentDate}
Heure: ${selectedTime}
Durée: 30 minutes

Source: ${source}
      `.trim();

      // Save to database
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          message,
          source: `appointment_${source}`,
          status: "new",
        },
      ]);

      if (error) throw error;

      // Send email notification via edge function
      try {
        const { error: notifError } = await supabase.functions.invoke("send-appointment-notification", {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone?.trim() || null,
            date: appointmentDate,
            time: selectedTime,
            source: source,
          },
        });

        if (notifError) {
          console.error("Notification error:", notifError);
        }
      } catch (notifErr) {
        console.error("Failed to send notification:", notifErr);
      }

      setIsBooked(true);
      toast({
        title: "Rendez-vous confirmé !",
        description: `Votre rendez-vous est prévu le ${appointmentDate} à ${selectedTime}. Vous recevrez un email de confirmation.`,
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-3xl bg-card border border-border text-center"
      >
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-2xl mb-3">Rendez-vous confirmé !</h3>
        <p className="text-muted-foreground mb-4">
          {date && `Le ${format(date, "EEEE d MMMM yyyy", { locale: fr })} à ${selectedTime}`}
        </p>
        <p className="text-sm text-muted-foreground">
          Vous recevrez un email de confirmation avec les détails de l'appel.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calendar size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Calendar */}
        <div>
          <label className="block text-sm font-medium mb-3">Choisissez une date *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={disabledDays}
                initialFocus
                locale={fr}
                fromDate={startOfToday()}
                toDate={addDays(startOfToday(), 60)}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        {date && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-medium mb-3">
              <Clock size={14} className="inline mr-2" />
              Choisissez un horaire *
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-primary/10 border border-border"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact Info */}
        {date && selectedTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pt-4 border-t border-border"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium mb-2">Nom *</label>
                <Input
                  id="booking-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  id="booking-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.fr"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-phone" className="block text-sm font-medium mb-2">Téléphone</label>
              <Input
                id="booking-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+225 07 06 69 30 38"
              />
            </div>

            <Button
              onClick={handleSubmit}
              variant="hero"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Confirmation en cours..." : (
                <>
                  Confirmer le rendez-vous
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
