import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Globe,
  Building2,
  Mail,
  Save,
  Key,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Loader2,
  RefreshCw,
  Construction,
  AlertTriangle,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Settings = () => {
  const { toast } = useToast();
  const { settings, isLoading, isSaving, updateSetting, updateSettings } = useAdminSettings();
  
  // Local state for form fields
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notifications, setNotifications] = useState({
    newLeads: true,
    weeklyReport: true,
    marketingEmails: false,
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  });
  const [businessInfo, setBusinessInfo] = useState({
    phone: '',
    address: '',
    hours: '',
  });
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceTitle, setMaintenanceTitle] = useState('🚧 Site en maintenance');
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [maintenanceReturn, setMaintenanceReturn] = useState('');

  // Sync local state with settings from database
  useEffect(() => {
    if (!isLoading) {
      setSiteName(settings.site_name);
      setSiteDescription(settings.site_description);
      setContactEmail(settings.contact_email);
      setNotifications(settings.notifications);
      setSocialLinks(settings.social_links);
      setBusinessInfo(settings.business_info);
      setMaintenanceMode(settings.maintenance_mode === true);
      setMaintenanceTitle(settings.maintenance_title || '🚧 Site en maintenance');
      setMaintenanceMessage(settings.maintenance_message || '');
      setMaintenanceReturn(settings.maintenance_estimated_return || '');
    }
  }, [settings, isLoading]);

  const handleSaveGeneral = async () => {
    await updateSettings({
      site_name: siteName,
      site_description: siteDescription,
      contact_email: contactEmail,
    });
  };

  const handleSaveNotifications = async () => {
    await updateSetting('notifications', notifications);
  };

  const handleSaveSocial = async () => {
    await updateSetting('social_links', socialLinks);
  };

  const handleSaveBusiness = async () => {
    await updateSetting('business_info', businessInfo);
  };

  const handleSaveMaintenance = async () => {
    await updateSettings({
      maintenance_mode: maintenanceMode,
      maintenance_title: maintenanceTitle,
      maintenance_message: maintenanceMessage,
      maintenance_estimated_return: maintenanceReturn || null,
    });
  };

  const handleToggleMaintenance = async (checked: boolean) => {
    setMaintenanceMode(checked);
    await updateSetting('maintenance_mode', checked);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-9 w-48 mb-2" />
              <Skeleton className="h-5 w-72" />
            </div>
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-96 w-full" />
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Paramètres</h1>
              <p className="text-muted-foreground mt-1 text-sm">Gérez les paramètres généraux du site</p>
            </div>
            <div className="flex items-center gap-2">
              {isSaving && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sauvegarde...
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm">
                <RefreshCw className="w-3 h-3" />
                Sync temps réel
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:w-auto lg:inline-flex">
              <TabsTrigger value="general" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Général</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="gap-2">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Entreprise</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Réseaux sociaux</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="gap-2">
                <Construction className="w-4 h-4" />
                <span className="hidden sm:inline">Maintenance</span>
              </TabsTrigger>
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Informations du site
                    </CardTitle>
                    <CardDescription>
                      Configuration générale de votre site web
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Nom du site</Label>
                        <Input
                          id="siteName"
                          value={siteName}
                          onChange={(e) => setSiteName(e.target.value)}
                          placeholder="LCV Digital"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email de contact</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="contactEmail"
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="contact@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Description du site</Label>
                      <Textarea
                        id="siteDescription"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        placeholder="Une courte description de votre entreprise..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Cette description est utilisée pour le SEO et les partages sur les réseaux sociaux
                      </p>
                    </div>

                    <Button onClick={handleSaveGeneral} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Business Info Tab */}
            <TabsContent value="business">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Informations de l'entreprise
                    </CardTitle>
                    <CardDescription>
                      Coordonnées et horaires d'ouverture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={businessInfo.phone}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                            placeholder="+33 1 23 45 67 89"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hours">Horaires d'ouverture</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="hours"
                            value={businessInfo.hours}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, hours: e.target.value })}
                            placeholder="Lun-Ven 9h-18h"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          value={businessInfo.address}
                          onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                          placeholder="123 Rue Example, 75001 Paris"
                          className="pl-10 min-h-[80px]"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveBusiness} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Préférences de notification
                    </CardTitle>
                    <CardDescription>
                      Configurez comment vous souhaitez être notifié
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Nouveaux leads</p>
                            <p className="text-sm text-muted-foreground">
                              Recevoir un email à chaque nouveau lead
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.newLeads}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, newLeads: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium">Rapport hebdomadaire</p>
                            <p className="text-sm text-muted-foreground">
                              Recevoir un résumé chaque lundi matin
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.weeklyReport}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, weeklyReport: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <p className="font-medium">Emails marketing</p>
                            <p className="text-sm text-muted-foreground">
                              Recevoir des conseils et actualités
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.marketingEmails}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, marketingEmails: checked })
                          }
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveNotifications} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Social Links Tab */}
            <TabsContent value="social">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Réseaux sociaux
                    </CardTitle>
                    <CardDescription>
                      Configurez vos liens vers les réseaux sociaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <div className="relative">
                          <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="facebook"
                            value={socialLinks.facebook}
                            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                            placeholder="https://facebook.com/votrepage"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <div className="relative">
                          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="instagram"
                            value={socialLinks.instagram}
                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            placeholder="https://instagram.com/votrecompte"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="linkedin"
                            value={socialLinks.linkedin}
                            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/company/votre-entreprise"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter / X</Label>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="twitter"
                            value={socialLinks.twitter}
                            onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                            placeholder="https://twitter.com/votrecompte"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSaveSocial} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            {/* Maintenance Tab */}
            <TabsContent value="maintenance">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quick Toggle Card */}
                <Card className={`border-2 ${maintenanceMode ? 'border-destructive/50 bg-destructive/5' : 'border-border/50'}`}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${maintenanceMode ? 'bg-destructive/10' : 'bg-secondary'}`}>
                        <Construction className={`w-6 h-6 ${maintenanceMode ? 'text-destructive' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Mode maintenance</h3>
                        <p className="text-sm text-muted-foreground">
                          {maintenanceMode ? '🔴 Le site est actuellement inaccessible aux visiteurs' : '🟢 Le site est accessible normalement'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={maintenanceMode}
                      onCheckedChange={handleToggleMaintenance}
                    />
                  </CardContent>
                </Card>

                {maintenanceMode && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Le mode maintenance est actif. Les visiteurs voient la page de maintenance.</span>
                  </div>
                )}

                {/* Customization Card */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Construction className="w-5 h-5 text-primary" />
                      Personnalisation de la page
                    </CardTitle>
                    <CardDescription>
                      Configurez le contenu affiché aux visiteurs pendant la maintenance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceTitle">Titre de la page</Label>
                      <Input
                        id="maintenanceTitle"
                        value={maintenanceTitle}
                        onChange={(e) => setMaintenanceTitle(e.target.value)}
                        placeholder="🚧 Site en maintenance"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMessage">Message pour les visiteurs</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={maintenanceMessage}
                        onChange={(e) => setMaintenanceMessage(e.target.value)}
                        placeholder="Nous effectuons actuellement une mise à jour..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maintenanceReturn">Date/heure estimée de retour</Label>
                      <Input
                        id="maintenanceReturn"
                        type="datetime-local"
                        value={maintenanceReturn}
                        onChange={(e) => setMaintenanceReturn(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Optionnel — un compteur à rebours sera affiché si renseigné
                      </p>
                    </div>

                    <Button onClick={handleSaveMaintenance} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />
                      Sauvegarder les paramètres
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Settings;
