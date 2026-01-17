import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/hooks/useCart";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Chatbot } from "@/components/Chatbot";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { RetentionProvider } from "@/components/retention";
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
import Media from "./pages/admin/Media";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ChatbotWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/auth";
  
  if (isAdminRoute) return null;
  return <Chatbot />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                <Route path="/admin/media" element={<Media />} />
                <Route path="/admin/seo" element={<SEO />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatbotWrapper />
            </RetentionProvider>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
