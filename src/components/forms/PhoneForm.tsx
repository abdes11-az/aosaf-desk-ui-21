import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { sanitizeFormData } from "@/utils/security";

interface SimplePhoneFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const SimplePhoneForm = ({ onBack, onGenerateDescription }: SimplePhoneFormProps) => {
  const [formData, setFormData] = useState({
    phoneName: "",
    color: "",
    condition: "",
    usageDuration: "",
    storage: "",
    ram: "",
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
          <h2 className="text-xl font-bold text-foreground">تفاصيل الهاتف</h2>
          <p className="text-muted-foreground text-sm">املأ التفاصيل لإنشاء وصف شامل</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📱 المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phoneName">اسم الهاتف</Label>
              <Input
                id="phoneName"
                value={formData.phoneName}
                onChange={(e) => handleInputChange('phoneName', e.target.value)}
                placeholder="مثال: iPhone 14 Pro"
              />
            </div>

            <div>
              <Label htmlFor="color">اللون</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="مثال: أزرق"
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

            <div>
              <Label htmlFor="usageDuration">مدة الاستعمال</Label>
              <Input
                id="usageDuration"
                value={formData.usageDuration}
                onChange={(e) => handleInputChange('usageDuration', e.target.value)}
                placeholder="مثال: 6 أشهر"
              />
            </div>
          </CardContent>
        </Card>

        {/* التفاصيل التقنية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              ⚙️ التفاصيل التقنية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storage">مساحة التخزين</Label>
              <Input
                id="storage"
                value={formData.storage}
                onChange={(e) => handleInputChange('storage', e.target.value)}
                placeholder="مثال: 128 جيجا"
              />
            </div>

            <div>
              <Label htmlFor="ram">الذاكرة العشوائية</Label>
              <Input
                id="ram"
                value={formData.ram}
                onChange={(e) => handleInputChange('ram', e.target.value)}
                placeholder="مثال: 6 جيجا"
              />
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
                placeholder="مثال: 2500 ريال"
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

export default SimplePhoneForm;