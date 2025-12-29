import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { Chatbot } from "@/components/Chatbot";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import BlogAdmin from "./pages/admin/Blog";
import SEO from "./pages/admin/SEO";
import Media from "./pages/admin/Media";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to conditionally render chatbot
function ChatbotWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/auth";
  
  if (isAdminRoute) return null;
  return <Chatbot />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/leads" element={<Leads />} />
            <Route path="/admin/content" element={<Content />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/media" element={<Media />} />
            <Route path="/admin/seo" element={<SEO />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWrapper />
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
