import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Search, Target, MessageSquare, TrendingUp, Copy, Mail } from 'lucide-react';

const Growth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorName, setCompetitorName] = useState('');
  const [scanResult, setScanResult] = useState<string>('');
  const [prospects, setProspects] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const refresh = async () => {
    const [p, c, m] = await Promise.all([
      supabase.from('gi_prospects').select('*').order('score', { ascending: false }).limit(50),
      supabase.from('gi_competitors').select('*').order('updated_at', { ascending: false }),
      supabase.from('gi_messages').select('*, gi_prospects(company_name)').order('created_at', { ascending: false }).limit(30),
    ]);
    setProspects(p.data || []);
    setCompetitors(c.data || []);
    setMessages(m.data || []);
  };

  useEffect(() => { refresh(); }, []);

  const discover = async () => {
    if (!query.trim()) return;
    setLoading('discover');
    try {
      const { data, error } = await supabase.functions.invoke('gi-prospect-discover', { body: { query, limit: 10 } });
      if (error) throw error;
      toast({ title: 'Prospects découverts', description: `${data.count} résultats ajoutés.` });
      await refresh();
    } catch (e: any) {
      toast({ title: 'Erreur', description: e.message, variant: 'destructive' });
    } finally { setLoading(null); }
  };

  const scanCompetitor = async () => {
    if (!competitorUrl.trim()) return;
    setLoading('scan');
    try {
      let competitor_id: string | null = null;
      if (competitorName) {
        const { data } = await supabase.from('gi_competitors').insert({ name: competitorName, website: competitorUrl }).select().single();
        competitor_id = data?.id || null;
      }
      const { data, error } = await supabase.functions.invoke('gi-competitor-scan', { body: { competitor_id, website: competitorUrl } });
      if (error) throw error;
      setScanResult(data.insights);
      toast({ title: 'Analyse terminée' });
      await refresh();
    } catch (e: any) {
      toast({ title: 'Erreur', description: e.message, variant: 'destructive' });
    } finally { setLoading(null); }
  };

  const generateMessage = async (prospect_id: string) => {
    setLoading(`msg-${prospect_id}`);
    try {
      const { error } = await supabase.functions.invoke('gi-generate-message', { body: { prospect_id, channel: 'email' } });
      if (error) throw error;
      toast({ title: 'Message généré' });
      await refresh();
    } catch (e: any) {
      toast({ title: 'Erreur', description: e.message, variant: 'destructive' });
    } finally { setLoading(null); }
  };

  const copyMsg = (m: any) => {
    navigator.clipboard.writeText(`${m.subject ? `Objet: ${m.subject}\n\n` : ''}${m.body}`);
    toast({ title: 'Copié dans le presse-papier' });
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-primary" />
              Growth Intelligence
            </h1>
            <p className="text-muted-foreground mt-1">Veille concurrentielle, prospection IA et génération d'opportunités</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{prospects.length}</div><p className="text-xs text-muted-foreground">Prospects</p></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{competitors.length}</div><p className="text-xs text-muted-foreground">Concurrents</p></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{messages.length}</div><p className="text-xs text-muted-foreground">Messages</p></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{prospects.filter(p => p.score >= 70).length}</div><p className="text-xs text-muted-foreground">Hot leads</p></CardContent></Card>
          </div>

          <Tabs defaultValue="prospects">
            <TabsList>
              <TabsTrigger value="prospects"><Target className="w-4 h-4 mr-2" />Prospects</TabsTrigger>
              <TabsTrigger value="competitors"><TrendingUp className="w-4 h-4 mr-2" />Concurrents</TabsTrigger>
              <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-2" />Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="prospects" className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Search className="w-5 h-5" />Découvrir des prospects</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="Ex: PME Côte d'Ivoire e-commerce sans site moderne" value={query} onChange={e => setQuery(e.target.value)} />
                    <Button onClick={discover} disabled={loading === 'discover'}>
                      {loading === 'discover' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Lancer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                {prospects.map(p => (
                  <Card key={p.id}>
                    <CardContent className="pt-4 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold truncate">{p.company_name}</h3>
                          <Badge variant={p.score >= 70 ? 'default' : 'secondary'}>Score {p.score}</Badge>
                          <Badge variant="outline">{p.status}</Badge>
                        </div>
                        {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate block">{p.website}</a>}
                        {p.notes && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.notes}</p>}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => generateMessage(p.id)} disabled={loading === `msg-${p.id}`}>
                        {loading === `msg-${p.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4 mr-1" />Message</>}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {prospects.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Aucun prospect. Lancez une recherche ci-dessus.</p>}
              </div>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">Analyser un concurrent</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Nom (optionnel pour sauvegarder)" value={competitorName} onChange={e => setCompetitorName(e.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="https://concurrent.com" value={competitorUrl} onChange={e => setCompetitorUrl(e.target.value)} />
                    <Button onClick={scanCompetitor} disabled={loading === 'scan'}>
                      {loading === 'scan' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyser'}
                    </Button>
                  </div>
                  {scanResult && (
                    <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-sans">{scanResult}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                {competitors.map(c => (
                  <Card key={c.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{c.name}</h3>
                          {c.website && <a href={c.website} target="_blank" rel="noreferrer" className="text-sm text-primary">{c.website}</a>}
                        </div>
                        {c.last_scan_at && <span className="text-xs text-muted-foreground">Scanné le {new Date(c.last_scan_at).toLocaleDateString('fr-FR')}</span>}
                      </div>
                      {c.last_scan_summary && <details className="mt-2"><summary className="text-sm cursor-pointer text-primary">Voir l'analyse</summary><pre className="whitespace-pre-wrap text-sm mt-2 p-3 bg-secondary/40 rounded font-sans">{c.last_scan_summary}</pre></details>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-2">
              {messages.map(m => (
                <Card key={m.id}>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{m.gi_prospects?.company_name || 'Prospect'}</p>
                        {m.subject && <p className="text-sm text-muted-foreground truncate">Objet: {m.subject}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{m.channel}</Badge>
                        <Badge>{m.status}</Badge>
                        <Button size="sm" variant="ghost" onClick={() => copyMsg(m)}><Copy className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <Textarea value={m.body} readOnly className="text-sm" rows={5} />
                  </CardContent>
                </Card>
              ))}
              {messages.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Aucun message. Générez-en depuis l'onglet Prospects.</p>}
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Growth;
