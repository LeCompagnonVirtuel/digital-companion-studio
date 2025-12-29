import { useState } from 'react';
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
  Image as ImageIcon
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

interface PageSEO {
  path: string;
  title: string;
  metaDescription: string;
  score: number;
  issues: string[];
}

const pagesData: PageSEO[] = [
  {
    path: '/',
    title: 'Le Compagnon Virtuel | Agence Web Full-Stack',
    metaDescription: 'Créez votre site web professionnel avec Le Compagnon Virtuel. Design, développement, SEO et marketing digital.',
    score: 92,
    issues: []
  },
  {
    path: '/services',
    title: 'Nos Services | Le Compagnon Virtuel',
    metaDescription: 'Découvrez nos services de création web, développement d\'applications, SEO et marketing digital.',
    score: 88,
    issues: ['Meta description légèrement courte']
  },
  {
    path: '/portfolio',
    title: 'Portfolio | Le Compagnon Virtuel',
    metaDescription: 'Découvrez nos réalisations et études de cas.',
    score: 75,
    issues: ['Meta description trop courte', 'Ajouter plus de mots-clés']
  },
  {
    path: '/contact',
    title: 'Contact | Le Compagnon Virtuel',
    metaDescription: 'Contactez Le Compagnon Virtuel pour votre projet web.',
    score: 70,
    issues: ['Meta description trop courte', 'Ajouter un H2']
  },
];

const SEO = () => {
  const [pages, setPages] = useState<PageSEO[]>(pagesData);
  const [selectedPage, setSelectedPage] = useState<PageSEO | null>(null);
  const [globalSettings, setGlobalSettings] = useState({
    siteName: 'Le Compagnon Virtuel',
    siteDescription: 'Agence web full-stack spécialisée dans la création de sites et applications sur-mesure.',
    defaultOgImage: '/og-image.jpg',
    twitterHandle: '@lecompagnonvirtuel',
    googleVerification: '',
    robots: 'index, follow'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const overallScore = Math.round(pages.reduce((acc, p) => acc + p.score, 0) / pages.length);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    toast({
      title: "Analyse terminée",
      description: `Score SEO global : ${overallScore}/100`,
    });
  };

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
            <Button onClick={runAnalysis} disabled={isAnalyzing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Analyse...' : 'Analyser le site'}
            </Button>
          </div>

          {/* Global Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
                      {overallScore >= 90 
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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="pages" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="global">Paramètres globaux</TabsTrigger>
              <TabsTrigger value="tools">Outils</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-6">
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
                  <div className="space-y-4">
                    {pages.map((page, index) => (
                      <motion.div
                        key={page.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedPage(page)}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 cursor-pointer transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <span className="font-mono text-sm text-primary">{page.path}</span>
                          </div>
                          <p className="font-medium truncate">{page.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{page.metaDescription}</p>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="global" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres SEO globaux</CardTitle>
                  <CardDescription>
                    Ces paramètres s'appliquent à l'ensemble du site
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

                  <Button onClick={() => toast({ title: "Paramètres sauvegardés" })}>
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Core Web Vitals</span>
                        <span className="text-green-500">Bon</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Temps de chargement</span>
                        <span>1.8s</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Test PageSpeed
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-blue-500" />
                      Liens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Liens internes</span>
                      <Badge>124</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Liens externes</span>
                      <Badge>18</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Liens cassés</span>
                      <Badge className="bg-green-500/10 text-green-500">0</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Vérifier les liens
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Images optimisées</span>
                      <Badge className="bg-green-500/10 text-green-500">45/48</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Alt text manquants</span>
                      <Badge className="bg-amber-500/10 text-amber-500">3</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Optimiser les images
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      Sitemap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Pages indexées</span>
                      <Badge>12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dernière mise à jour</span>
                      <span className="text-sm text-muted-foreground">Aujourd'hui</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Régénérer le sitemap
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SEO;