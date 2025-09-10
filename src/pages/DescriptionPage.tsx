import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DescriptionPageProps {
  category: string;
  onBack: () => void;
}

const DescriptionPage = ({ category, onBack }: DescriptionPageProps) => {
  const getCategoryInfo = (cat: string) => {
    const categories = {
      'cars': { name: 'سيارات', icon: '🚗' },
      'real-estate': { name: 'عقارات', icon: '🏠' },
      'phones': { name: 'هواتف', icon: '📱' }
    };
    return categories[cat as keyof typeof categories] || { name: cat, icon: '📄' };
  };

  const categoryInfo = getCategoryInfo(category);

  const sampleDescription = `وصف تجريبي للمنتج في فئة ${categoryInfo.name}

هذا النص عبارة عن مثال توضيحي لكيفية ظهور الوصف المُنتج من خلال التطبيق. سيتم استبدال هذا النص بوصف حقيقي مُولد بذكاء اصطناعي يتناسب مع نوع المنتج المختار.

الوصف سيتضمن:
• تفاصيل المنتج الأساسية
• المميزات والخصائص المهمة  
• معلومات تساعد في اتخاذ قرار الشراء
• أسلوب كتابة مقنع وواضح

تم إنشاء هذا الوصف باستخدام تقنيات الذكاء الاصطناعي المتطورة لضمان جودة عالية وفعالية في التسويق.`;

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface-hover -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{categoryInfo.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{categoryInfo.name}</h2>
            <p className="text-muted-foreground text-sm">الوصف المُنشأ</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-card-border rounded-radius p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed">
          {sampleDescription}
        </div>
      </div>
      
      <div className="space-y-3">
        <Button className="w-full bg-success hover:bg-success/90 text-success-foreground">
          <Star className="w-4 h-4 ml-2" />
          حفظ الوصف
        </Button>
        
        <Button variant="outline" className="w-full">
          <Copy className="w-4 h-4 ml-2" />
          نسخ النص
        </Button>
        
        <Button variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 ml-2" />
          وصف جديد
        </Button>
      </div>
      
      <div className="mt-8 bg-accent rounded-radius p-4">
        <p className="text-xs text-muted-foreground text-center">
          هذا وصف تجريبي لأغراض العرض فقط • الوظائف غير مُفعّلة بعد
        </p>
      </div>
    </div>
  );
};

export default DescriptionPage;