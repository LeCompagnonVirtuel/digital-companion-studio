import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  Percent,
  Calendar,
  Users,
  MoreHorizontal,
  Copy,
  ToggleLeft,
  ToggleRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  max_uses: number | null;
  current_uses: number;
  min_order_amount: number | null;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

const usePromoCodes = () => {
  return useQuery({
    queryKey: ["admin-promo-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PromoCode[];
    },
  });
};

const AdminPromoCodes = () => {
  const { data: codes, isLoading } = usePromoCodes();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<PromoCode | null>(null);

  const filteredCodes = codes?.filter((c) =>
    !searchQuery || c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: codes?.length || 0,
    active: codes?.filter((c) => c.is_active).length || 0,
    expired: codes?.filter((c) => c.expires_at && new Date(c.expires_at) < new Date()).length || 0,
    totalUses: codes?.reduce((sum, c) => sum + c.current_uses, 0) || 0,
  };

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("promo_codes").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promo-codes"] });
      toast({ title: "Code promo mis à jour" });
    },
  });

  const deleteCode = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("promo_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promo-codes"] });
      toast({ title: "Code promo supprimé" });
      setDeleteDialogOpen(false);
    },
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copié !", description: code });
  };

  const isExpired = (code: PromoCode) =>
    code.expires_at && new Date(code.expires_at) < new Date();

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : "-";

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">Codes Promo</h1>
              <p className="text-muted-foreground text-sm">Gérez vos offres promotionnelles</p>
            </div>
            <Button onClick={() => { setEditingCode(null); setIsFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau code
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total codes", value: stats.total, icon: Tag, color: "bg-primary/10 text-primary" },
              { label: "Actifs", value: stats.active, icon: CheckCircle, color: "bg-emerald-500/10 text-emerald-500" },
              { label: "Expirés", value: stats.expired, icon: XCircle, color: "bg-red-500/10 text-red-500" },
              { label: "Utilisations", value: stats.totalUses, icon: Users, color: "bg-blue-500/10 text-blue-500" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color.split(" ")[0]}`}>
                      <s.icon className={`w-5 h-5 ${s.color.split(" ")[1]}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : filteredCodes && filteredCodes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Réduction</TableHead>
                      <TableHead>Utilisations</TableHead>
                      <TableHead>Min. commande</TableHead>
                      <TableHead>Expiration</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="w-[60px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredCodes.map((code, i) => (
                        <motion.tr
                          key={code.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                                {code.code}
                              </code>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyCode(code.code)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-bold">
                              -{code.discount_percent}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <span className="text-sm">{code.current_uses}{code.max_uses ? `/${code.max_uses}` : ''}</span>
                              {code.max_uses && (
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min((code.current_uses / code.max_uses) * 100, 100)}%` }} />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {code.min_order_amount
                              ? `${code.min_order_amount.toLocaleString("fr-FR")} F CFA`
                              : "-"}
                          </TableCell>
                          <TableCell>
                            <div>
                              <span className={isExpired(code) ? "text-red-500" : ""}>{formatDate(code.expires_at)}</span>
                              {code.expires_at && !isExpired(code) && (() => {
                                const days = Math.ceil((new Date(code.expires_at).getTime() - Date.now()) / 86400000);
                                return days <= 7 ? <p className="text-[10px] text-amber-500 mt-0.5">Expire dans {days}j</p> : null;
                              })()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {isExpired(code) ? (
                              <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Expiré</Badge>
                            ) : code.is_active ? (
                              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Actif</Badge>
                            ) : (
                              <Badge variant="secondary">Inactif</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => { setEditingCode(code); setIsFormOpen(true); }}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleActive.mutate({ id: code.id, is_active: !code.is_active })}>
                                  {code.is_active ? <ToggleLeft className="w-4 h-4 mr-2" /> : <ToggleRight className="w-4 h-4 mr-2" />}
                                  {code.is_active ? "Désactiver" : "Activer"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => copyCode(code.code)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copier le code
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => { setCodeToDelete(code); setDeleteDialogOpen(true); }}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <Tag className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-1">Aucun code promo</h3>
                  <p className="text-sm text-muted-foreground mb-4">Créez votre premier code promotionnel</p>
                  <Button onClick={() => { setEditingCode(null); setIsFormOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Dialog */}
        <PromoCodeFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          promoCode={editingCode}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer ce code promo ?</AlertDialogTitle>
              <AlertDialogDescription>
                Le code <strong>{codeToDelete?.code}</strong> sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => codeToDelete && deleteCode.mutate(codeToDelete.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};


const PromoCodeFormDialog = ({
  open,
  onOpenChange,
  promoCode,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  promoCode: PromoCode | null;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!promoCode;

  const [form, setForm] = useState({
    code: "",
    discount_percent: 10,
    max_uses: null as number | null,
    min_order_amount: null as number | null,
    is_active: true,
    expires_at: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open && promoCode) {
      setForm({
        code: promoCode.code,
        discount_percent: promoCode.discount_percent,
        max_uses: promoCode.max_uses,
        min_order_amount: promoCode.min_order_amount,
        is_active: promoCode.is_active,
        expires_at: promoCode.expires_at ? promoCode.expires_at.split("T")[0] : "",
      });
    } else if (open && !promoCode) {
      setForm({ code: "", discount_percent: 10, max_uses: null, min_order_amount: null, is_active: true, expires_at: "" });
    }
  }, [open, promoCode]);

  const handleSubmit = async () => {
    if (!form.code.trim()) return;
    setIsSaving(true);
    try {
      const payload = {
        code: form.code.toUpperCase().trim(),
        discount_percent: form.discount_percent,
        max_uses: form.max_uses,
        min_order_amount: form.min_order_amount,
        is_active: form.is_active,
        expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      };

      if (isEditing) {
        const { error } = await supabase.from("promo_codes").update(payload).eq("id", promoCode.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("promo_codes").insert(payload);
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["admin-promo-codes"] });
      toast({ title: isEditing ? "Code mis à jour" : "Code créé avec succès" });
      onOpenChange(false);
      setForm({ code: "", discount_percent: 10, max_uses: null, min_order_amount: null, is_active: true, expires_at: "" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => {
      if (!o) setForm({ code: "", discount_percent: 10, max_uses: null, min_order_amount: null, is_active: true, expires_at: "" });
      onOpenChange(o);
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier le code promo" : "Nouveau code promo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Code *</Label>
            <Input
              value={form.code}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
              placeholder="PROMO30"
              className="font-mono uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Réduction (%)</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={form.discount_percent}
                onChange={(e) => setForm((p) => ({ ...p, discount_percent: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Max utilisations</Label>
              <Input
                type="number"
                min={0}
                value={form.max_uses ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, max_uses: e.target.value ? parseInt(e.target.value) : null }))}
                placeholder="Illimité"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Montant min. (F CFA)</Label>
              <Input
                type="number"
                min={0}
                value={form.min_order_amount ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, min_order_amount: e.target.value ? parseInt(e.target.value) : null }))}
                placeholder="Aucun"
              />
            </div>
            <div className="space-y-2">
              <Label>Date d'expiration</Label>
              <Input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm((p) => ({ ...p, expires_at: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Code actif</p>
              <p className="text-xs text-muted-foreground">Utilisable par les clients</p>
            </div>
            <Switch
              checked={form.is_active}
              onCheckedChange={(v) => setForm((p) => ({ ...p, is_active: v }))}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={isSaving || !form.code.trim()}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPromoCodes;
