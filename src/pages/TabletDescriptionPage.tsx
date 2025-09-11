import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond, isYes } from "@/utils/i18nHelpers";

interface TabletDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const TabletDescriptionPage = ({ data, onBack, onNewDescription }: TabletDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `📱 ${t('description.tablet_for_sale')}\n\n`;
    
    // معلومات أساسية
    if (data.brand) {
      description += `🏷️ ${t('form.brand')}: ${data.brand}\n`;
    }
    if (data.model) {
      description += `📱 ${t('form.model')}: ${data.model}\n`;
    }
    if (data.screenSize) {
      description += `📏 ${t('tablet.screen_size')}: ${data.screenSize}\n`;
    }
    if (data.screenType) {
      description += `🖥️ ${t('tablet.screen_type')}: ${data.screenType}\n`;
    }
    
    description += "\n";
    
    // المواصفات التقنية
    if (data.processor || data.ram || data.storage) {
      description += `⚙️ ${t('description.technical_specs')}:\n`;
      if (data.processor) {
        description += `• ${t('tablet.processor')}: ${data.processor}\n`;
      }
      if (data.ram) {
        description += `• ${t('tablet.ram')}: ${data.ram}\n`;
      }
      if (data.storage) {
        description += `• ${t('tablet.storage')}: ${data.storage}\n`;
      }
      description += "\n";
    }
    
    // معلومات إضافية
    if (data.battery) {
      description += `🔋 ${t('tablet.battery')}: ${data.battery} mAh\n`;
    }
    if (data.operatingSystem) {
      description += `💻 ${t('tablet.operating_system')}: ${data.operatingSystem}\n`;
    }
    if (data.connectivity) {
      description += `📶 ${t('tablet.connectivity')}: ${data.connectivity}\n`;
    }
    
    description += "\n";
    
    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += `🛠️ ${t('description.modifications')}:\n`;
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }
    
    // الملحقات
    if (data.accessories && data.accessories.length > 0) {
      description += `📦 ${t('description.accessories')}:\n`;
      data.accessories.forEach((accessory: string) => {
        description += `• ${accessory}\n`;
      });
      description += "\n";
    }
    
    // الكاميرات
    if (data.frontCamera || data.rearCamera) {
      description += `📸 ${t('tablet.cameras')}:\n`;
      if (data.frontCamera) {
        description += `• ${t('tablet.front_camera')}: ${data.frontCamera}\n`;
      }
      if (data.rearCamera) {
        description += `• ${t('tablet.rear_camera')}: ${data.rearCamera}\n`;
      }
      description += "\n";
    }
    
    // الألوان
    if (data.colors && data.colors.length > 0) {
      description += `🎨 ${t('description.available_colors')}: ${data.colors.join(", ")}\n\n`;
    }
    
    // الحالة والسعر
    if (data.condition) {
      description += `✅ ${t('description.condition')}: ${cond(data.condition, t)}\n`;
    }
    
    // معلومات البائع
    if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
      description += "\n👤 " + t('description.seller_info') + ":\n";
      if (data.city) description += `📍 ${t('description.city')}: ${data.city}\n`;
      if (data.sellerType) description += `👥 ${t('description.seller_type')}: ${opt(data.sellerType, t)}\n`;
      if (data.deliveryMethod) description += `🚚 ${t('description.delivery_method')}: ${opt(data.deliveryMethod, t)}\n`;
      if (data.negotiable) description += `💰 ${t('form.negotiable')}: ${yn(data.negotiable, t)}\n`;
      if (data.contactMethod) description += `📞 ${t('description.contact_method')}: ${data.contactMethod}\n`;
      if (data.warranty) description += `🛡️ ${t('description.warranty')}: ${opt(data.warranty, t)}\n`;
      if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ ${t('description.warranty_duration')}: ${data.warrantyDuration}\n`;
      if (data.acceptExchange) description += `🔄 ${t('description.accept_exchange')}: ${yn(data.acceptExchange, t)}\n`;
      description += "\n";
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `💭 ${t('description.sell_reason')}: ${data.sellReason}\n\n`;
    }
    
    // وصف إضافي
    if (data.description) {
      description += `📝 ${t('description.additional_details')}:\n${data.description}\n\n`;
    }
    
    // العملاء غير المرغوب فيهم
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += `🚫 ${t('description.unwanted_customers')}:\n`;
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }
    
    description += `📞 ${t('description.contact_info')}`;
    
    return description;
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
          <h2 className="text-2xl font-bold text-foreground">📱 {t('description.tablet_description')}</h2>
          <p className="text-muted-foreground text-sm">{t('description.generated_description')}</p>
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
          {t('actions.save')}
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          {t('actions.copy')}
        </Button>
        
        <Button onClick={handleRegenerate} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('actions.regenerate')}
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          {t('description.auto_generated_note')}
        </p>
      </div>
    </div>
  );
};

export default TabletDescriptionPage;