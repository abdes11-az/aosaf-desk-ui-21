import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond, isYes } from "@/utils/i18nHelpers";

interface PhoneDescriptionPageProps {
  phoneData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const PhoneDescriptionPage = ({ phoneData, onBack, onNewDescription }: PhoneDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const generatePhoneDescription = (data: any) => {
    let description = "";

    // العنوان الرئيسي
    if (data.phoneName) {
      description += `📱 ${data.phoneName}\n\n`;
    }

    // المعلومات الأساسية
    description += `📋 ${t('description.basic_info')}:\n`;
    if (data.color) description += `🎨 ${t('description.color')}: ${data.color}\n`;
    if (data.condition) description += `✨ ${t('description.condition')}: ${cond(data.condition, t)}\n`;
    if (data.usageDuration) description += `⏱️ ${t('description.usage_duration')}: ${data.usageDuration}\n`;
    description += "\n";

    // التفاصيل التقنية
    description += `🔧 ${t('description.technical_details')}:\n`;
    if (data.storage) description += `💾 ${t('description.storage')}: ${data.storage}\n`;
    if (data.ram) description += `🧠 ${t('description.ram')}: ${data.ram}\n`;
    if (data.screenType) description += `📐 ${t('description.screen_type')}: ${data.screenType}\n`;
    if (data.operatingSystem) description += `💻 ${t('description.operating_system')}: ${data.operatingSystem}\n`;
    if (data.batteryCapacity) description += `🔋 ${t('description.battery_capacity')}: ${data.batteryCapacity}\n`;
    if (data.batteryLifeNormal) description += `🔋 ${t('description.battery_life_normal')}: ${data.batteryLifeNormal}\n`;
    if (data.batteryLifeGaming) description += `🎮 ${t('description.battery_life_gaming')}: ${data.batteryLifeGaming}\n`;
    if (data.fingerprintWorking) description += `👆 ${t('description.fingerprint')}: ${yn(data.fingerprintWorking, t)}\n`;
    if (data.waterResistant) description += `💧 ${t('description.water_resistant')}: ${yn(data.waterResistant, t)}\n`;
    if (data.networkStatus) description += `📶 ${t('description.network_status')}: ${data.networkStatus}\n`;
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
    description += `📦 ${t('description.accessories')}:\n`;
    if (data.originalBox) description += `📦 ${t('description.original_box')}: ${opt(data.originalBox, t)}\n`;
    if (data.originalCharger) description += `🔌 ${t('description.original_charger')}: ${opt(data.originalCharger, t)}\n`;
    
    if (data.additionalAccessories && data.additionalAccessories.length > 0) {
      description += `${t('description.additional_accessories')}:\n`;
      data.additionalAccessories.forEach((accessory: string) => {
        description += `• ${accessory}\n`;
      });
    }
    description += "\n";

    // معلومات البائع
    description += `👤 ${t('description.seller_info')}:\n`;
    if (data.city) description += `📍 ${t('description.city')}: ${data.city}\n`;
    if (data.sellerType) description += `👥 ${t('description.seller_type')}: ${opt(data.sellerType, t)}\n`;
    if (data.deliveryMethod) description += `🚚 ${t('description.delivery_method')}: ${opt(data.deliveryMethod, t)}\n`;
    if (data.contactMethod) description += `📞 ${t('description.contact_method')}: ${data.contactMethod}\n`;
    if (data.warranty) description += `🛡️ ${t('description.warranty')}: ${opt(data.warranty, t)}\n`;
    if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ ${t('description.warranty_duration')}: ${data.warrantyDuration}\n`;
    if (data.acceptExchange) description += `🔄 ${t('description.accept_exchange')}: ${yn(data.acceptExchange, t)}\n`;
    description += "\n";

    // السعر
    if (data.price) {
      description += `💰 ${t('description.price')}: ${data.price}`;
      if (data.negotiable) description += ` (${isYes(data.negotiable) ? t('description.negotiable') : t('description.not_negotiable')})`;
      description += "\n";
    }

    // سبب البيع
    if (data.sellReason) description += `💭 ${t('description.sell_reason')}: ${data.sellReason}\n`;
    if (data.inspectionTimes) description += `🕒 ${t('description.inspection_times')}: ${data.inspectionTimes}\n`;
    description += "\n";

    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.trim()) {
      description += `🚫 ${t('description.unwanted_customers')}: ${data.unwantedCustomers}\n\n`;
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `📝 ${t('description.additional_notes')}:\n${data.additionalNotes}\n\n`;
    }

    description += `${t('description.contact_info')}\n`;
    description += t('description.thank_you');

    return description;
  };

  const generatedDescription = generatePhoneDescription(phoneData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: t('messages.copied_success'),
        description: t('messages.description_copied'),
      });
    } catch (err) {
      console.error("فشل في نسخ النص:", err);
      toast({
        variant: "destructive",
        title: t('messages.error'),
        description: t('messages.copy_error'),
      });
    }
  };

  const handleSave = () => {
    try {
      const title = generateTitleFromData('phone', phoneData);
      saveDescription('phone', title, generatedDescription, phoneData);
      toast({
        title: t('messages.saved_success'),
        description: t('messages.description_saved'),
      });
    } catch (err) {
      console.error("فشل في حفظ الوصف:", err);
      toast({
        variant: "destructive",
        title: t('messages.error'),
        description: t('messages.save_error'),
      });
    }
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
          <span className="text-2xl">📱</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('common.generated_description')}</h2>
            <p className="text-muted-foreground text-sm">{t('common.comprehensive_description')}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
          {generatedDescription}
        </div>
      </div>
      
      <div className="space-y-3">
        <Button onClick={handleSave} className="w-full bg-success hover:bg-success/90 text-success-foreground">
          <Star className="w-4 h-4 ml-2" />
          {t('actions.save_description')}
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 ml-2" />
          {t('actions.copy_text')}
        </Button>
        
        <Button onClick={onNewDescription} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 ml-2" />
          {t('actions.edit_info')}
        </Button>
      </div>
      
      <div className="mt-8 bg-accent rounded-lg p-4">
        <p className="text-xs text-muted-foreground text-center">
          {t('messages.auto_generated')}
        </p>
      </div>
    </div>
  );
};

export default PhoneDescriptionPage;