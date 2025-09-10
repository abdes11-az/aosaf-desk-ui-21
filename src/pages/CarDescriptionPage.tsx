import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, cond, isYes } from "@/utils/i18nHelpers";

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
    if (data.city) description += `📍 ${t('form.city')}: ${data.city}\n`;
    if (data.carType) description += `🚙 ${t('car.car_type')}: ${data.carType}\n`;
    if (data.fuelType) description += `⛽ ${t('car.fuel_type')}: ${data.fuelType}\n`;
    if (data.enginePower) description += `💪 ${t('car.engine_power')}: ${data.enginePower}\n`;
    if (data.transmission) description += `⚙️ ${t('car.transmission')}: ${data.transmission}\n`;
    if (data.fuelConsumption) description += `📊 ${t('car.fuel_consumption')}: ${data.fuelConsumption}\n`;
    if (data.doors) description += `🚪 ${t('car.doors')}: ${data.doors}\n`;
    description += "\n";

    // تفاصيل الاستخدام
    description += `📅 ${t('car.usage_details')}:\n`;
    if (data.kilometers) description += `🛣️ ${t('car.kilometers')}: ${data.kilometers}\n`;
    if (data.color) description += `🎨 ${t('form.color')}: ${data.color}\n`;
    if (data.firstUse) description += `📆 ${t('car.first_use')}: ${yn(data.firstUse, t)}\n`;
    if (data.allServicesAvailable) description += `🔧 ${t('car.all_services')}: ${yn(data.allServicesAvailable, t)}\n`;
    if (data.firstUseInCountry) description += `🌍 ${t('car.first_use_country')}: ${data.firstUseInCountry}\n`;
    if (data.hadAccident) description += `🚨 ${t('car.had_accident')}: ${yn(data.hadAccident, t)}\n`;
    if (data.originalPaint) description += `🎯 ${t('car.original_paint')}: ${data.originalPaint}\n`;
    if (data.condition) description += `✨ ${t('form.condition')}: ${cond(data.condition, t)}\n`;
    description += "\n";

    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += `🛠️ ${t('car.modifications')}:\n`;
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }

    // التفاصيل التقنية
    description += `⚙️ ${t('car.technical_details')}:\n`;
    if (data.engineType) description += `🏭 ${t('car.engine_type')}: ${data.engineType}\n`;
    if (data.steering) description += `🎯 ${t('car.steering')}: ${data.steering}\n`;
    if (data.airbags) description += `🛡️ ${t('car.airbags')}: ${data.airbags}\n`;
    if (data.airConditioning) description += `❄️ ${t('car.air_conditioning')}: ${data.airConditioning}\n`;
    description += "\n";

    // حالة السيارة
    description += `🔍 ${t('car.condition_section')}:\n`;
    if (data.wheelType) description += `🛞 ${t('car.wheel_type')}: ${data.wheelType}\n`;
    if (data.glass) description += `🪟 ${t('car.glass')}: ${data.glass}\n`;
    if (data.interior) description += `🪑 ${t('car.interior')}: ${data.interior}\n`;
    if (data.speakers) description += `🔊 ${t('car.speakers')}: ${data.speakers}\n`;
    description += "\n";

    // التجهيزات الإضافية
    if (data.additionalEquipment && data.additionalEquipment.length > 0) {
      description += `✨ ${t('car.additional_equipment')}:\n`;
      data.additionalEquipment.forEach((equipment: string) => {
        description += `• ${equipment}\n`;
      });
      description += "\n";
    }

    // معلومات المالك
    description += `👤 ${t('car.owner_info')}:\n`;
    if (data.ownerType) description += `👥 ${t('car.owner_type')}: ${data.ownerType}\n`;
    if (data.usageDuration) description += `⏱️ ${t('car.usage_duration')}: ${data.usageDuration}\n`;
    if (data.ownership) description += `📜 ${t('car.ownership')}: ${data.ownership}\n`;
    if (data.documentsReady) description += `📋 ${t('car.documents_ready')}: ${data.documentsReady}\n`;
    if (data.taxAmount) description += `💳 ${t('car.tax_amount')}: ${data.taxAmount}\n`;
    if (data.insuranceAmount) description += `🛡️ ${t('car.insurance_amount')}: ${data.insuranceAmount}\n`;
    description += "\n";

    // السعر وسبب البيع
    if (data.price) {
      description += `💰 ${t('description.price')}: ${data.price}`;
      if (data.negotiable) description += ` (${isYes(data.negotiable) ? t('description.negotiable') : t('description.not_negotiable')})`;
      description += "\n";
    }
    if (data.sellReason) description += `💭 ${t('description.sell_reason')}: ${data.sellReason}\n`;
    if (data.inspectionTimes) description += `🕒 ${t('car.inspection_times')}: ${data.inspectionTimes}\n`;
    description += "\n";

    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += `🚫 ${t('description.unwanted_customers')}:\n`;
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `📝 ${t('description.additional_notes')}:\n${data.additionalNotes}\n\n`;
    }

    description += `${t('description.contact_info')}\n`;
    description += t('description.thank_you');

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