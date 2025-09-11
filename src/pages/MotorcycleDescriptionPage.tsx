import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond, isYes } from "@/utils/i18nHelpers";

interface MotorcycleDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const MotorcycleDescriptionPage = ({ data, onBack, onNewDescription }: MotorcycleDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `🏍️ ${t('description.motorcycle_for_sale')}\n\n`;
    
    // معلومات أساسية
    if (data.type) {
      description += `🏷️ ${t('motorcycle.type')}: ${opt('motorcycle_type_' + data.type.toLowerCase(), t)}\n`;
    }
    if (data.brand) {
      const brandName = data.brand === "other" ? data.customBrand : data.brand;
      if (brandName) {
        description += `🏭 ${t('form.brand')}: ${brandName}\n`;
      }
    }
    if (data.model) {
      description += `📝 ${t('form.model')}: ${data.model}\n`;
    }
    if (data.year) {
      description += `📅 ${t('form.year')}: ${data.year}\n`;
    }
    
    description += "\n";
    
    // المواصفات التقنية
    description += `⚙️ ${t('description.technical_specs')}:\n`;
    if (data.engineCapacity) {
      description += `• ${t('motorcycle.engine_capacity')}: ${data.engineCapacity}\n`;
    }
    if (data.engineType) {
      description += `• ${t('motorcycle.engine_type')}: ${opt('engine_type_' + data.engineType.replace('-', '_'), t)}\n`;
    }
    if (data.transmission) {
      description += `• ${t('motorcycle.transmission')}: ${opt('transmission_' + data.transmission, t)}\n`;
    }
    if (data.fuelType) {
      description += `• ${t('motorcycle.fuel_type')}: ${opt('fuel_type_' + data.fuelType, t)}\n`;
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
    
    // الأداء والاستهلاك
    if (data.maxSpeed || data.fuelConsumption || data.fuelTankCapacity) {
      description += `🚀 ${t('motorcycle.performance')}:\n`;
      if (data.maxSpeed) {
        description += `• ${t('motorcycle.max_speed')}: ${data.maxSpeed} ${t('motorcycle.kmh')}\n`;
      }
      if (data.fuelConsumption) {
        description += `• ${t('motorcycle.fuel_consumption')}: ${data.fuelConsumption} ${t('motorcycle.km_per_liter')}\n`;
      }
      if (data.fuelTankCapacity) {
        description += `• ${t('motorcycle.fuel_tank_capacity')}: ${data.fuelTankCapacity} ${t('motorcycle.liter')}\n`;
      }
      description += "\n";
    }
    
    // معلومات إضافية
    if (data.mileage) {
      description += `🛣️ ${t('motorcycle.mileage')}: ${data.mileage} ${t('motorcycle.km')}\n`;
    }
    if (data.color) {
      description += `🎨 ${t('form.color')}: ${data.color}\n`;
    }
    
    // الحالة والسعر
    if (data.condition) {
      description += `✅ ${t('description.condition')}: ${cond(data.condition, t)}\n`;
    }
    
    // معلومات البائع
    if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
      description += "\n👤 " + t('common.seller_info') + ":\n";
      if (data.city) description += `📍 ${t('form.city')}: ${data.city}\n`;
      if (data.sellerType) description += `👥 ${t('form.seller_type')}: ${opt(data.sellerType, t)}\n`;
      if (data.deliveryMethod) description += `🚚 ${t('form.delivery_method')}: ${opt(data.deliveryMethod, t)}\n`;
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
    const title = generateTitleFromData('motorcycle', data);
    saveDescription('motorcycle', title, generateDescription(), data);
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
          <h2 className="text-2xl font-bold text-foreground">🏍️ {t('description.motorcycle_description')}</h2>
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

export default MotorcycleDescriptionPage;