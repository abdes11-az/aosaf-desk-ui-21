import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond, isYes } from "@/utils/i18nHelpers";

interface ClothingDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const ClothingDescriptionPage = ({ data, onBack, onNewDescription }: ClothingDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `👕 ${t('description.clothing_for_sale')}\n\n`;
    
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
      description += `✅ ${t('description.condition')}: ${cond(data.condition, t)}\n`;
    }
    
    if (data.price) {
      description += `💰 ${t('description.price')}: ${data.price}\n\n`;
    }
    
    
    // وصف إضافي
    if (data.description) {
      description += `📝 تفاصيل إضافية:\n${data.description}\n\n`;
    }
    
    // معلومات التواصل والضمان
    if (data.contactMethod) description += `📞 ${t('description.contact_method')}: ${data.contactMethod}\n`;
    if (data.warranty) description += `🛡️ ${t('description.warranty')}: ${opt(data.warranty, t)}\n`;
    if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ ${t('description.warranty_duration')}: ${data.warrantyDuration}\n`;
    if (data.acceptExchange) description += `🔄 ${t('description.accept_exchange')}: ${yn(data.acceptExchange, t)}\n`;
    
    description += "📞 للاستفسار والتواصل، يرجى الاتصال";
    
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
    const title = generateTitleFromData('clothing', data);
    saveDescription('clothing', title, generateDescription(), data);
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