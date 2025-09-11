import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { sanitizeFormData } from "@/utils/security";

interface RealEstateFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const RealEstateForm = ({ onBack, onGenerateDescription }: RealEstateFormProps) => {
  const [formData, setFormData] = useState({
    purpose: "",
    propertyType: "",
    city: "",
    district: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    isNegotiable: "",
    contactMethod: "",
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
          <h2 className="text-xl font-bold text-foreground">تفاصيل العقار</h2>
          <p className="text-muted-foreground text-sm">املأ التفاصيل لإنشاء وصف شامل</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏠 المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="purpose">الغرض</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الغرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="للبيع">للبيع</SelectItem>
                  <SelectItem value="للإيجار">للإيجار</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType">نوع العقار</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العقار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فيلا">فيلا</SelectItem>
                  <SelectItem value="شقة">شقة</SelectItem>
                  <SelectItem value="بيت شعبي">بيت شعبي</SelectItem>
                  <SelectItem value="أرض">أرض</SelectItem>
                  <SelectItem value="مكتب">مكتب</SelectItem>
                  <SelectItem value="محل">محل</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="district">الحي</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="مثال: النرجس"
              />
            </div>

            <div>
              <Label htmlFor="area">المساحة</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="مثال: 400 متر مربع"
              />
            </div>

            <div>
              <Label htmlFor="bedrooms">عدد غرف النوم</Label>
              <Input
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                placeholder="مثال: 4"
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">عدد دورات المياه</Label>
              <Input
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                placeholder="مثال: 3"
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
                placeholder="مثال: 850000 ريال"
              />
            </div>

            <div>
              <Label htmlFor="isNegotiable">قابل للتفاوض</Label>
              <Select value={formData.isNegotiable} onValueChange={(value) => handleInputChange('isNegotiable', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="هل السعر قابل للتفاوض؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                  <SelectItem value="ضمن حدود معقولة">ضمن حدود معقولة</SelectItem>
                </SelectContent>
              </Select>
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

export default RealEstateForm;