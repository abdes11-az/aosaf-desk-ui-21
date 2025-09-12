import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond, isYes } from "@/utils/i18nHelpers";

interface BicycleDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const BicycleDescriptionPage = ({ data, onBack, onNewDescription }: BicycleDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `🚲 ${t('bicycle.title')}\n\n`;
    
    // معلومات أساسية
    if (data.type) {
      description += `🏷️ ${t('bicycle.type')}: ${opt(data.type, t)}\n`;
    }
    if (data.brand) {
      const brandName = data.brand === "other" ? data.customBrand : data.brand;
      if (brandName) {
        description += `🏭 ${t('bicycle.brand')}: ${brandName}\n`;
      }
    }
    if (data.model) {
      description += `📝 ${t('bicycle.model')}: ${data.model}\n`;
    }
    
    description += "\n";
    
    // المواصفات التقنية
    description += `⚙️ ${t('bicycle.specifications')}:\n`;
    if (data.frameSize) {
      description += `• ${t('bicycle.frame_size')}: ${data.frameSize}\n`;
    }
    if (data.material) {
      description += `• ${t('bicycle.frame_material')}: ${opt(data.material, t)}\n`;
    }
    if (data.gearSystem) {
      description += `• ${t('bicycle.gear_system')}: ${data.gearSystem} ${t('bicycle.speed')}\n`;
    }
    if (data.brakeType) {
      description += `• ${t('bicycle.brake_type')}: ${opt(data.brakeType, t)}\n`;
    }
    if (data.wheelSize) {
      description += `• ${t('bicycle.wheel_size')}: ${data.wheelSize}\n`;
    }
    if (data.weight) {
      description += `• ${t('bicycle.weight')}: ${data.weight} ${t('bicycle.kg')}\n`;
    }
    
    description += "\n";
    
    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += `🛠️ ${t('bicycle.modifications')}:\n`;
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }
    
    // الملحقات
    if (data.accessories && data.accessories.length > 0) {
      description += `📦 ${t('bicycle.accessories')}:\n`;
      data.accessories.forEach((accessory: string) => {
        description += `• ${accessory}\n`;
      });
      description += "\n";
    }
    
    // معلومات إضافية
    if (data.color) {
      description += `🎨 ${t('bicycle.color')}: ${data.color}\n`;
    }
    
    // الحالة والسعر
    if (data.condition) {
      description += `✅ ${t('description.condition')}: ${cond(data.condition, t)}\n`;
    }
    
    // معلومات البائع
    if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
      description += `\n👤 ${t('common.seller_info')}:\n`;
      if (data.city) description += `📍 ${t('common.city')}: ${data.city}\n`;
      if (data.sellerType) description += `👥 ${t('common.seller_type')}: ${opt(data.sellerType, t)}\n`;
      if (data.deliveryMethod) description += `🚚 ${t('common.delivery_method')}: ${opt(data.deliveryMethod, t)}\n`;
      if (data.negotiable) description += `💰 ${t('common.negotiable')}: ${yn(data.negotiable, t)}\n`;
      if (data.contactMethod) description += `📞 ${t('common.contact_method')}: ${opt(data.contactMethod, t)}\n`;
      if (data.warranty) description += `🛡️ ${t('common.warranty')}: ${yn(data.warranty, t)}\n`;
      if (data.warranty && isYes(data.warranty) && data.warrantyDuration) description += `⏰ ${t('common.warranty_duration')}: ${data.warrantyDuration}\n`;
      if (data.acceptExchange) description += `🔄 ${t('common.accept_exchange')}: ${yn(data.acceptExchange, t)}\n`;
      description += "\n";
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `💭 ${t('common.sell_reason')}: ${data.sellReason}\n\n`;
    }
    
    // وصف إضافي
    if (data.description) {
      description += `📝 ${t('common.additional_notes')}:\n${data.description}\n\n`;
    }
    
    // العملاء غير المرغوب فيهم
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += `🚫 ${t('common.unwanted_customers')}:\n`;
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }
    
    description += t('common.contact_footer');
    
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
    const title = generateTitleFromData('bicycle', data);
    saveDescription('bicycle', title, generateDescription(), data);
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
          <h2 className="text-2xl font-bold text-foreground">🚲 وصف الدراجة</h2>
          <p className="text-muted-foreground text-sm">الوصف المُنشأ لدراجتك الهوائية</p>
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
          حفظ الوصف
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          نسخ الوصف
        </Button>
        
        <Button onClick={handleRegenerate} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          إعادة إنشاء
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          هذا الوصف تم إنشاؤه تلقائياً ويمكنك تعديله حسب حاجتك
        </p>
      </div>
    </div>
  );
};

export default BicycleDescriptionPage;