import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
    description += "📋 المعلومات الأساسية:\n";
    if (data.color) description += `🎨 اللون: ${data.color}\n`;
    if (data.condition) description += `✨ الحالة: ${data.condition}\n`;
    if (data.usageDuration) description += `⏱️ مدة الاستخدام: ${data.usageDuration}\n`;
    description += "\n";

    // التفاصيل التقنية
    description += "🔧 التفاصيل التقنية:\n";
    if (data.storage) description += `💾 مساحة التخزين: ${data.storage}\n`;
    if (data.ram) description += `🧠 الذاكرة العشوائية: ${data.ram}\n`;
    if (data.screenType) description += `📐 نوع الشاشة: ${data.screenType}\n`;
    if (data.operatingSystem) description += `💻 نظام التشغيل: ${data.operatingSystem}\n`;
    if (data.batteryCapacity) description += `🔋 سعة البطارية: ${data.batteryCapacity}\n`;
    if (data.batteryLifeNormal) description += `🔋 عمر البطارية (استخدام عادي): ${data.batteryLifeNormal}\n`;
    if (data.batteryLifeGaming) description += `🎮 عمر البطارية (في الألعاب): ${data.batteryLifeGaming}\n`;
    if (data.batteryPercentageIphone) description += `🍎 نسبة البطارية (آيفون): ${data.batteryPercentageIphone}%\n`;
    if (data.fingerprintWorking) description += `👆 البصمة: ${data.fingerprintWorking}\n`;
    if (data.waterResistant) description += `💧 مقاوم للماء: ${data.waterResistant}\n`;
    if (data.networkStatus) description += `📶 حالة الشبكة: ${data.networkStatus}\n`;
    description += "\n";

    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += "🛠️ التعديلات:\n";
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }

    // الملحقات
    description += "📦 الملحقات:\n";
    if (data.originalBox) description += `📦 العلبة الأصلية: ${data.originalBox}\n`;
    if (data.originalCharger) description += `🔌 الشاحن الأصلي: ${data.originalCharger}\n`;
    
    if (data.additionalAccessories && data.additionalAccessories.length > 0) {
      description += "ملحقات إضافية:\n";
      data.additionalAccessories.forEach((accessory: string) => {
        description += `• ${accessory}\n`;
      });
    }
    description += "\n";

    // معلومات البائع
    description += "👤 معلومات البائع:\n";
    if (data.city) description += `📍 المدينة: ${data.city}\n`;
    if (data.sellerType) description += `👥 نوع البائع: ${data.sellerType}\n`;
    if (data.deliveryMethod) description += `🚚 طريقة التسليم: ${data.deliveryMethod}\n`;
    if (data.contactMethod) description += `📞 طريقة التواصل: ${data.contactMethod}\n`;
    if (data.warranty) description += `🛡️ الضمان: ${data.warranty}\n`;
    if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ مدة الضمان: ${data.warrantyDuration}\n`;
    if (data.acceptExchange) description += `🔄 يقبل التبديل: ${data.acceptExchange}\n`;
    description += "\n";

    // السعر
    if (data.price) {
      description += `💰 السعر المطلوب: ${data.price}`;
      if (data.negotiable) description += ` (${data.negotiable === "نعم" ? "قابل للتفاوض" : "غير قابل للتفاوض"})`;
      description += "\n";
    }

    // سبب البيع
    if (data.sellReason) description += `💭 سبب البيع: ${data.sellReason}\n`;
    if (data.inspectionTimes) description += `🕒 أوقات المعاينة: ${data.inspectionTimes}\n`;
    description += "\n";

    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += "🚫 يُرجى من الفئات التالية عدم التواصل:\n";
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `📝 ملاحظات إضافية:\n${data.additionalNotes}\n\n`;
    }

    description += "للتواصل والاستفسار، يُرجى الاتصال أو إرسال رسالة واتساب.\n";
    description += "شكراً لاهتمامكم! 🙏";

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