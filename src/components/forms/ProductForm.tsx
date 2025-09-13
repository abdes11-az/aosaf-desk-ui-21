import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Upload, X, Eye, Move } from "lucide-react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  price: string;
  currency: string;
  description: string;
  images: File[];
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onBack: () => void;
}

const ProductForm = ({ onSubmit, onBack }: ProductFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    currency: "ريال",
    description: "",
    images: []
  });
  
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (files: FileList | null, source: 'camera' | 'upload') => {
    if (!files) return;
    
    const newImages = Array.from(files).filter(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error("حجم الصورة كبير جداً. يجب أن يكون أقل من 5 ميجابايت");
          return false;
        }
        return true;
      } else {
        toast.error("يرجى اختيار ملف صورة صحيح");
        return false;
      }
    });

    if (newImages.length === 0) return;

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));

    toast.success(`تم إضافة ${newImages.length} صورة بنجاح`);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    toast.success("تم حذف الصورة");
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? formData.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === formData.images.length - 1 ? 0 : prev + 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("يرجى إدخال اسم المنتج");
      return;
    }
    if (!formData.price.trim()) {
      toast.error("يرجى إدخال السعر");
      return;
    }
    
    onSubmit(formData);
  };

  const currencies = [
    { value: "ريال", label: "ريال سعودي" },
    { value: "درهم", label: "درهم إماراتي" },
    { value: "دينار", label: "دينار كويتي" },
    { value: "جنيه", label: "جنيه مصري" },
    { value: "درهم مغربي", label: "درهم مغربي" },
    { value: "دولار", label: "دولار أمريكي" },
    { value: "يورو", label: "يورو" }
  ];

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
          <h2 className="text-2xl font-bold text-foreground">إضافة منتج</h2>
          <p className="text-muted-foreground text-sm">أضف تفاصيل منتجك الجديد</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* معلومات المنتج الأساسية */}
        <div className="service-card space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">المعلومات الأساسية</h3>
          
          <div>
            <Label htmlFor="name">اسم المنتج *</Label>
            <Input
              id="name"
              placeholder="أدخل اسم المنتج..."
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">السعر *</Label>
              <Input
                id="price"
                type="number"
                placeholder="أدخل السعر..."
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">العملة</Label>
              <Select value={formData.currency} onValueChange={(value) => updateField("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">وصف المنتج (اختياري)</Label>
            <Textarea
              id="description"
              placeholder="أضف وصفاً تفصيلياً للمنتج..."
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* قسم الصور */}
        <div className="service-card space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">صور المنتج</h3>
          
          <div className="flex gap-3">
            <Button
              onClick={() => cameraInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Camera className="w-4 h-4 ml-2" />
              أخذ صورة
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Upload className="w-4 h-4 ml-2" />
              رفع صورة
            </Button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files, 'camera')}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files, 'upload')}
          />

          {formData.images.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                تم إضافة {formData.images.length} صورة
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`صورة المنتج ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => openLightbox(index)}
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
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
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full"
          size="lg"
        >
          إنشاء وصف المنتج
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
                style={{ maxWidth: '100%', maxHeight: '100%' }}
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

export default ProductForm;