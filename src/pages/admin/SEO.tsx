import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Globe, 
  FileText,
  Link2,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Zap,
  Image as ImageIcon,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';

// Pages to audit — these match real routes in the app
const SITE_PAGES = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
  { path: '/boutique', label: 'Boutique' },
  { path: '/blog', label: 'Blog' },
  { path: '/a-propos', label: 'À propos' },
  { path: '/tarifs', label: 'Tarifs' },
];

interface PageSEOData {
  path: string;
  label: string;
  title: string;
  metaDescription: string;
  score: number;
  issues: string[];
}

interface SEOGlobalSettings {
  siteName: string;
  siteDescription: string;
  twitterHandle: string;
  googleVerification: string;
  robots: string;
}

// Real SEO scoring logic
const auditPage = (title: string, description: string): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;

  // Title checks
  if (!title || title.trim().length === 0) {
    issues.push('Titre manquant');
    score -= 30;
  } else if (title.length < 30) {
    issues.push(`Titre trop court (${title.length}/30-60 chars)`);
    score -= 15;
  } else if (title.length > 60) {
    issues.push(`Titre trop long (${title.length}/60 chars max)`);
    score -= 10;
  }

  // Meta description checks
  if (!description || description.trim().length === 0) {
    issues.push('Meta description manquante');
    score -= 30;
  } else if (description.length < 120) {
    issues.push(`Meta description trop courte (${description.length}/120-160 chars)`);
    score -= 15;
  } else if (description.length > 160) {
    issues.push(`Meta description trop longue (${description.length}/160 chars max)`);
    score -= 10;
  }

  return { score: Math.max(0, score), issues };
};

const SEO = () => {
  const [pages, setPages] = useState<PageSEOData[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageSEOData | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [globalSettings, setGlobalSettings] = useState<SEOGlobalSettings>({
    siteName: '',
    siteDescription: '',
    twitterHandle: '',
    googleVerification: '',
    robots: 'index, follow',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load SEO data from admin_settings
  const fetchSEOData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value');

      if (error) throw error;

      const settingsMap: Record<string, any> = {};
      (data || []).forEach(row => {
        try {
          settingsMap[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
        } catch {
          settingsMap[row.key] = row.value;
        }
      });

      // Load global settings
      setGlobalSettings({
        siteName: settingsMap.site_name || settingsMap.seo_site_name || 'Le Compagnon Virtuel',
        siteDescription: settingsMap.site_description || settingsMap.seo_site_description || '',
        twitterHandle: settingsMap.seo_twitter_handle || '',
        googleVerification: settingsMap.seo_google_verification || '',
        robots: settingsMap.seo_robots || 'index, follow',
      });

      // Load per-page SEO data
      const seoPages = settingsMap.seo_pages || {};
      const auditedPages: PageSEOData[] = SITE_PAGES.map(page => {
        const pageData = seoPages[page.path] || {};
        const title = pageData.title || '';
        const metaDescription = pageData.metaDescription || '';
        const { score, issues } = auditPage(title, metaDescription);
        return {
          path: page.path,
          label: page.label,
          title,
          metaDescription,
          score,
          issues,
        };
      });

      setPages(auditedPages);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSEOData();
  }, [fetchSEOData]);

  // Run real audit (re-score all pages)
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Re-audit all pages with current data
    const reAudited = pages.map(page => {
      const { score, issues } = auditPage(page.title, page.metaDescription);
      return { ...page, score, issues };
    });
    setPages(reAudited);
    setIsAnalyzing(false);

    const avg = reAudited.length > 0
      ? Math.round(reAudited.reduce((a, p) => a + p.score, 0) / reAudited.length)
      : 0;
    toast({
      title: "Analyse terminée",
      description: `Score SEO global : ${avg}/100`,
    });
  };

  // Save page SEO to admin_settings
  const savePageSEO = async (path: string, title: string, metaDescription: string) => {
    setIsSaving(true);
    try {
      // Load current seo_pages
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'seo_pages')
        .single();

      let seoPages: Record<string, any> = {};
      if (existing?.value) {
        seoPages = typeof existing.value === 'string' ? JSON.parse(existing.value) : existing.value;
      }

      seoPages[path] = { title, metaDescription };

      // Upsert
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ key: 'seo_pages', value: seoPages as any }, { onConflict: 'key' });

      if (error) throw error;

      // Update local state
      setPages(prev => prev.map(p => {
        if (p.path === path) {
          const { score, issues } = auditPage(title, metaDescription);
          return { ...p, title, metaDescription, score, issues };
        }
        return p;
      }));

      setSelectedPage(null);
      toast({ title: "Meta tags sauvegardés", description: `Page ${path} mise à jour` });
    } catch (error) {
      console.error('Error saving SEO:', error);
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de sauvegarder' });
    } finally {
      setIsSaving(false);
    }
  };

  // Save global settings
  const saveGlobalSettings = async () => {
    setIsSaving(true);
    try {
      const updates = [
        { key: 'seo_site_name', value: JSON.stringify(globalSettings.siteName) },
        { key: 'seo_site_description', value: JSON.stringify(globalSettings.siteDescription) },
        { key: 'seo_twitter_handle', value: JSON.stringify(globalSettings.twitterHandle) },
        { key: 'seo_google_verification', value: JSON.stringify(globalSettings.googleVerification) },
        { key: 'seo_robots', value: JSON.stringify(globalSettings.robots) },
      ];

      for (const update of updates) {
        await supabase
          .from('admin_settings')
          .upsert({ key: update.key, value: update.value as any }, { onConflict: 'key' });
      }

      toast({ title: "Paramètres SEO sauvegardés" });
    } catch (error) {
      console.error('Error saving global settings:', error);
      toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de sauvegarder' });
    } finally {
      setIsSaving(false);
    }
  };

  const overallScore = pages.length > 0
    ? Math.round(pages.reduce((acc, p) => acc + p.score, 0) / pages.length)
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const handleSelectPage = (page: PageSEOData) => {
    setSelectedPage(page);
    setEditTitle(page.title);
    setEditDescription(page.metaDescription);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                Optimisation SEO
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez le référencement de votre site
              </p>
            </div>
            <Button onClick={runAnalysis} disabled={isAnalyzing || isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Analyse...' : 'Analyser le site'}
            </Button>
          </div>

          {/* Global Score */}
          {!isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 rounded-full border-4 ${getScoreBg(overallScore).replace('bg-', 'border-')} flex items-center justify-center`}>
                        <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                          {overallScore}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Score SEO global</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {pages.every(p => p.title === '' && p.metaDescription === '')
                          ? 'Aucune donnée SEO configurée. Remplissez les meta tags de chaque page pour améliorer votre score.'
                          : overallScore >= 90
                          ? 'Excellent ! Votre site est bien optimisé pour les moteurs de recherche.'
                          : overallScore >= 70
                          ? 'Bon score. Quelques améliorations sont possibles.'
                          : 'Des optimisations sont nécessaires pour améliorer votre référencement.'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-500/10 text-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {pages.filter(p => p.score >= 90).length} pages optimisées
                        </Badge>
                        <Badge className="bg-amber-500/10 text-amber-500">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {pages.filter(p => p.score < 90 && p.score >= 70).length} à améliorer
                        </Badge>
                        {pages.filter(p => p.score < 70).length > 0 && (
                          <Badge className="bg-red-500/10 text-red-500">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {pages.filter(p => p.score < 70).length} à corriger
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs defaultValue="pages" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="global">Paramètres globaux</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-6">
              {/* Edit selected page */}
              {selectedPage && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Modifier : {selectedPage.label} ({selectedPage.path})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titre de la page</Label>
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Ex: Le Compagnon Virtuel | Agence Web Full-Stack"
                          maxLength={70}
                        />
                        <p className={`text-xs ${editTitle.length >= 30 && editTitle.length <= 60 ? 'text-green-500' : 'text-amber-500'}`}>
                          {editTitle.length}/60 caractères (idéal : 30-60)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Meta description</Label>
                        <Textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description de la page pour les moteurs de recherche..."
                          rows={3}
                          maxLength={200}
                        />
                        <p className={`text-xs ${editDescription.length >= 120 && editDescription.length <= 160 ? 'text-green-500' : 'text-amber-500'}`}>
                          {editDescription.length}/160 caractères (idéal : 120-160)
                        </p>
                      </div>

                      {/* Google Preview */}
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <p className="text-xs text-muted-foreground mb-2">Aperçu Google</p>
                        <p className="text-blue-600 dark:text-blue-400 text-base font-medium truncate">
                          {editTitle || 'Titre de la page'}
                        </p>
                        <p className="text-green-700 dark:text-green-500 text-xs truncate">
                          votresite.com{selectedPage.path}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {editDescription || 'Ajoutez une meta description pour voir l\'aperçu...'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => savePageSEO(selectedPage.path, editTitle, editDescription)}
                          disabled={isSaving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedPage(null)}>
                          Annuler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Pages List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Optimisation par page
                  </CardTitle>
                  <CardDescription>
                    Cliquez sur une page pour modifier ses balises meta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse h-20 bg-muted rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pages.map((page, index) => (
                        <motion.div
                          key={page.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSelectPage(page)}
                          className={`flex items-center justify-between p-4 rounded-xl border hover:border-primary/30 hover:bg-secondary/30 cursor-pointer transition-all ${
                            selectedPage?.path === page.path ? 'border-primary/50 bg-primary/5' : 'border-border'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <span className="font-mono text-sm text-primary">{page.path}</span>
                              <span className="text-xs text-muted-foreground">({page.label})</span>
                            </div>
                            <p className="font-medium truncate">
                              {page.title || <span className="text-muted-foreground italic">Titre non défini</span>}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {page.metaDescription || <span className="italic">Description non définie</span>}
                            </p>
                            {page.issues.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {page.issues.map((issue, i) => (
                                  <Badge key={i} variant="outline" className="text-xs text-amber-500 border-amber-500/30">
                                    {issue}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBg(page.score)}/10`}>
                              <span className={`font-bold ${getScoreColor(page.score)}`}>
                                {page.score}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="global" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres SEO globaux</CardTitle>
                  <CardDescription>
                    Ces paramètres s'appliquent à l'ensemble du site et sont sauvegardés en base de données
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom du site</Label>
                      <Input
                        value={globalSettings.siteName}
                        onChange={(e) => setGlobalSettings({...globalSettings, siteName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter/X Handle</Label>
                      <Input
                        value={globalSettings.twitterHandle}
                        onChange={(e) => setGlobalSettings({...globalSettings, twitterHandle: e.target.value})}
                        placeholder="@votrecompte"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description par défaut</Label>
                    <Textarea
                      value={globalSettings.siteDescription}
                      onChange={(e) => setGlobalSettings({...globalSettings, siteDescription: e.target.value})}
                      rows={3}
                    />
                    <p className={`text-xs ${globalSettings.siteDescription.length >= 120 && globalSettings.siteDescription.length <= 160 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {globalSettings.siteDescription.length}/160 caractères
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Google Search Console Verification</Label>
                    <Input
                      value={globalSettings.googleVerification}
                      onChange={(e) => setGlobalSettings({...globalSettings, googleVerification: e.target.value})}
                      placeholder="Clé de vérification Google"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Directive robots.txt</Label>
                    <Input
                      value={globalSettings.robots}
                      onChange={(e) => setGlobalSettings({...globalSettings, robots: e.target.value})}
                    />
                  </div>

                  <Button onClick={saveGlobalSettings} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SEO;
