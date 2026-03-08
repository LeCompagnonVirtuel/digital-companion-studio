import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Crown,
  Star,
  RefreshCw,
  UserPlus,
  TrendingUp,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  Eye,
  Download,
  Filter,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCustomers,
  useCustomerOrders,
  useCustomerStats,
  customerSegments,
  getCustomerSegment,
  Customer,
} from "@/hooks/useCustomers";

const AdminCustomers = () => {
  const { data: customers, isLoading } = useCustomers();
  const stats = useCustomerStats();

  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter customers
  const filteredCustomers = customers?.filter((customer) => {
    const matchesSearch =
      !searchQuery ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase());

    if (segmentFilter === "all") return matchesSearch;

    const segment = customerSegments.find((s) => s.id === segmentFilter);
    if (!segment) return matchesSearch;

    return matchesSearch && segment.filter(customer);
  });

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price: number, currency: string = "XOF") => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSegmentBadge = (customer: Customer) => {
    const segment = getCustomerSegment(customer);
    if (!segment) return null;

    return (
      <Badge
        className={`${segment.color} text-white border-0`}
        variant="secondary"
      >
        {segment.label}
      </Badge>
    );
  };

  const exportCustomers = () => {
    if (!filteredCustomers) return;

    const csvContent = [
      ["Email", "Nom", "Commandes", "Total dépensé", "Première commande", "Dernière commande", "Segment"].join(","),
      ...filteredCustomers.map((c) => [
        c.email,
        c.name || "",
        c.total_orders || 0,
        c.total_spent || 0,
        c.first_order_at || "",
        c.last_order_at || "",
        getCustomerSegment(c)?.label || "",
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `clients_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold">Clients CRM</h1>
              <p className="text-muted-foreground text-sm">Gérez vos clients et analysez leur comportement d'achat</p>
            </div>
            <Button onClick={exportCustomers} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter CSV
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.vip}</p>
                    <p className="text-xs text-muted-foreground">Clients VIP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.loyal}</p>
                    <p className="text-xs text-muted-foreground">Clients fidèles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
                    <p className="text-xs text-muted-foreground">Revenus totaux</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Segmentation Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Segmentation clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {customerSegments.map((segment) => {
                  const count = customers?.filter((c) => segment.filter(c)).length || 0;
                  return (
                    <button
                      key={segment.id}
                      onClick={() => setSegmentFilter(segment.id === segmentFilter ? "all" : segment.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        segmentFilter === segment.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                      <span className="font-medium">{segment.label}</span>
                      <Badge variant="secondary" className="ml-1">
                        {count}
                      </Badge>
                    </button>
                  );
                })}
                {segmentFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSegmentFilter("all")}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search & Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par email ou nom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les segments</SelectItem>
                    {customerSegments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${segment.color}`} />
                          {segment.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : filteredCustomers && filteredCustomers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead className="text-center">Commandes</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Dernière commande</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredCustomers.map((customer, index) => (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.03 }}
                          className="group cursor-pointer hover:bg-secondary/30"
                          onClick={() => openCustomerDetails(customer)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-semibold">
                                  {(customer.name || customer.email)[0].toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {customer.name || "Client"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {customer.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getSegmentBadge(customer)}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">
                              {customer.total_orders || 0}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">
                              {formatPrice(customer.total_spent || 0)}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(customer.last_order_at)}
                            </p>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openCustomerDetails(customer); }}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Voir détails
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { 
                                  e.stopPropagation(); 
                                  window.location.href = `mailto:${customer.email}`;
                                }}>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Envoyer un email
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
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-1">Aucun client trouvé</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery || segmentFilter !== "all"
                      ? "Essayez de modifier vos filtres"
                      : "Les clients apparaîtront ici après leur premier achat"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Customer Details Dialog */}
        <CustomerDetailsDialog
          customer={selectedCustomer}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

// Customer Details Dialog Component
const CustomerDetailsDialog = ({
  customer,
  isOpen,
  onClose,
}: {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: orders, isLoading: ordersLoading } = useCustomerOrders(customer?.email || null);

  if (!customer) return null;

  const segment = getCustomerSegment(customer);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-600";
      case "pending":
        return "bg-amber-500/10 text-amber-600";
      case "failed":
        return "bg-red-500/10 text-red-600";
      case "refunded":
        return "bg-blue-500/10 text-blue-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {(customer.name || customer.email)[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold">{customer.name || "Client"}</p>
              <p className="text-sm text-muted-foreground font-normal">
                {customer.email}
              </p>
            </div>
            {segment && (
              <Badge className={`${segment.color} text-white ml-auto`}>
                {segment.label}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs">Commandes</span>
              </div>
              <p className="text-xl font-bold">{customer.total_orders || 0}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs">Total dépensé</span>
              </div>
              <p className="text-xl font-bold">{formatPrice(customer.total_spent || 0)}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <UserPlus className="w-4 h-4" />
                <span className="text-xs">Première commande</span>
              </div>
              <p className="text-sm font-medium">{formatDate(customer.first_order_at)}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Dernière commande</span>
              </div>
              <p className="text-sm font-medium">{formatDate(customer.last_order_at)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Order History */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Historique des commandes
            </h3>

            {ordersLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm font-medium">
                          {order.order_number}
                        </p>
                        <Badge className={`${getStatusColor(order.status)} border-0`} variant="outline">
                          {order.status === "paid" ? "Payé" : 
                           order.status === "pending" ? "En attente" :
                           order.status === "refunded" ? "Remboursé" :
                           order.status === "failed" ? "Échoué" : order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {order.product_title}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">{formatPrice(order.price, order.currency)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Aucune commande trouvée</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button
            variant="outline"
            onClick={() => window.location.href = `mailto:${customer.email}`}
            className="gap-2"
          >
            <Mail className="w-4 h-4" />
            Contacter
          </Button>
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCustomers;
