import { Copy, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";

interface BicycleDescriptionPageProps {
  data: any;
  onBack: () => void;
  onNewDescription?: () => void;
}

const BicycleDescriptionPage = ({ data, onBack, onNewDescription }: BicycleDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateDescription = () => {
    let description = `🚲 ${t('bicycle.title')}\n\n`;
    
    // معلومات أساسية
    if (data.type) {
      const typeMap: { [key: string]: string } = {
        "mountain": "دراجة جبلية",
        "road": "دراجة طريق",
        "hybrid": "دراجة هجين",
        "electric": "دراجة كهربائية",
        "bmx": "دراجة BMX",
        "city": "دراجة مدينة"
      };
      description += `🏷️ النوع: ${typeMap[data.type] || data.type}\n`;
    }
    if (data.brand) {
      const brandName = data.brand === "other" ? data.customBrand : data.brand;
      if (brandName) {
        description += `🏭 الماركة: ${brandName}\n`;
      }
    }
    if (data.model) {
      description += `📝 الموديل: ${data.model}\n`;
    }
    
    description += "\n";
    
    // المواصفات التقنية
    description += "⚙️ المواصفات:\n";
    if (data.frameSize) {
      description += `• حجم الإطار: ${data.frameSize}\n`;
    }
    if (data.material) {
      const materialMap: { [key: string]: string } = {
        "aluminum": "ألومنيوم",
        "carbon": "كاربون",
        "steel": "حديد",
        "titanium": "تيتانيوم"
      };
      description += `• مادة الإطار: ${materialMap[data.material] || data.material}\n`;
    }
    if (data.gearSystem) {
      description += `• نظام السرعات: ${data.gearSystem} سرعة\n`;
    }
    if (data.brakeType) {
      const brakeMap: { [key: string]: string } = {
        "disc": "مكابح قرصية",
        "v-brake": "مكابح V-Brake",
        "hydraulic": "مكابح هيدروليكية",
        "rim": "مكابح حافة العجلة"
      };
      description += `• نوع المكابح: ${brakeMap[data.brakeType] || data.brakeType}\n`;
    }
    if (data.wheelSize) {
      description += `• حجم العجلات: ${data.wheelSize}\n`;
    }
    if (data.weight) {
      description += `• الوزن: ${data.weight} كغ\n`;
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
    
    // معلومات إضافية
    if (data.color) {
      description += `🎨 اللون: ${data.color}\n`;
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
      description += "\n👤 معلومات البائع:\n";
      if (data.city) description += `📍 المدينة: ${data.city}\n`;
      if (data.sellerType) description += `👥 نوع البائع: ${data.sellerType}\n`;
      if (data.deliveryMethod) description += `🚚 طريقة التسليم: ${data.deliveryMethod}\n`;
      if (data.negotiable) description += `💰 السعر قابل للتفاوض: ${data.negotiable}\n`;
      if (data.contactMethod) description += `📞 طريقة التواصل: ${data.contactMethod}\n`;
      if (data.warranty) description += `🛡️ الضمان: ${data.warranty}\n`;
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
    const title = generateTitleFromData('bicycle', data);
    saveDescription('bicycle', title, generateDescription(), data);
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
          <h2 className="text-2xl font-bold text-foreground">🚲 وصف الدراجة</h2>
          <p className="text-muted-foreground text-sm">الوصف المُنشأ لدراجتك الهوائية</p>
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

export default BicycleDescriptionPage;