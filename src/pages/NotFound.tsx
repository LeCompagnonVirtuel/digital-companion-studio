import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t('404.subtitle')}</p>
        <Button asChild>
          <Link to="/" className="gap-2">
            <Home size={18} />
            {t('404.back_home')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
