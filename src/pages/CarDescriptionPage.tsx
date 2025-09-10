import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface CarDescriptionPageProps {
  carData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const CarDescriptionPage = ({ carData, onBack, onNewDescription }: CarDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const generateComprehensiveDescription = (data: any) => {
    let description = "";

    // العنوان الرئيسي
    if (data.model && data.year) {
      description += `🚗 ${data.model} موديل ${data.year}\n\n`;
    }

    // المعلومات الأساسية
    description += `📋 ${t('description.basic_info')}:\n`;
    if (data.city) description += `📍 المدينة: ${data.city}\n`;
    if (data.carType) description += `🚙 نوع السيارة: ${data.carType}\n`;
    if (data.fuelType) description += `⛽ نوع الوقود: ${data.fuelType}\n`;
    if (data.enginePower) description += `💪 قوة المحرك: ${data.enginePower} حصان\n`;
    if (data.transmission) description += `⚙️ ناقل الحركة: ${data.transmission}\n`;
    if (data.fuelConsumption) description += `📊 استهلاك الوقود: ${data.fuelConsumption} لتر/100كم\n`;
    if (data.doors) description += `🚪 عدد الأبواب: ${data.doors}\n`;
    description += "\n";

    // تفاصيل الاستخدام
    description += "📅 تفاصيل الاستخدام:\n";
    if (data.kilometers) description += `🛣️ عدد الكيلومترات: ${data.kilometers} كم\n`;
    if (data.color) description += `🎨 اللون: ${data.color}\n`;
    if (data.firstUse) description += `📆 الاستخدام الأول للسيارة: ${data.firstUse}\n`;
    if (data.allServicesAvailable) description += `🔧 جميع الخدمات متوفرة: ${data.allServicesAvailable}\n`;
    if (data.firstUseInCountry) description += `🌍 أول استخدام في البلد: ${data.firstUseInCountry}\n`;
    if (data.hadAccident) description += `🚨 تعرضت لحادث: ${data.hadAccident}\n`;
    if (data.originalPaint) description += `🎯 الدهان: ${data.originalPaint}\n`;
    if (data.condition) description += `✨ حالة السيارة: ${data.condition}\n`;
    description += "\n";

    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += "🛠️ التعديلات:\n";
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }

    // التفاصيل التقنية
    description += "⚙️ التفاصيل التقنية:\n";
    if (data.engineType) description += `🏭 نوع المحرك: ${data.engineType}\n`;
    if (data.steering) description += `🎯 المقود: ${data.steering}\n`;
    if (data.airbags) description += `🛡️ الوسائد الهوائية: ${data.airbags}\n`;
    if (data.airConditioning) description += `❄️ التكييف: ${data.airConditioning}\n`;
    description += "\n";

    // حالة السيارة
    description += "🔍 حالة السيارة:\n";
    if (data.wheelType) description += `🛞 العجلات: ${data.wheelType}\n`;
    if (data.glass) description += `🪟 الزجاج: ${data.glass}\n`;
    if (data.interior) description += `🪑 الداخلية: ${data.interior}\n`;
    if (data.speakers) description += `🔊 السماعات: ${data.speakers}\n`;
    description += "\n";

    // التجهيزات الإضافية
    if (data.additionalEquipment && data.additionalEquipment.length > 0) {
      description += "✨ التجهيزات الإضافية:\n";
      data.additionalEquipment.forEach((equipment: string) => {
        description += `• ${equipment}\n`;
      });
      description += "\n";
    }

    // معلومات المالك
    description += "👤 معلومات المالك:\n";
    if (data.ownerType) description += `👥 نوع المالك: ${data.ownerType}\n`;
    if (data.usageDuration) description += `⏱️ مدة الاستخدام: ${data.usageDuration}\n`;
    if (data.ownership) description += `📜 الملكية: ${data.ownership}\n`;
    if (data.documentsReady) description += `📋 الأوراق جاهزة: ${data.documentsReady}\n`;
    if (data.taxAmount) description += `💳 مبلغ الضريبة: ${data.taxAmount}\n`;
    if (data.insuranceAmount) description += `🛡️ مبلغ التأمين: ${data.insuranceAmount}\n`;
    description += "\n";

    // السعر وسبب البيع
    if (data.price) {
      description += `💰 السعر: ${data.price}`;
      if (data.negotiable) description += ` (${data.negotiable === "نعم" ? "قابل للتفاوض" : "غير قابل للتفاوض"})`;
      description += "\n";
    }
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

  const generatedDescription = generateComprehensiveDescription(carData);

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
      const title = generateTitleFromData('car', carData);
      saveDescription('car', title, generatedDescription, carData);
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
          <span className="text-2xl">🚗</span>
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

export default CarDescriptionPage;