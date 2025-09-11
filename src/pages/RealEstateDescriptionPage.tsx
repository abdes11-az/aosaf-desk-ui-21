import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";

interface RealEstateDescriptionPageProps {
  realEstateData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const RealEstateDescriptionPage = ({ realEstateData, onBack, onNewDescription }: RealEstateDescriptionPageProps) => {
  const { toast } = useToast();

  const formatYesNo = (value: any): string => {
    if (!value) return '';
    const str = String(value).trim().toLowerCase();
    if (['نعم', 'yes', 'true', '1'].includes(str)) return 'نعم';
    if (['لا', 'no', 'false', '0'].includes(str)) return 'لا';
    return String(value);
  };

  const generateRealEstateDescription = (data: any) => {
    let description = "";

    // العنوان الرئيسي
    if (data.propertyType) {
      description += `🏠 ${data.propertyType}`;
      if (data.purpose) description += ` ${data.purpose}`;
      if (data.district && data.city) {
        description += ` في ${data.district}, ${data.city}`;
      }
      description += "\n\n";
    }

    // المعلومات الأساسية
    description += "📋 المعلومات الأساسية:\n";
    if (data.propertyType) description += `🏠 نوع العقار: ${data.propertyType}\n`;
    if (data.city) description += `📍 المدينة: ${data.city}\n`;
    if (data.district) description += `🗺️ الحي: ${data.district}\n`;
    if (data.area) description += `📐 المساحة: ${data.area}\n`;
    if (data.bedrooms) description += `🛏️ غرف النوم: ${data.bedrooms}\n`;
    if (data.bathrooms) description += `🚿 دورات المياه: ${data.bathrooms}\n`;
    description += "\n";

    // معلومات البائع
    description += "👤 معلومات المالك:\n";
    if (data.price) description += `💰 السعر: ${data.price}\n`;
    if (data.isNegotiable) description += `💬 قابل للتفاوض: ${data.isNegotiable}\n`;
    if (data.contactMethod) description += `📞 للتواصل: ${data.contactMethod}\n`;
    description += "\n";

    if (data.additionalNotes) {
      description += `📝 ملاحظات إضافية:\n${data.additionalNotes}\n\n`;
    }

    description += "شكراً لاهتمامكم! 🙏";
    return description;
  };

  const generatedDescription = generateRealEstateDescription(realEstateData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({ title: "تم النسخ بنجاح", description: "تم نسخ وصف العقار" });
    } catch (err) {
      toast({ title: "خطأ", description: "فشل في نسخ النص", variant: "destructive" });
    }
  };

  const handleSave = () => {
    const title = generateTitleFromData(realEstateData, 'real-estate');
    saveDescription('real-estate', title, generatedDescription, realEstateData);
    toast({ title: "تم الحفظ بنجاح", description: "تم حفظ وصف العقار" });
  };

  return (
    <div className="page-content max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="touch-button bg-accent hover:bg-surface -mr-2">
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">وصف العقار</h2>
            <p className="text-muted-foreground text-sm">وصف شامل ومحترف</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
          {generatedDescription}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          احفظ الوصف
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          انسخ النص
        </Button>
        <Button onClick={onNewDescription} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          وصف جديد
        </Button>
      </div>

      <div className="bg-accent rounded-lg p-4 text-center">
        <p className="text-sm text-accent-foreground">
          تم إنشاء هذا الوصف تلقائياً بناءً على المعلومات المدخلة • يمكنك تعديل أي تفاصيل حسب الحاجة
        </p>
      </div>
    </div>
  );
};

export default RealEstateDescriptionPage;