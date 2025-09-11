import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateTabletDescription, TabletData } from "@/utils/tabletDescriptionGenerator";

interface TabletDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const TabletDescriptionPage = ({ data, onBack, onNewDescription }: TabletDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    return generateTabletDescription(data as TabletData, t);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDescription());
    toast({
      title: t('messages.copied_success'),
      description: t('messages.description_copied'),
    });
  };

  const handleSave = () => {
    const title = generateTitleFromData('tablet', data);
    saveDescription('tablet', title, generateDescription(), data);
    toast({
      title: t('messages.saved_success'),
      description: t('messages.description_saved'),
    });
  };

  const handleRegenerate = () => {
    if (onNewDescription) {
      onNewDescription();
    } else {
      onBack();
    }
  };

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface-hover -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">📱 {t('tablet.title')}</h2>
          <p className="text-muted-foreground text-sm">{t('messages.auto_generated')}</p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <pre className="whitespace-pre-wrap text-card-foreground font-sans text-sm leading-relaxed">
          {generateDescription()}
        </pre>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {t('actions.save_description')}
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          {t('actions.copy_text')}
        </Button>
        
        <Button onClick={handleRegenerate} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('actions.new_description')}
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          {t('messages.auto_generated')}
        </p>
      </div>
    </div>
  );
};

export default TabletDescriptionPage;