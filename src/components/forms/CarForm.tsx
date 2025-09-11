import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { sanitizeFormData } from "@/utils/security";

interface CarFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const CarForm = ({ onBack, onGenerateDescription }: CarFormProps) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    fuelType: "",
    transmission: "",
    kilometers: "",
    condition: "",
    price: "",
    city: "",
    sellerType: "",
    contactMethod: "",
    warranty: "",
    negotiable: "",
    sellReason: "",
    additionalNotes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const sanitizedData = sanitizeFormData(formData);
    onGenerateDescription(sanitizedData);
  };

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface-hover -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">تفاصيل السيارة</h2>
          <p className="text-muted-foreground text-sm">املأ التفاصيل لإنشاء وصف شامل</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🚗 المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="brand">الماركة</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="مثال: تويوتا"
              />
            </div>

            <div>
              <Label htmlFor="model">الموديل</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="مثال: كامري"
              />
            </div>

            <div>
              <Label htmlFor="year">سنة الصنع</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="مثال: 2020"
              />
            </div>

            <div>
              <Label htmlFor="color">اللون</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="مثال: أبيض"
              />
            </div>

            <div>
              <Label htmlFor="fuelType">نوع الوقود</Label>
              <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الوقود" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="بنزين">بنزين</SelectItem>
                  <SelectItem value="ديزل">ديزل</SelectItem>
                  <SelectItem value="هجين">هجين</SelectItem>
                  <SelectItem value="كهربائي">كهربائي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transmission">ناقل الحركة</Label>
              <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر ناقل الحركة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="أوتوماتيك">أوتوماتيك</SelectItem>
                  <SelectItem value="عادي">عادي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="kilometers">عدد الكيلومترات</Label>
              <Input
                id="kilometers"
                value={formData.kilometers}
                onChange={(e) => handleInputChange('kilometers', e.target.value)}
                placeholder="مثال: 50000 كم"
              />
            </div>

            <div>
              <Label htmlFor="condition">الحالة</Label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="جديد">جديد</SelectItem>
                  <SelectItem value="مستعمل">مستعمل</SelectItem>
                  <SelectItem value="ممتاز">ممتاز</SelectItem>
                  <SelectItem value="جيد">جيد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* معلومات البائع */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              👤 معلومات البائع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">السعر</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="مثال: 85000 ريال"
              />
            </div>

            <div>
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="مثال: الرياض"
              />
            </div>

            <div>
              <Label htmlFor="contactMethod">طريقة التواصل</Label>
              <Textarea
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                placeholder="رقم الجوال أو واتساب..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="sellReason">سبب البيع</Label>
              <Textarea
                id="sellReason"
                value={formData.sellReason}
                onChange={(e) => handleInputChange('sellReason', e.target.value)}
                placeholder="سبب رغبتك في البيع..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="أي تفاصيل إضافية..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={handleSubmit}
          className="w-full"
          size="lg"
        >
          إنشاء الوصف
        </Button>
      </div>
    </div>
  );
};

export default CarForm;