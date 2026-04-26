import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  FileText, 
  Layout,
  Star,
  RefreshCw,
  RotateCcw,
  Plus,
  Trash2,
  Type
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
    { value: "50+", label: "Projets réalisés" },
    { value: "10+", label: "Clients satisfaits" },
    { value: "5+", label: "Années d'expérience" },
  ],
};

const defaultServices: ServiceItem[] = [
  { title: "Développement Web", description: "Sites web modernes et performants" },
  { title: "E-commerce", description: "Boutiques en ligne optimisées" },
  { title: "Applications Mobile", description: "Apps iOS et Android natives" },
  { title: "SEO & Marketing", description: "Visibilité et acquisition" },
];

const CharCounter = ({ value, max, warn }: { value: string; max: number; warn?: number }) => {
  const len = value.length;
  const isWarn = warn ? len > warn : len > max * 0.9;
  const isOver = len > max;
  return (
    <span className={`text-[10px] tabular-nums ${isOver ? 'text-red-500 font-medium' : isWarn ? 'text-amber-500' : 'text-muted-foreground'}`}>
      {len}/{max}
    </span>
  );
};

const Content = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
    const channel = supabase
      .channel('site-content-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, () => fetchContent())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;
      data?.forEach((item) => {
        const content = item.content as Record<string, unknown>;
        switch (item.section) {
          case 'hero': setHeroContent(content as unknown as HeroContent); break;
          case 'about': setAboutContent(content as unknown as AboutContent); break;
          case 'services': setServices((content as unknown as { items: ServiceItem[] }).items || defaultServices); break;
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
        .upsert([{ section, content: JSON.parse(JSON.stringify(content)) }], { onConflict: 'section' });
      if (error) throw error;
      toast({ title: "Contenu sauvegardé", description: `La section "${section}" a été mise à jour` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de sauvegarder le contenu" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateServiceField = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const addStat = () => {
    setAboutContent({ ...aboutContent, stats: [...aboutContent.stats, { value: '0', label: 'Nouveau' }] });
  };

  const removeStat = (index: number) => {
    const updated = [...aboutContent.stats];
    updated.splice(index, 1);
    setAboutContent({ ...aboutContent, stats: updated });
  };

  const addService = () => {
    setServices([...services, { title: 'Nouveau service', description: 'Description du service' }]);
  };

  const removeService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="space-y-6">
            <div className="h-10 w-64 bg-muted animate-pulse rounded" />
            <div className="grid gap-4">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />)}
            </div>
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-2">
                <Type className="w-6 h-6 text-primary" />
                Gestion du contenu
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">Modifiez le contenu de votre site en temps réel</p>
            </div>
            <Button onClick={fetchContent} variant="outline" className="gap-2" disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </motion.div>

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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><Layout className="w-5 h-5 text-primary" />Section Hero</CardTitle>
                      <CardDescription>La première chose que vos visiteurs voient</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setHeroContent(defaultHeroContent)} className="text-xs gap-1">
                      <RotateCcw className="w-3 h-3" />Réinitialiser
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="heroTitle">Titre principal</Label>
                        <CharCounter value={heroContent.title} max={80} warn={60} />
                      </div>
                      <Input id="heroTitle" value={heroContent.title} onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })} placeholder="Votre titre accrocheur..." />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="heroSubtitle">Sous-titre</Label>
                        <CharCounter value={heroContent.subtitle} max={160} warn={120} />
                      </div>
                      <Textarea id="heroSubtitle" value={heroContent.subtitle} onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })} placeholder="Description courte..." rows={3} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaPrimary">Bouton principal</Label>
                        <Input id="ctaPrimary" value={heroContent.ctaPrimary} onChange={(e) => setHeroContent({ ...heroContent, ctaPrimary: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaSecondary">Bouton secondaire</Label>
                        <Input id="ctaSecondary" value={heroContent.ctaSecondary} onChange={(e) => setHeroContent({ ...heroContent, ctaSecondary: e.target.value })} />
                      </div>
                    </div>
                    <Button onClick={() => saveContent('hero', heroContent)} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* About Section */}
            <TabsContent value="about">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Section À propos</CardTitle>
                      <CardDescription>Présentez votre entreprise et vos valeurs</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setAboutContent(defaultAboutContent)} className="text-xs gap-1">
                      <RotateCcw className="w-3 h-3" />Réinitialiser
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="aboutTitle">Titre</Label>
                        <CharCounter value={aboutContent.title} max={60} />
                      </div>
                      <Input id="aboutTitle" value={aboutContent.title} onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="aboutDescription">Description</Label>
                        <CharCounter value={aboutContent.description} max={300} warn={250} />
                      </div>
                      <Textarea id="aboutDescription" value={aboutContent.description} onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })} rows={4} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Statistiques</Label>
                        <Button variant="outline" size="sm" onClick={addStat} className="text-xs gap-1"><Plus className="w-3 h-3" />Ajouter</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {aboutContent.stats.map((stat, index) => (
                          <div key={index} className="relative space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50 group">
                            {aboutContent.stats.length > 1 && (
                              <Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeStat(index)}>
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            )}
                            <Input value={stat.value} onChange={(e) => {
                              const updated = [...aboutContent.stats];
                              updated[index] = { ...stat, value: e.target.value };
                              setAboutContent({ ...aboutContent, stats: updated });
                            }} placeholder="Valeur" className="text-center font-bold" />
                            <Input value={stat.label} onChange={(e) => {
                              const updated = [...aboutContent.stats];
                              updated[index] = { ...stat, label: e.target.value };
                              setAboutContent({ ...aboutContent, stats: updated });
                            }} placeholder="Label" className="text-center text-sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => saveContent('about', aboutContent)} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-primary" />Services</CardTitle>
                      <CardDescription>Décrivez les services que vous proposez</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={addService} className="text-xs gap-1"><Plus className="w-3 h-3" />Ajouter</Button>
                      <Button variant="ghost" size="sm" onClick={() => setServices(defaultServices)} className="text-xs gap-1"><RotateCcw className="w-3 h-3" />Réinitialiser</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service, index) => (
                        <div key={index} className="relative space-y-3 p-4 border border-border/50 rounded-lg group hover:border-primary/20 transition-all">
                          {services.length > 1 && (
                            <Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeService(index)}>
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                          )}
                          <Badge variant="outline" className="text-[10px]">Service {index + 1}</Badge>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">Titre</Label>
                              <CharCounter value={service.title} max={40} />
                            </div>
                            <Input value={service.title} onChange={(e) => updateServiceField(index, 'title', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">Description</Label>
                              <CharCounter value={service.description} max={100} />
                            </div>
                            <Textarea value={service.description} onChange={(e) => updateServiceField(index, 'description', e.target.value)} rows={2} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => saveContent('services', { items: services })} disabled={isSaving} className="gap-2">
                      <Save className="w-4 h-4" />{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
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
