import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Save, RotateCcw, Eye, Move, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { saveDescription } from "@/utils/saveSystem";

interface ProductFormData {
  name: string;
  price: string;
  currency: string;
  description: string;
  images: File[];
}

interface ProductDescriptionPageProps {
  formData: ProductFormData | null;
  onBack: () => void;
  onNewProduct: () => void;
}

const ProductDescriptionPage = ({ formData, onBack, onNewProduct }: ProductDescriptionPageProps) => {
  const { t } = useLanguage();
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useState(() => {
    if (formData) {
      generateDescription();
    }
  });

  const generateDescription = () => {
    if (!formData) return;

    let description = `🏷️ اسم المنتج: ${formData.name}\n\n`;
    description += `💰 السعر: ${formData.price} ${formData.currency}\n\n`;
    
    if (formData.description.trim()) {
      description += `📝 الوصف:\n${formData.description}\n\n`;
    }
    
    if (formData.images.length > 0) {
      description += `📷 الصور: متوفرة (${formData.images.length} صورة)\n\n`;
    }
    
    description += `✨ منتج عالي الجودة ومتاح للبيع\n`;
    description += `📞 للاستفسار والتواصل يرجى الاتصال\n`;
    description += `🔄 السعر قابل للتفاوض ضمن حدود معقولة`;

    setGeneratedDescription(description);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast.success(t('messages.description_copied'));
    } catch (error) {
      toast.error(t('messages.copy_error'));
    }
  };

  const handleSave = () => {
    if (!formData) return;
    
    try {
      saveDescription(
        'car',
        formData.name || 'منتج جديد',
        generatedDescription,
        formData
      );
      toast.success(t('messages.description_saved'));
    } catch (error) {
      toast.error(t('messages.save_error'));
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!formData) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? formData.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === formData.images.length - 1 ? 0 : prev + 1);
    }
  };

  if (!formData) {
    return (
      <div className="page-content">
        <div className="text-center">
          <p className="text-muted-foreground">لم يتم العثور على بيانات المنتج</p>
          <Button onClick={onBack} className="mt-4">
            العودة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-8">
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
          className="flex-shrink-0"
        >
          <Move className="w-4 h-4 rotate-180" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">وصف المنتج</h2>
          <p className="text-muted-foreground text-sm">{formData.name}</p>
        </div>
      </div>

      {/* عرض الصور */}
      {formData.images.length > 0 && (
        <div className="service-card mb-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">صور المنتج</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative flex-shrink-0">
                <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`صورة المنتج ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openLightbox(index)}
                  />
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full"
                  onClick={() => openLightbox(index)}
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* الوصف المُنشأ */}
      <div className="service-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            {t('common.generated_description')}
          </h3>
          <Button
            onClick={generateDescription}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة إنشاء
          </Button>
        </div>
        
        <Textarea
          value={generatedDescription}
          onChange={(e) => setGeneratedDescription(e.target.value)}
          className="min-h-[300px] mb-4"
          placeholder="سيتم إنشاء الوصف هنا..."
        />
        
        <p className="text-xs text-muted-foreground mb-4">
          {t('messages.auto_generated')}
        </p>
        
        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Copy className="w-4 h-4" />
            {t('actions.copy_text')}
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Save className="w-4 h-4" />
            {t('actions.save_description')}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={onNewProduct} className="w-full" variant="outline">
          إضافة منتج جديد
        </Button>
      </div>

      {/* Lightbox للصور */}
      {showLightbox && formData.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4 z-10"
              onClick={() => setShowLightbox(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={URL.createObjectURL(formData.images[currentImageIndex])}
                alt={`صورة المنتج ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  touchAction: 'pinch-zoom'
                }}
              />
            </div>

            {formData.images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={() => navigateImage('next')}
                >
                  <Move className="w-4 h-4 rotate-180" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => navigateImage('prev')}
                >
                  <Move className="w-4 h-4" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {currentImageIndex + 1} من {formData.images.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionPage;