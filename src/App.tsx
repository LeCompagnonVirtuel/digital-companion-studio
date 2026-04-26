import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/hooks/useCart";
import { CurrencyProvider } from "@/hooks/useCurrency";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Chatbot } from "@/components/Chatbot";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { RetentionProvider } from "@/components/retention";
import { FloatingCartButton } from "@/components/shop/FloatingCartButton";
import { useMaintenanceMode } from "@/hooks/useMaintenanceMode";
import { SplashScreen } from "@/components/SplashScreen";
import Maintenance from "./pages/Maintenance";
import Index from "./pages/Index";
import Services from "./pages/Services";
import DeveloppementWeb from "./pages/services/DeveloppementWeb";
import AutomatisationIA from "./pages/services/AutomatisationIA";
import MarketingDigital from "./pages/services/MarketingDigital";
import DesignBranding from "./pages/services/DesignBranding";
import ApplicationsMobiles from "./pages/services/ApplicationsMobiles";
import CommunityManagement from "./pages/services/CommunityManagement";
import CreationContenu from "./pages/services/CreationContenu";
import GadgetsNumeriques from "./pages/services/GadgetsNumeriques";
import Ecommerce from "./pages/services/Ecommerce";
import AuditDigital from "./pages/services/AuditDigital";
import SEOService from "./pages/services/SEO";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import PortfolioProject from "./pages/PortfolioProject";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";
import StartProject from "./pages/StartProject";
import FreeAudit from "./pages/FreeAudit";
import StartAudit from "./pages/StartAudit";
import TalkProject from "./pages/TalkProject";
import PackPro from "./pages/PackPro";
import DevisPersonnalise from "./pages/DevisPersonnalise";
import Shop from "./pages/Shop";
import ShopProduct from "./pages/ShopProduct";
import ShopCheckout from "./pages/ShopCheckout";
import ShopConfirmation from "./pages/ShopConfirmation";
import ShopPaymentError from "./pages/ShopPaymentError";
import FreeResources from "./pages/FreeResources";
import GuideEntrepreneur from "./pages/GuideEntrepreneur";
import DiagnosticGratuit from "./pages/DiagnosticGratuit";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import BlogAdmin from "./pages/admin/Blog";
import SEO from "./pages/admin/SEO";
import AdminPortfolio from "./pages/admin/Portfolio";
import AdminShop from "./pages/admin/Shop";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminPromoCodes from "./pages/admin/PromoCodes";
import Media from "./pages/admin/Media";
import Backups from "./pages/admin/Backups";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Monitoring from "./pages/admin/Monitoring";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ChatbotWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/auth";
  
  if (isAdminRoute) return null;
  return <Chatbot />;
}

function MaintenanceBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-destructive text-destructive-foreground text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
      <span>🚧 Mode maintenance actif — les visiteurs voient la page de maintenance.</span>
      <a href="/admin/settings" className="underline font-bold hover:opacity-80">Paramètres</a>
    </div>
  );
}

function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isMaintenanceActive, title, message, estimatedReturn, isLoading } = useMaintenanceMode();
  const { isAuthenticated: isAdmin, isLoading: isAdminLoading } = useAdminAuth();

  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/auth";

  // Always allow admin routes
  if (isAdminRoute) return <>{children}</>;

  // Wait for both checks
  if (isLoading || isAdminLoading) return null;

  // If maintenance active and not admin, show maintenance page
  if (isMaintenanceActive && !isAdmin) {
    return <Maintenance title={title} message={message} estimatedReturn={estimatedReturn} />;
  }

  // Admin sees the site normally but with a warning banner
  if (isMaintenanceActive && isAdmin) {
    return (
      <>
        <MaintenanceBanner />
        <div className="pt-10">{children}</div>
      </>
    );
  }

  return <>{children}</>;
}

const App = () => {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("lcv_visited"));
  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("lcv_visited", "1");
    setShowSplash(false);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
                <BrowserRouter>
                  <MaintenanceGuard>
                    <RetentionProvider>
                      <ScrollToTop />
                      <AnalyticsTracker />
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/developpement-web" element={<DeveloppementWeb />} />
                        <Route path="/services/automatisation-ia" element={<AutomatisationIA />} />
                        <Route path="/services/marketing-digital" element={<MarketingDigital />} />
                        <Route path="/services/design-branding" element={<DesignBranding />} />
                        <Route path="/services/applications-mobiles" element={<ApplicationsMobiles />} />
                        <Route path="/services/community-management" element={<CommunityManagement />} />
                        <Route path="/services/creation-contenu" element={<CreationContenu />} />
                        <Route path="/services/gadgets-numeriques" element={<GadgetsNumeriques />} />
                        <Route path="/services/ecommerce" element={<Ecommerce />} />
                        <Route path="/services/audit-digital" element={<AuditDigital />} />
                        <Route path="/services/seo" element={<SEOService />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:slug" element={<PortfolioProject />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/legal" element={<Legal />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/demarrer-projet" element={<StartProject />} />
                        <Route path="/audit-gratuit" element={<FreeAudit />} />
                        <Route path="/demarrer-audit" element={<StartAudit />} />
                        <Route path="/parlons-projet" element={<TalkProject />} />
                        <Route path="/pack-pro" element={<PackPro />} />
                        <Route path="/devis-personnalise" element={<DevisPersonnalise />} />
                        {/* Shop Routes */}
                        <Route path="/boutique" element={<Shop />} />
                        <Route path="/boutique/:slug" element={<ShopProduct />} />
                        <Route path="/boutique/checkout" element={<ShopCheckout />} />
                        <Route path="/boutique/confirmation" element={<ShopConfirmation />} />
                        <Route path="/boutique/paiement-erreur" element={<ShopPaymentError />} />
                        <Route path="/ressources-gratuites" element={<FreeResources />} />
                        <Route path="/guide-entrepreneur" element={<GuideEntrepreneur />} />
                        <Route path="/diagnostic-gratuit" element={<DiagnosticGratuit />} />
                        <Route path="/faq" element={<FAQ />} />
                        {/* Admin Routes */}
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/leads" element={<Leads />} />
                        <Route path="/admin/content" element={<Content />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/blog" element={<BlogAdmin />} />
                        <Route path="/admin/portfolio" element={<AdminPortfolio />} />
                        <Route path="/admin/shop" element={<AdminShop />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/customers" element={<AdminCustomers />} />
                        <Route path="/admin/promo-codes" element={<AdminPromoCodes />} />
                        <Route path="/admin/media" element={<Media />} />
                        <Route path="/admin/seo" element={<SEO />} />
                        <Route path="/admin/backups" element={<Backups />} />
                        <Route path="/admin/activity" element={<ActivityLogs />} />
                        <Route path="/admin/monitoring" element={<Monitoring />} />
                        <Route path="/admin/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <FloatingCartButton />
                      <ChatbotWrapper />
                    </RetentionProvider>
                  </MaintenanceGuard>
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </CurrencyProvider>
        </AdminAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
