import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";

interface ClothingDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const ClothingDescriptionPage = ({ data, onBack, onNewDescription }: ClothingDescriptionPageProps) => {
  const { toast } = useToast();

  const generateDescription = () => {
    let description = "👕 ملابس للبيع\n\n";
    
    // معلومات أساسية
    if (data.gender) {
      const genderMap: { [key: string]: string } = {
        "men": "رجالي",
        "women": "نسائي",
        "kids": "أطفال",
        "unisex": "للجنسين"
      };
      description += `👤 النوع: ${genderMap[data.gender] || data.gender}\n`;
    }
    if (data.category) {
      description += `🏷️ الفئة: ${data.category}\n`;
    }
    if (data.brand) {
      description += `🏭 الماركة: ${data.brand}\n`;
    }
    
    description += "\n";
    
    // المواصفات
    description += "📋 المواصفات:\n";
    if (data.sizes) {
      description += `• المقاسات المتاحة: ${data.sizes}\n`;
    }
    if (data.customSizes) {
      description += `• مقاسات أخرى: ${data.customSizes}\n`;
    }
    if (data.customSizes) {
      description += `📏 مقاسات أخرى: ${data.customSizes}\n`;
    }
    if (data.material) {
      const materialMap: { [key: string]: string } = {
        "cotton": "قطن",
        "polyester": "بوليستر",
        "wool": "صوف",
        "leather": "جلد",
        "denim": "دنيم",
        "silk": "حرير",
        "linen": "كتان",
        "synthetic": "مواد صناعية",
        "mixed": "خليط"
      };
      description += `• المادة: ${materialMap[data.material] || data.material}\n`;
    }
    if (data.style) {
      const styleMap: { [key: string]: string } = {
        "formal": "رسمي",
        "casual": "كاجوال",
        "sport": "رياضي",
        "elegant": "أنيق",
        "vintage": "كلاسيكي",
        "modern": "عصري"
      };
      description += `• النمط: ${styleMap[data.style] || data.style}\n`;
    }
    if (data.season) {
      const seasonMap: { [key: string]: string } = {
        "summer": "صيفي",
        "winter": "شتوي",
        "spring": "ربيعي",
        "autumn": "خريفي",
        "all-season": "جميع الفصول"
      };
      description += `• الموسم: ${seasonMap[data.season] || data.season}\n`;
    }
    
    description += "\n";
    
    // التعديلات
    if (data.modifications && data.modifications.length > 0) {
      description += "🛠️ التعديلات:\n";
      data.modifications.forEach((mod: string) => {
        description += `• ${mod}\n`;
      });
      description += "\n";
    }
    
    // الألوان
    if (data.colors && data.colors.length > 0) {
      description += `🎨 الألوان المتاحة: ${data.colors.join(", ")}\n\n`;
    }
    
    // معلومات إضافية
    if (data.countryOfOrigin) {
      description += `🌍 بلد الصنع: ${data.countryOfOrigin}\n`;
    }
    
    // الحالة والسعر
    if (data.condition) {
      const conditionMap: { [key: string]: string } = {
        "new": "جديد",
        "like-new": "كالجديد",
        "excellent": "ممتاز",
        "good": "جيد",
        "fair": "مقبول"
      };
      description += `✅ الحالة: ${conditionMap[data.condition] || data.condition}\n`;
    }
    
    if (data.price) {
      description += `💰 السعر: ${data.price}\n\n`;
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `💭 سبب البيع: ${data.sellReason}\n\n`;
    }
    
    // وصف إضافي
    if (data.description) {
      description += `📝 تفاصيل إضافية:\n${data.description}\n\n`;
    }
    
    // معلومات التواصل والضمان
    if (data.contactMethod) description += `📞 طريقة التواصل: ${data.contactMethod}\n`;
    if (data.warranty) description += `🛡️ الضمان: ${data.warranty}\n`;
    if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ مدة الضمان: ${data.warrantyDuration}\n`;
    if (data.acceptExchange) description += `🔄 يقبل التبديل: ${data.acceptExchange}\n`;
    
    description += "📞 للاستفسار والتواصل، يرجى الاتصال";
    
    return description;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDescription());
    toast({
      title: "تم النسخ",
      description: "تم نسخ الوصف إلى الحافظة بنجاح",
    });
  };

  const handleSave = () => {
    const title = generateTitleFromData('clothing', data);
    saveDescription('clothing', title, generateDescription(), data);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الوصف بنجاح",
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
          <h2 className="text-2xl font-bold text-foreground">👕 وصف الملابس</h2>
          <p className="text-muted-foreground text-sm">الوصف المُنشأ لقطعة الملابس</p>
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

export default ClothingDescriptionPage;