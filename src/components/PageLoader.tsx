import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PageLoader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="page-content flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{t('app.loading')}</p>
      </div>
    </div>
  );
};

export default PageLoader;