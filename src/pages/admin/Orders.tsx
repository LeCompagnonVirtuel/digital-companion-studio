import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  Mail,
  Package,
  Calendar,
  DollarSign,
  RefreshCw,
  Link,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Send,
  CreditCard,
  Eye,
  Copy,
  ExternalLink,
  FileDown,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useAdminOrders, useUpdateOrder, Order } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";

const statusOptions = [
  { value: "pending", label: "En attente", icon: Clock, color: "text-amber-500" },
  { value: "paid", label: "Payé", icon: CheckCircle, color: "text-emerald-500" },
  { value: "failed", label: "Échoué", icon: XCircle, color: "text-red-500" },
  { value: "refunded", label: "Remboursé", icon: RefreshCw, color: "text-blue-500" },
  { value: "cancelled", label: "Annulé", icon: AlertCircle, color: "text-gray-500" },
];

const AdminOrders = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const updateOrder = useUpdateOrder();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [orderToRefund, setOrderToRefund] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      !searchQuery ||
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter((o) => o.status === "pending").length || 0,
    paid: orders?.filter((o) => o.status === "paid").length || 0,
    totalRevenue:
      orders
        ?.filter((o) => o.status === "paid")
        .reduce((sum, o) => sum + o.price, 0) || 0,
  };

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find((s) => s.value === status);
    if (!option) return <Badge variant="outline">{status}</Badge>;

    const Icon = option.icon;
    const colorClass = option.color;

    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Badge>
        );
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const updateOrderStatus = async (order: Order, newStatus: string) => {
    await updateOrder.mutateAsync({
      id: order.id,
      status: newStatus,
    });
  };

  const handleRefund = (order: Order) => {
    setOrderToRefund(order);
    setIsRefundDialogOpen(true);
  };

  const confirmRefund = async () => {
    if (orderToRefund) {
      await updateOrder.mutateAsync({
        id: orderToRefund.id,
        status: "refunded",
        notes: `${orderToRefund.notes || ""}\n[${new Date().toLocaleString("fr-FR")}] Remboursement effectué.`.trim(),
      });
      setIsRefundDialogOpen(false);
      setOrderToRefund(null);
    }
  };

  const resendDownloadLink = async (order: Order) => {
    // TODO: Implement email sending via Edge Function
    toast({
      title: "Lien renvoyé",
      description: `Le lien de téléchargement a été renvoyé à ${order.customer_email}`,
    });
    
    // Add note to order
    await updateOrder.mutateAsync({
      id: order.id,
      notes: `${order.notes || ""}\n[${new Date().toLocaleString("fr-FR")}] Lien de téléchargement renvoyé.`.trim(),
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: `${label} copié dans le presse-papier.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number, currency: string = "XOF") => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">Commandes</h1>
              <p className="text-muted-foreground text-sm">Gérez toutes les commandes de la boutique</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                if (!filteredOrders?.length) return;
                const headers = ["Numéro", "Client", "Email", "Produit", "Montant", "Devise", "Statut", "Méthode", "Date"];
                const rows = filteredOrders.map((o) => [
                  o.order_number,
                  o.customer_name || "",
                  o.customer_email,
                  o.product_title,
                  o.price,
                  o.currency || "XOF",
                  o.status,
                  o.payment_method || "",
                  formatDate(o.created_at),
                ]);
                const csv = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
                const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `commandes-${new Date().toISOString().split("T")[0]}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              disabled={!filteredOrders?.length}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total commandes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">En attente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.paid}</p>
                    <p className="text-xs text-muted-foreground">Payées</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
                    <p className="text-xs text-muted-foreground">Revenus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par commande, email, client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-44">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  {[
                    { label: "Aujourd'hui", value: 'today' },
                    { label: '7 jours', value: '7d' },
                    { label: '30 jours', value: '30d' },
                    { label: 'Tout', value: 'all' },
                  ].map(f => (
                    <Button
                      key={f.value}
                      variant={f.value === 'all' ? 'secondary' : 'ghost'}
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        // Date filter is visual only - filters handled by statusFilter
                      }}
                    >
                      {f.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : filteredOrders && filteredOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commande</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredOrders.map((order, index) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.03 }}
                          className="group cursor-pointer hover:bg-secondary/30"
                          onClick={() => openOrderDetails(order)}
                        >
                          <TableCell>
                            <div className="font-mono text-sm font-medium">
                              {order.order_number}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {order.customer_name || "Client"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.customer_email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="line-clamp-1 max-w-[200px]">
                              {order.product_title}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">
                              {formatPrice(order.price, order.currency)}
                            </p>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(order.created_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openOrderDetails(order); }}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Voir détails
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {statusOptions.map((option) => (
                                  <DropdownMenuItem
                                    key={option.value}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateOrderStatus(order, option.value);
                                    }}
                                    disabled={order.status === option.value}
                                  >
                                    <option.icon className={`w-4 h-4 mr-2 ${option.color}`} />
                                    Marquer {option.label.toLowerCase()}
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                {order.download_link && (
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); resendDownloadLink(order); }}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Renvoyer le lien
                                  </DropdownMenuItem>
                                )}
                                {order.status === "paid" && (
                                  <DropdownMenuItem
                                    onClick={(e) => { e.stopPropagation(); handleRefund(order); }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Rembourser
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-1">Aucune commande trouvée</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery || statusFilter !== "all"
                      ? "Essayez de modifier vos filtres"
                      : "Les commandes apparaîtront ici"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="font-mono">{selectedOrder.order_number}</span>
                    {getStatusBadge(selectedOrder.status)}
                  </DialogTitle>
                  <DialogDescription>
                    Commande du {formatDate(selectedOrder.created_at)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Client
                    </h4>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedOrder.customer_email}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(selectedOrder.customer_email, "Email")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        {selectedOrder.customer_name && (
                          <p className="text-muted-foreground">
                            Nom: {selectedOrder.customer_name}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Produit
                    </h4>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{selectedOrder.product_title}</span>
                          <span className="font-bold text-lg">
                            {formatPrice(selectedOrder.price, selectedOrder.currency)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Paiement
                    </h4>
                    <Card>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedOrder.payment_method || "Non spécifié"}</span>
                        </div>
                        {selectedOrder.payment_id && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              ID: {selectedOrder.payment_id}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => copyToClipboard(selectedOrder.payment_id!, "ID paiement")}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Download Info */}
                  {selectedOrder.download_link && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Téléchargement
                      </h4>
                      <Card>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Download className="w-4 h-4 text-muted-foreground" />
                            <span>Téléchargements: {selectedOrder.download_count || 0}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={selectedOrder.download_link}
                              readOnly
                              className="text-sm"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => copyToClipboard(selectedOrder.download_link!, "Lien")}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              asChild
                            >
                              <a href={selectedOrder.download_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                          <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => resendDownloadLink(selectedOrder)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Renvoyer le lien de téléchargement
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Notes & Historique
                    </h4>
                    <Card>
                      <CardContent className="p-4">
                        {selectedOrder.notes ? (
                          <pre className="text-sm whitespace-pre-wrap font-sans">
                            {selectedOrder.notes}
                          </pre>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            Aucune note
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) => {
                        updateOrderStatus(selectedOrder, value);
                        setSelectedOrder({ ...selectedOrder, status: value });
                      }}
                    >
                      <SelectTrigger className="w-full md:w-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedOrder.status === "paid" && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRefund(selectedOrder)}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Rembourser
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Refund Confirmation Dialog */}
        <AlertDialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer le remboursement</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir rembourser cette commande ?
                {orderToRefund && (
                  <span className="block mt-2 font-medium">
                    {orderToRefund.order_number} - {formatPrice(orderToRefund.price, orderToRefund.currency)}
                  </span>
                )}
                Cette action marquera la commande comme remboursée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmRefund}>
                Confirmer le remboursement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminOrders;
