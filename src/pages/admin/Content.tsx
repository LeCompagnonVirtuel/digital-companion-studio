import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  FileText, 
  Layout,
  Star,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface AboutContent {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
}

interface ServiceItem {
  title: string;
  description: string;
}

const defaultHeroContent: HeroContent = {
  title: "Transformez votre vision digitale en réalité",
  subtitle: "Nous créons des expériences numériques exceptionnelles qui propulsent votre entreprise vers le succès.",
  ctaPrimary: "Demander un devis",
  ctaSecondary: "Voir nos réalisations",
};

const defaultAboutContent: AboutContent = {
  title: "Une agence digitale passionnée",
  description: "Nous accompagnons les entreprises dans leur transformation digitale avec créativité et expertise technique.",
  stats: [
    { value: "150+", label: "Projets réalisés" },
    { value: "98%", label: "Clients satisfaits" },
    { value: "10+", label: "Années d'expérience" },
  ],
};

const defaultServices: ServiceItem[] = [
  { title: "Développement Web", description: "Sites web modernes et performants" },
  { title: "E-commerce", description: "Boutiques en ligne optimisées" },
  { title: "Applications Mobile", description: "Apps iOS et Android natives" },
  { title: "SEO & Marketing", description: "Visibilité et acquisition" },
];

const Content = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();

    // Subscribe to realtime content updates
    const channel = supabase
      .channel('site-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content',
        },
        (payload) => {
          console.log('Real-time content update:', payload);
          fetchContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      data?.forEach((item) => {
        const content = item.content as Record<string, unknown>;
        switch (item.section) {
          case 'hero':
            setHeroContent(content as unknown as HeroContent);
            break;
          case 'about':
            setAboutContent(content as unknown as AboutContent);
            break;
          case 'services':
            setServices((content as unknown as { items: ServiceItem[] }).items || defaultServices);
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (section: string, content: unknown) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert(
          [{ 
            section, 
            content: JSON.parse(JSON.stringify(content)),
          }],
          { onConflict: 'section' }
        );

      if (error) throw error;

      toast({
        title: "Contenu sauvegardé",
        description: `La section "${section}" a été mise à jour`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder le contenu",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateServiceField = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Gestion du contenu
              </h1>
              <p className="text-muted-foreground mt-1">
                Modifiez le contenu de votre site en temps réel
              </p>
            </div>
            <Button 
              onClick={fetchContent} 
              variant="outline" 
              className="gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>

          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="hero" className="gap-2">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">À propos</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" />
                      Section Hero
                    </CardTitle>
                    <CardDescription>
                      La première chose que vos visiteurs voient
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Titre principal</Label>
                      <Input
                        id="heroTitle"
                        value={heroContent.title}
                        onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                        placeholder="Votre titre accrocheur..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Sous-titre</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={heroContent.subtitle}
                        onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                        placeholder="Description courte..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaPrimary">Bouton principal</Label>
                        <Input
                          id="ctaPrimary"
                          value={heroContent.ctaPrimary}
                          onChange={(e) => setHeroContent({ ...heroContent, ctaPrimary: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaSecondary">Bouton secondaire</Label>
                        <Input
                          id="ctaSecondary"
                          value={heroContent.ctaSecondary}
                          onChange={(e) => setHeroContent({ ...heroContent, ctaSecondary: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => saveContent('hero', heroContent)}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* About Section */}
            <TabsContent value="about">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Section À propos
                    </CardTitle>
                    <CardDescription>
                      Présentez votre entreprise et vos valeurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="aboutTitle">Titre</Label>
                      <Input
                        id="aboutTitle"
                        value={aboutContent.title}
                        onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aboutDescription">Description</Label>
                      <Textarea
                        id="aboutDescription"
                        value={aboutContent.description}
                        onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Statistiques</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aboutContent.stats.map((stat, index) => (
                          <div key={index} className="space-y-2 p-4 bg-secondary/50 rounded-lg">
                            <Input
                              value={stat.value}
                              onChange={(e) => {
                                const updated = [...aboutContent.stats];
                                updated[index] = { ...stat, value: e.target.value };
                                setAboutContent({ ...aboutContent, stats: updated });
                              }}
                              placeholder="Valeur"
                              className="text-center font-bold"
                            />
                            <Input
                              value={stat.label}
                              onChange={(e) => {
                                const updated = [...aboutContent.stats];
                                updated[index] = { ...stat, label: e.target.value };
                                setAboutContent({ ...aboutContent, stats: updated });
                              }}
                              placeholder="Label"
                              className="text-center text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => saveContent('about', aboutContent)}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Services
                    </CardTitle>
                    <CardDescription>
                      Décrivez les services que vous proposez
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div 
                          key={index} 
                          className="space-y-3 p-4 border border-border/50 rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label>Titre du service</Label>
                            <Input
                              value={service.title}
                              onChange={(e) => updateServiceField(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={service.description}
                              onChange={(e) => updateServiceField(index, 'description', e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => saveContent('services', { items: services })}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
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

export default Content;
