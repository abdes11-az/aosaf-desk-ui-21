import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface RealEstateDescriptionPageProps {
  realEstateData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const RealEstateDescriptionPage = ({ realEstateData, onBack, onNewDescription }: RealEstateDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const generateRealEstateDescription = (data: any) => {
    let description = "";

    // العنوان الرئيسي
    if (data.propertyType) {
      description += `🏠 ${data.propertyType}`;
      if (data.district && data.city) {
        description += ` فـ ${data.district}, ${data.city}`;
      }
      description += "\n\n";
    }

    // المعلومات الأساسية
    description += "📋 المعلومات الأساسية:\n";
    if (data.city) description += `📍 المدينة: ${data.city}\n`;
    if (data.district) description += `🏘️ الحي: ${data.district}\n`;
    if (data.area) description += `📐 المساحة: ${data.area}\n`;
    if (data.floors) description += `🏢 عدد الطوابق: ${data.floors}\n`;
    if (data.currentFloor) description += `📍 الطابق لي عليه: ${data.currentFloor}\n`;
    if (data.clientType) description += `👤 نوع العميل: ${data.clientType}\n`;
    description += "\n";

    // تفاصيل الغرف
    description += "🛏️ البيوت:\n";
    if (data.bedrooms) description += `🛏️ بيوت النعاس: ${data.bedrooms}\n`;
    if (data.livingRooms) description += `🛋️ الصالونات: ${data.livingRooms}\n`;
    if (data.bathrooms) description += `🚿 الحمامات: ${data.bathrooms}\n`;
    if (data.kitchens) description += `🍳 الكوزينات: ${data.kitchens}\n`;
    if (data.hasBalcony) description += `🌅 البلكون: ${data.hasBalcony}\n`;
    if (data.hasRoof) description += `🏠 السطح: ${data.hasRoof}\n`;
    description += "\n";

    // التشطيبات
    if (data.flooring || data.wallFinish || data.kitchenFinish || data.bathroomFinish || data.doors || data.windows) {
      description += "✨ التشطيبات:\n";
      if (data.flooring) description += `🏠 الرضية: ${data.flooring}\n`;
      if (data.wallFinish) description += `🧱 الحيطان: ${data.wallFinish}\n`;
      if (data.kitchenFinish) description += `🍳 الكوزينة: ${data.kitchenFinish}\n`;
      if (data.bathroomFinish) description += `🚿 دورات الما: ${data.bathroomFinish}\n`;
      if (data.doors) description += `🚪 البيبان: ${data.doors}\n`;
      if (data.windows) description += `🪟 الشراجم: ${data.windows}\n`;
      if (data.airConditioning) description += `❄️ التبريد: ${data.airConditioning}\n`;
      description += "\n";
    }

    // المرافق
    if (data.hasElevator || data.hasParking || data.isFurnished || (data.nearbyServices && data.nearbyServices.length > 0)) {
      description += "🏢 المرافق والخدمات:\n";
      if (data.hasElevator) description += `🛗 الاسونسور: ${data.hasElevator}\n`;
      if (data.hasParking) description += `🚗 البلاصات ديال الطونوبيل: ${data.hasParking}\n`;
      if (data.isFurnished) description += `🪑 مفروش: ${data.isFurnished}\n`;
      
      if (data.nearbyServices && data.nearbyServices.length > 0) {
        description += "الخدمات لي قريبة:\n";
        data.nearbyServices.forEach((service: string) => {
          description += `• ${service}\n`;
        });
      }
      description += "\n";
    }
    
    // فكرة عن الجيران والمكان
    if (data.neighborhoodType || data.neighborsType || data.noiseLevel || data.safetyLevel) {
      description += "🏘️ فكرة على الجيران والبلاصة:\n";
      if (data.neighborhoodType) description += `🏠 نوع الحي: ${data.neighborhoodType}\n`;
      if (data.neighborsType) description += `👨‍👩‍👦 شنو كيبانو الجيران: ${data.neighborsType}\n`;
      if (data.noiseLevel) description += `🔊 مستوى الهدوء: ${data.noiseLevel}\n`;
      if (data.safetyLevel) description += `🛡️ الأمان فالمنطقة: ${data.safetyLevel}\n`;
      description += "\n";
    }
    
    // السعر والتعامل
    if (data.price || data.isNegotiable || data.readyToMove || data.contactMethod) {
      description += "💰 الثمن والتواصل:\n";
      if (data.price) description += `💰 الثمن: ${data.price}`;
      if (data.isNegotiable) description += ` - ${data.isNegotiable === "نعم" ? "فيه متنقص" : "ماشي قابل للتفاوض"}`;
      if (data.price) description += "\n";
      if (data.readyToMove) description += `🗝️ جاهز للانتقال: ${data.readyToMove}\n`;
      if (data.contactMethod) description += `📞 كيفاش نتواصلو: ${data.contactMethod}\n`;
      description += "\n";
    }
    
    // أوقات المعاينة
    if (data.inspectionTimes) {
      description += `⏰ أوقات المعاينة: ${data.inspectionTimes}\n\n`;
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `📝 علاش باغي نبيع: ${data.sellReason}\n\n`;
    }
    
    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += "🚫 العملاء لي ماباغيش نتعامل معاهم:\n";
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `📝 ملاحظات زايدة:\n${data.additionalNotes}\n\n`;
    }

    description += "للتواصل والاستفسار، عافاك اتصل ولا صيفط رسالة واتساب.\n";
    description += "شكراً على الاهتمام! 🙏";

    return description;
  };

  const generatedDescription = generateRealEstateDescription(realEstateData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: "تم النسخ بنجاح",
        description: "تم نسخ الوصف إلى الحافظة",
      });
    } catch (err) {
      console.error("فشل في نسخ النص:", err);
      toast({
        variant: "destructive",
        title: "خطأ في النسخ",
        description: "فشل في نسخ النص إلى الحافظة",
      });
    }
  };

  const handleSave = () => {
    try {
      const title = generateTitleFromData('real-estate', realEstateData);
      saveDescription('real-estate', title, generatedDescription, realEstateData);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ الوصف في قائمة المحفوظات",
      });
    } catch (err) {
      console.error("فشل في حفظ الوصف:", err);
      toast({
        variant: "destructive",
        title: "خطأ في الحفظ",
        description: "فشل في حفظ الوصف",
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
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">وصف العقار</h2>
            <p className="text-muted-foreground text-sm">وصف شامل لعقارك</p>
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
          حفظ الوصف
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 ml-2" />
          نسخ النص
        </Button>
        
        <Button onClick={onNewDescription} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 ml-2" />
          تعديل المعلومات
        </Button>
      </div>
      
      <div className="mt-8 bg-accent rounded-lg p-4">
        <p className="text-xs text-muted-foreground text-center">
          تم إنشاء هذا الوصف بناءً على المعلومات المُدخلة • يمكنك تعديل أي تفاصيل حسب الحاجة
        </p>
      </div>
    </div>
  );
};

export default RealEstateDescriptionPage;