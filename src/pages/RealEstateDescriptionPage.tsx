import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { opt } from "@/utils/i18nHelpers";

interface RealEstateDescriptionPageProps {
  realEstateData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const RealEstateDescriptionPage = ({ realEstateData, onBack, onNewDescription }: RealEstateDescriptionPageProps) => {
  const { toast } = useToast();
  const { t, dialect } = useLanguage();
  
  const generateRealEstateDescription = (data: any) => {
    let description = "";

    // شكل الوصف حسب اللهجة
    const getDialectText = () => {
      if (dialect === 'moroccan') {
        return {
          mainTitle: (propertyType: string, district: string, city: string) => 
            `🏠 ${propertyType}${district && city ? ` فـ ${district}, ${city}` : ''}`,
          basicInfo: "📋 المعلومات الأساسية:",
          city: "📍 المدينة:",
          district: "🏘️ الحي:",
          area: "📐 المساحة:",
          floors: "🏢 عدد الطوابق:",
          currentFloor: "📍 الطابق لي عليه:",
          clientType: "👤 نوع الكليان لي بغيت:",
          roomsTitle: "🛏️ البيوت:",
          bedrooms: "🛏️ بيوت النعاس:",
          livingRooms: "🛋️ الصالونات:",
          bathrooms: "🚿 الحمامات:",
          kitchens: "🍳 الكوزينات:",
          balcony: "🌅 البلكون:",
          roof: "🏠 السطح:",
          finishTitle: "✨ التشطيبات:",
          flooring: "🏠 الرضية:",
          walls: "🧱 الحيطان:",
          kitchen: "🍳 الكوزينة:",
          bathroom: "🚿 دورات الما:",
          doors: "🚪 البيبان:",
          windows: "🪟 الشراجم:",
          airConditioning: "❄️ التبريد:",
          facilitiesTitle: "🏢 المرافق والخدمات:",
          elevator: "🛗 الاسونسور:",
          parking: "🚗 البلاصات ديال الطونوبيل:",
          furnished: "🪑 مفروش:",
          nearbyServices: "الخدمات لي قريبة:",
          neighborhoodTitle: "🏘️ فكرة على الجيران والبلاصة:",
          neighborhoodType: "🏠 نوع الحي:",
          neighborsType: "👨‍👩‍👦 شنو كيبانو الجيران:",
          noiseLevel: "🔊 مستوى الهدوء:",
          safetyLevel: "🛡️ الأمان فالمنطقة:",
          priceTitle: "💰 الثمن والتواصل:",
          price: "💰 الثمن:",
          negotiable: (neg: string) => neg === "نعم" ? "فيه متنقص" : "ماشي قابل للتفاوض",
          readyToMove: "🗝️ جاهز للانتقال:",
          contactMethod: "📞 كيفاش نتواصلو:",
          inspectionTimes: "⏰ أوقات المعاينة:",
          sellReason: "📝 علاش باغي نبيع:",
          unwantedCustomers: "🚫 العملاء لي ماباغيش نتعامل معاهم:",
          additionalNotes: "📝 ملاحظات زايدة:",
          contactFooter: "للتواصل والاستفسار، عافاك اتصل ولا صيفط رسالة واتساب.",
          thanks: "شكراً على الاهتمام! 🙏"
        };
      } else if (dialect === 'egyptian') {
        return {
          mainTitle: (propertyType: string, district: string, city: string) => 
            `🏠 ${propertyType}${district && city ? ` في ${district}, ${city}` : ''}`,
          basicInfo: "📋 المعلومات الأساسية:",
          city: "📍 المدينة:",
          district: "🏘️ المنطقة:",
          area: "📐 المساحة:",
          floors: "🏢 عدد الأدوار:",
          currentFloor: "📍 الدور الحالي:",
          clientType: "👤 نوع العميل:",
          roomsTitle: "🛏️ الغرف:",
          bedrooms: "🛏️ غرف النوم:",
          livingRooms: "🛋️ غرف المعيشة:",
          bathrooms: "🚿 الحمامات:",
          kitchens: "🍳 المطابخ:",
          balcony: "🌅 البلكونة:",
          roof: "🏠 السطح:",
          finishTitle: "✨ التشطيبات:",
          flooring: "🏠 الأرضيات:",
          walls: "🧱 الحوائط:",
          kitchen: "🍳 المطبخ:",
          bathroom: "🚿 الحمام:",
          doors: "🚪 الأبواب:",
          windows: "🪟 الشبابيك:",
          airConditioning: "❄️ التكييف:",
          facilitiesTitle: "🏢 المرافق والخدمات:",
          elevator: "🛗 الأسانسير:",
          parking: "🚗 موقف السيارات:",
          furnished: "🪑 مفروش:",
          nearbyServices: "الخدمات القريبة:",
          neighborhoodTitle: "🏘️ معلومات عن الحي:",
          neighborhoodType: "🏠 نوع الحي:",
          neighborsType: "👨‍👩‍👦 الجيران:",
          noiseLevel: "🔊 مستوى الهدوء:",
          safetyLevel: "🛡️ الأمان:",
          priceTitle: "💰 السعر والتواصل:",
          price: "💰 السعر:",
          negotiable: (neg: string) => neg === "نعم" ? "قابل للتفاوض" : "غير قابل للتفاوض",
          readyToMove: "🗝️ جاهز للانتقال:",
          contactMethod: "📞 طريقة التواصل:",
          inspectionTimes: "⏰ مواعيد المعاينة:",
          sellReason: "📝 سبب البيع:",
          unwantedCustomers: "🚫 العملاء غير المرغوبين:",
          additionalNotes: "📝 ملاحظات إضافية:",
          contactFooter: "للتواصل والاستفسار، برجاء الاتصال أو إرسال رسالة واتساب.",
          thanks: "شكراً للاهتمام! 🙏"
        };
      } else if (dialect === 'gulf') {
        return {
          mainTitle: (propertyType: string, district: string, city: string) => 
            `🏠 ${propertyType}${district && city ? ` في ${district}, ${city}` : ''}`,
          basicInfo: "📋 المعلومات الأساسية:",
          city: "📍 المدينة:",
          district: "🏘️ المنطقة:",
          area: "📐 المساحة:",
          floors: "🏢 عدد الأدوار:",
          currentFloor: "📍 الدور:",
          clientType: "👤 نوع العميل:",
          roomsTitle: "🛏️ الغرف:",
          bedrooms: "🛏️ غرف النوم:",
          livingRooms: "🛋️ الصالات:",
          bathrooms: "🚿 دورات المياه:",
          kitchens: "🍳 المطابخ:",
          balcony: "🌅 البلكونة:",
          roof: "🏠 السطح:",
          finishTitle: "✨ التشطيبات:",
          flooring: "🏠 الأرضيات:",
          walls: "🧱 الجدران:",
          kitchen: "🍳 المطبخ:",
          bathroom: "🚿 دورة المياه:",
          doors: "🚪 الأبواب:",
          windows: "🪟 النوافذ:",
          airConditioning: "❄️ التكييف:",
          facilitiesTitle: "🏢 المرافق والخدمات:",
          elevator: "🛗 المصعد:",
          parking: "🚗 موقف السيارات:",
          furnished: "🪑 مفروش:",
          nearbyServices: "الخدمات القريبة:",
          neighborhoodTitle: "🏘️ معلومات عن المنطقة:",
          neighborhoodType: "🏠 نوع المنطقة:",
          neighborsType: "👨‍👩‍👦 الجيران:",
          noiseLevel: "🔊 مستوى الهدوء:",
          safetyLevel: "🛡️ الأمان:",
          priceTitle: "💰 السعر والتواصل:",
          price: "💰 السعر:",
          negotiable: (neg: string) => neg === "نعم" ? "قابل للتفاوض" : "غير قابل للتفاوض",
          readyToMove: "🗝️ جاهز للانتقال:",
          contactMethod: "📞 طريقة التواصل:",
          inspectionTimes: "⏰ مواعيد المعاينة:",
          sellReason: "📝 سبب البيع:",
          unwantedCustomers: "🚫 العملاء غير المرغوبين:",
          additionalNotes: "📝 ملاحظات إضافية:",
          contactFooter: "للتواصل والاستفسار، يرجى الاتصال أو إرسال رسالة واتساب.",
          thanks: "شكراً للاهتمام! 🙏"
        };
      } else {
        // الفصحى (standard)
        return {
          mainTitle: (propertyType: string, district: string, city: string) => 
            `🏠 ${propertyType}${district && city ? ` في ${district}, ${city}` : ''}`,
          basicInfo: "📋 المعلومات الأساسية:",
          city: "📍 المدينة:",
          district: "🏘️ المنطقة:",
          area: "📐 المساحة:",
          floors: "🏢 عدد الطوابق:",
          currentFloor: "📍 الطابق الحالي:",
          clientType: "👤 نوع العميل:",
          roomsTitle: "🛏️ الغرف:",
          bedrooms: "🛏️ غرف النوم:",
          livingRooms: "🛋️ غرف المعيشة:",
          bathrooms: "🚿 الحمامات:",
          kitchens: "🍳 المطابخ:",
          balcony: "🌅 الشرفة:",
          roof: "🏠 السطح:",
          finishTitle: "✨ التشطيبات:",
          flooring: "🏠 الأرضيات:",
          walls: "🧱 الجدران:",
          kitchen: "🍳 المطبخ:",
          bathroom: "🚿 الحمام:",
          doors: "🚪 الأبواب:",
          windows: "🪟 النوافذ:",
          airConditioning: "❄️ التكييف:",
          facilitiesTitle: "🏢 المرافق والخدمات:",
          elevator: "🛗 المصعد:",
          parking: "🚗 موقف السيارات:",
          furnished: "🪑 مفروش:",
          nearbyServices: "الخدمات القريبة:",
          neighborhoodTitle: "🏘️ معلومات عن المنطقة:",
          neighborhoodType: "🏠 نوع المنطقة:",
          neighborsType: "👨‍👩‍👦 الجيران:",
          noiseLevel: "🔊 مستوى الهدوء:",
          safetyLevel: "🛡️ الأمان:",
          priceTitle: "💰 السعر والتواصل:",
          price: "💰 السعر:",
          negotiable: (neg: string) => neg === "نعم" ? "قابل للتفاوض" : "غير قابل للتفاوض",
          readyToMove: "🗝️ جاهز للانتقال:",
          contactMethod: "📞 طريقة التواصل:",
          inspectionTimes: "⏰ مواعيد المعاينة:",
          sellReason: "📝 سبب البيع:",
          unwantedCustomers: "🚫 العملاء غير المرغوبين:",
          additionalNotes: "📝 ملاحظات إضافية:",
          contactFooter: "للتواصل والاستفسار، يرجى الاتصال أو إرسال رسالة واتساب.",
          thanks: "شكراً للاهتمام! 🙏"
        };
      }
    };

    const texts = getDialectText();

    // العنوان الرئيسي
    if (data.propertyType) {
      description += texts.mainTitle(data.propertyType, data.district, data.city) + "\n\n";
    }

    // المعلومات الأساسية
    description += texts.basicInfo + "\n";
    if (data.city) description += `${texts.city} ${data.city}\n`;
    if (data.district) description += `${texts.district} ${data.district}\n`;
    if (data.area) description += `${texts.area} ${data.area}\n`;
    if (data.floors) description += `${texts.floors} ${data.floors}\n`;
    if (data.currentFloor) description += `${texts.currentFloor} ${data.currentFloor}\n`;
    if (data.clientType) description += `${texts.clientType} ${opt(data.clientType, t)}\n`;
    description += "\n";

    // تفاصيل الغرف
    description += texts.roomsTitle + "\n";
    if (data.bedrooms) description += `${texts.bedrooms} ${data.bedrooms}\n`;
    if (data.livingRooms) description += `${texts.livingRooms} ${data.livingRooms}\n`;
    if (data.bathrooms) description += `${texts.bathrooms} ${data.bathrooms}\n`;
    if (data.kitchens) description += `${texts.kitchens} ${data.kitchens}\n`;
    if (data.hasBalcony) description += `${texts.balcony} ${data.hasBalcony}\n`;
    if (data.hasRoof) description += `${texts.roof} ${data.hasRoof}\n`;
    description += "\n";

    // التشطيبات
    if (data.flooring || data.wallFinish || data.kitchenFinish || data.bathroomFinish || data.doors || data.windows) {
      description += texts.finishTitle + "\n";
      if (data.flooring) description += `${texts.flooring} ${data.flooring}\n`;
      if (data.wallFinish) description += `${texts.walls} ${data.wallFinish}\n`;
      if (data.kitchenFinish) description += `${texts.kitchen} ${data.kitchenFinish}\n`;
      if (data.bathroomFinish) description += `${texts.bathroom} ${data.bathroomFinish}\n`;
      if (data.doors) description += `${texts.doors} ${data.doors}\n`;
      if (data.windows) description += `${texts.windows} ${data.windows}\n`;
      if (data.airConditioning) description += `${texts.airConditioning} ${data.airConditioning}\n`;
      description += "\n";
    }

    // المرافق
    if (data.hasElevator || data.hasParking || data.isFurnished || (data.nearbyServices && data.nearbyServices.length > 0)) {
      description += texts.facilitiesTitle + "\n";
      if (data.hasElevator) description += `${texts.elevator} ${data.hasElevator}\n`;
      if (data.hasParking) description += `${texts.parking} ${data.hasParking}\n`;
      if (data.isFurnished) description += `${texts.furnished} ${data.isFurnished}\n`;
      
      if (data.nearbyServices && data.nearbyServices.length > 0) {
        description += texts.nearbyServices + "\n";
        data.nearbyServices.forEach((service: string) => {
          description += `• ${service}\n`;
        });
      }
      description += "\n";
    }
    
    // فكرة عن الجيران والمكان
    if (data.neighborhoodType || data.neighborsType || data.noiseLevel || data.safetyLevel) {
      description += texts.neighborhoodTitle + "\n";
      if (data.neighborhoodType) description += `${texts.neighborhoodType} ${data.neighborhoodType}\n`;
      if (data.neighborsType) description += `${texts.neighborsType} ${data.neighborsType}\n`;
      if (data.noiseLevel) description += `${texts.noiseLevel} ${data.noiseLevel}\n`;
      if (data.safetyLevel) description += `${texts.safetyLevel} ${data.safetyLevel}\n`;
      description += "\n";
    }
    
    // السعر والتعامل
    if (data.price || data.isNegotiable || data.readyToMove || data.contactMethod) {
      description += texts.priceTitle + "\n";
      if (data.price) description += `${texts.price} ${data.price}`;
      if (data.isNegotiable) description += ` - ${texts.negotiable(data.isNegotiable)}`;
      if (data.price) description += "\n";
      if (data.readyToMove) description += `${texts.readyToMove} ${data.readyToMove}\n`;
      if (data.contactMethod) description += `${texts.contactMethod} ${data.contactMethod}\n`;
      description += "\n";
    }
    
    // أوقات المعاينة
    if (data.inspectionTimes) {
      description += `${texts.inspectionTimes} ${data.inspectionTimes}\n\n`;
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `${texts.sellReason} ${data.sellReason}\n\n`;
    }
    
    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += texts.unwantedCustomers + "\n";
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `${texts.additionalNotes}\n${data.additionalNotes}\n\n`;
    }

    description += texts.contactFooter + "\n";
    description += texts.thanks;

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