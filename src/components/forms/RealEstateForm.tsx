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
    propertyType: '',
    purpose: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    district: '',
    price: '',
    city: '',
    contactMethod: '',
    isFurnished: '',
    hasParking: '',
    hasElevator: '',
    sellReason: '',
    additionalNotes: ''
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
          <p className="text-muted-foreground text-sm">املأ جميع المعلومات لإنشاء وصف شامل</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="propertyType">نوع العقار</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العقار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شقة">شقة</SelectItem>
                  <SelectItem value="فيلا">فيلا</SelectItem>
                  <SelectItem value="دوبلكس">دوبلكس</SelectItem>
                  <SelectItem value="تاون هاوس">تاون هاوس</SelectItem>
                  <SelectItem value="أرض">أرض</SelectItem>
                  <SelectItem value="محل تجاري">محل تجاري</SelectItem>
                  <SelectItem value="مكتب">مكتب</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Label htmlFor="area">المساحة (متر مربع)</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="أدخل المساحة"
              />
            </div>
            <div>
              <Label htmlFor="district">الحي</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="أدخل اسم الحي"
              />
            </div>
            <div>
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="أدخل اسم المدينة"
              />
            </div>
          </CardContent>
        </Card>

        {/* توزيع الغرف */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع الغرف</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bedrooms">عدد غرف النوم</Label>
              <Input
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                placeholder="مثال: 3"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">عدد الحمامات</Label>
              <Input
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                placeholder="مثال: 2"
              />
            </div>
          </CardContent>
        </Card>

        {/* المرافق */}
        <Card>
          <CardHeader>
            <CardTitle>المرافق والخدمات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="isFurnished">مفروش</Label>
              <Select value={formData.isFurnished} onValueChange={(value) => handleInputChange('isFurnished', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="هل العقار مفروش؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                  <SelectItem value="جزئياً">جزئياً</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hasParking">موقف سيارات</Label>
              <Select value={formData.hasParking} onValueChange={(value) => handleInputChange('hasParking', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="هل يوجد موقف؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hasElevator">مصعد</Label>
              <Select value={formData.hasElevator} onValueChange={(value) => handleInputChange('hasElevator', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="هل يوجد مصعد؟" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* السعر والتواصل */}
        <Card>
          <CardHeader>
            <CardTitle>السعر والتواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">السعر</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="أدخل السعر"
              />
            </div>
            <div>
              <Label htmlFor="contactMethod">طريقة التواصل</Label>
              <Input
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                placeholder="رقم الهاتف أو واتساب"
              />
            </div>
            <div>
              <Label htmlFor="sellReason">سبب البيع/الإيجار</Label>
              <Input
                id="sellReason"
                value={formData.sellReason}
                onChange={(e) => handleInputChange('sellReason', e.target.value)}
                placeholder="اختياري"
              />
            </div>
            <div>
              <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="أضف أي تفاصيل إضافية..."
                rows={4}
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