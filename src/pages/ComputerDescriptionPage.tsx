import { useState } from "react";
import { ChevronRight, Copy, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { saveItem } from "@/utils/saveSystem";
import { yn, opt, cond } from "@/utils/i18nHelpers";

interface ComputerDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const ComputerDescriptionPage = ({ data, onBack, onNewDescription }: ComputerDescriptionPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescription = () => {
    const parts = [];
    
    // Title
    const computerType = opt(data.type, t);
    const brand = data.brand || '';
    const model = data.model || '';
    parts.push(`${t('common.computer_for_sale')} - ${computerType} ${brand} ${model}`.trim());
    
    parts.push(''); // Empty line
    
    // Basic Information
    if (data.condition) {
      parts.push(`${t('computer.condition')}: ${cond(data.condition, t)}`);
    }
    if (data.price) {
      parts.push(`${t('computer.price')}: ${data.price}`);
    }
    if (data.city) {
      parts.push(`${t('computer.city')}: ${data.city}`);
    }
    
    parts.push(''); // Empty line
    
    // Technical Specifications
    parts.push(`📋 ${t('computer.specifications')}:`);
    if (data.processorBrand && data.processorModel) {
      parts.push(`• ${t('computer.processor')}: ${data.processorBrand} ${data.processorModel}`);
    } else if (data.processorBrand) {
      parts.push(`• ${t('computer.processor')}: ${data.processorBrand}`);
    }
    if (data.ram) {
      parts.push(`• ${t('computer.ram')}: ${data.ram.replace('gb', ' GB')}`);
    }
    if (data.storageType && data.storageCapacity) {
      parts.push(`• ${t('computer.storage')}: ${data.storageType.toUpperCase()} ${data.storageCapacity.replace(/gb|tb/, m => m.toUpperCase())}`);
    }
    if (data.graphicsType === 'dedicated' && data.graphicsModel) {
      parts.push(`• ${t('computer.graphics_card')}: ${data.graphicsModel}`);
    } else if (data.graphicsType) {
      parts.push(`• ${t('computer.graphics_card')}: ${opt(data.graphicsType, t)}`);
    }
    if (data.operatingSystem) {
      parts.push(`• ${t('computer.operating_system')}: ${opt(data.operatingSystem, t)}`);
    }
    if (data.screenSize) {
      parts.push(`• ${t('computer.screen_size')}: ${data.screenSize}`);
    }
    if (data.screenResolution) {
      parts.push(`• ${t('computer.screen_resolution')}: ${opt(data.screenResolution, t)}`);
    }
    
    parts.push(''); // Empty line
    
    // Usage Information
    if (data.usagePurpose || data.usageHours || data.gamingPerformance) {
      parts.push(`💻 ${t('computer.usage_info')}:`);
      if (data.usagePurpose) {
        parts.push(`• ${t('computer.usage_purpose')}: ${opt(data.usagePurpose, t)}`);
      }
      if (data.usageHours) {
        parts.push(`• ${t('computer.usage_hours')}: ${opt(data.usageHours, t)}`);
      }
      if (data.gamingPerformance && data.gamingPerformance !== 'not-tested') {
        parts.push(`• ${t('computer.gaming_performance')}: ${opt(data.gamingPerformance, t)}`);
      }
      parts.push(''); // Empty line
    }
    
    // Purchase Information
    if (data.purchaseDate || data.warranty) {
      parts.push(`📅 ${t('computer.purchase_info')}:`);
      if (data.purchaseDate) {
        parts.push(`• ${t('computer.purchase_date')}: ${data.purchaseDate}`);
      }
      if (data.warranty) {
        parts.push(`• ${t('computer.warranty')}: ${opt(data.warranty, t)}`);
      }
      parts.push(''); // Empty line
    }
    
    // Software and Accessories
    if (data.softwareIncluded || data.includedAccessories?.length > 0 || data.otherAccessories) {
      parts.push(`📦 ${t('computer.accessories')}:`);
      if (data.softwareIncluded) {
        parts.push(`• ${t('computer.software_included')}: ${data.softwareIncluded}`);
      }
      if (data.includedAccessories?.length > 0) {
        const accessories = data.includedAccessories.map((acc: string) => t(`computer.${acc}`)).join(', ');
        parts.push(`• ${t('computer.included_accessories')}: ${accessories}`);
      }
      if (data.otherAccessories) {
        parts.push(`• ${t('computer.other_accessories')}: ${data.otherAccessories}`);
      }
      parts.push(''); // Empty line
    }
    
    // Selling Information
    if (data.sellingReason) {
      parts.push(`💬 ${t('computer.selling_reason')}: ${data.sellingReason}`);
      parts.push(''); // Empty line
    }
    
    // Contact and Delivery
    parts.push(`📍 ${t('computer.location')}: ${data.location || data.city || t('form.contact_for_details')}`);
    if (data.delivery) {
      parts.push(`🚚 ${t('computer.delivery')}: ${opt(data.delivery, t)}`);
    }
    if (data.negotiable) {
      parts.push(`💰 ${t('computer.negotiable')}: ${yn(data.negotiable, t)}`);
    }
    
    parts.push(''); // Empty line
    parts.push(t('common.contact_info'));
    parts.push(t('common.thank_you'));
    
    return parts.filter(part => part !== undefined && part !== null).join('\n');
  };

  const [description] = useState(() => generateDescription());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      toast({
        title: t('common.copied_success'),
        description: t('common.copied_description'),
      });
    } catch (err) {
      toast({
        title: t('common.copy_failed'),
        description: t('common.copy_failed_description'),
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    const item = {
      id: Date.now().toString(),
      type: 'computer' as const,
      title: `${opt(data.type, t)} ${data.brand} ${data.model}`.trim() || t('categories.computer'),
      description
    };

    saveItem(item);
    toast({
      title: t('common.saved_success'),
      description: t('common.saved_description'),
    });
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
      onNewDescription();
    }, 1000);
  };

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💻</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('computer.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('common.generated_description')}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
          {description}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button 
          onClick={handleSave}
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {t('common.save')}
        </Button>
        
        <Button 
          onClick={handleCopy}
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {t('common.copy')}
        </Button>
        
        <Button 
          onClick={handleRegenerate}
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          disabled={isGenerating}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {t('common.regenerate')}
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          {t('common.description_note')}
        </p>
      </div>
    </div>
  );
};

export default ComputerDescriptionPage;