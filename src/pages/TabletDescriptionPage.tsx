import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";

interface TabletDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const TabletDescriptionPage = ({ data, onBack, onNewDescription }: TabletDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `📱 ${t('description.tablet_for_sale')}\n\n`;
    
    // معلومات أساسية
    if (data.brand) {
      description += `🏷️ الماركة: ${data.brand}\n`;
    }
    if (data.model) {
      description += `📱 الموديل: ${data.model}\n`;
    }
    if (data.screenSize) {
      description += `📏 حجم الشاشة: ${data.screenSize}\n`;
    }
    if (data.screenType) {
      description += `🖥️ نوع الشاشة: ${data.screenType}\n`;
    }
    
    description += "\n";
    
    // المواصفات التقنية
    if (data.processor || data.ram || data.storage) {
      description += "⚙️ المواصفات التقنية:\n";
      if (data.processor) {
        description += `• المعالج: ${data.processor}\n`;
      }
      if (data.ram) {
        description += `• الذاكرة العشوائية: ${data.ram}\n`;
      }
      if (data.storage) {
        description += `• سعة التخزين: ${data.storage}\n`;
      }
      description += "\n";
    }
    
    // معلومات إضافية
    if (data.battery) {
      description += `🔋 البطارية: ${data.battery} mAh\n`;
    }
    if (data.operatingSystem) {
      description += `💻 نظام التشغيل: ${data.operatingSystem}\n`;
    }
    if (data.connectivity) {
      description += `📶 الاتصال: ${data.connectivity}\n`;
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
    
    // الملحقات
    if (data.accessories && data.accessories.length > 0) {
      description += "📦 الملحقات المرفقة:\n";
      data.accessories.forEach((accessory: string) => {
        description += `• ${accessory}\n`;
      });
      description += "\n";
    }
    
    // الكاميرات
    if (data.frontCamera || data.rearCamera) {
      description += "📸 الكاميرات:\n";
      if (data.frontCamera) {
        description += `• الكاميرا الأمامية: ${data.frontCamera}\n`;
      }
      if (data.rearCamera) {
        description += `• الكاميرا الخلفية: ${data.rearCamera}\n`;
      }
      description += "\n";
    }
    
    // الألوان
    if (data.colors && data.colors.length > 0) {
      description += `🎨 الألوان المتاحة: ${data.colors.join(", ")}\n\n`;
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
    
    // معلومات البائع
    if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
      description += "\n👤 معلومات البائع:\n";
      if (data.city) description += `📍 المدينة: ${data.city}\n`;
      if (data.sellerType) description += `👥 نوع البائع: ${data.sellerType}\n`;
      if (data.deliveryMethod) description += `🚚 طريقة التسليم: ${data.deliveryMethod}\n`;
      if (data.negotiable) description += `💰 السعر قابل للتفاوض: ${data.negotiable}\n`;
      if (data.contactMethod) description += `📞 طريقة التواصل: ${data.contactMethod}\n`;
      if (data.warranty) description += `🛡️ الضمان: ${data.warranty}\n`;
      if (data.warranty === "متوفر" && data.warrantyDuration) description += `⏰ مدة الضمان: ${data.warrantyDuration}\n`;
      if (data.acceptExchange) description += `🔄 يقبل التبديل: ${data.acceptExchange}\n`;
      description += "\n";
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `💭 سبب البيع: ${data.sellReason}\n\n`;
    }
    
    // وصف إضافي
    if (data.description) {
      description += `📝 تفاصيل إضافية:\n${data.description}\n\n`;
    }
    
    // العملاء غير المرغوب فيهم
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += "🚫 يُرجى من الفئات التالية عدم التواصل:\n";
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }
    
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
    const title = generateTitleFromData('tablet', data);
    saveDescription('tablet', title, generateDescription(), data);
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
          <h2 className="text-2xl font-bold text-foreground">📱 وصف التابلت</h2>
          <p className="text-muted-foreground text-sm">الوصف المُنشأ لجهازك اللوحي</p>
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

export default TabletDescriptionPage;