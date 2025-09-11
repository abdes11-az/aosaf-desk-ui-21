import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { sanitizeFormData } from "@/utils/security";

interface TenantFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const TenantForm = ({ onBack, onGenerateDescription }: TenantFormProps) => {
  const [formData, setFormData] = useState({
    usageType: '',
    tenantType: '',
    rentalDuration: '',
    numberOfResidents: '',
    hasChildren: '',
    hasFurniture: '',
    hasPets: '',
    paymentMethod: '',
    businessType: '',
    numberOfEmployees: '',
    contactMethod: '',
    additionalRequirements: ''
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
          <h2 className="text-xl font-bold text-foreground">ملف المستأجر</h2>
          <p className="text-muted-foreground text-sm">املأ جميع المعلومات لإنشاء ملف شامل</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* القسم العام */}
        <Card>
          <CardHeader>
            <CardTitle>القسم العام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="usageType">نوع الاستخدام</Label>
              <Select value={formData.usageType} onValueChange={(value) => handleInputChange('usageType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الاستخدام" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="سكني">سكني</SelectItem>
                  <SelectItem value="تجاري">تجاري</SelectItem>
                  <SelectItem value="مكتبي">مكتبي</SelectItem>
                  <SelectItem value="مختلط">مختلط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tenantType">نوع المستأجر</Label>
              <Select value={formData.tenantType} onValueChange={(value) => handleInputChange('tenantType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المستأجر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فرد">فرد</SelectItem>
                  <SelectItem value="عائلة">عائلة</SelectItem>
                  <SelectItem value="شركة">شركة</SelectItem>
                  <SelectItem value="مؤسسة">مؤسسة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rentalDuration">مدة الإيجار المطلوبة</Label>
              <Input
                id="rentalDuration"
                value={formData.rentalDuration}
                onChange={(e) => handleInputChange('rentalDuration', e.target.value)}
                placeholder="مثال: سنة واحدة"
              />
            </div>
          </CardContent>
        </Card>

        {/* القسم السكني */}
        {(formData.usageType === 'سكني' || formData.usageType === 'مختلط') && (
          <Card>
            <CardHeader>
              <CardTitle>القسم السكني</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="numberOfResidents">عدد السكان</Label>
                <Input
                  id="numberOfResidents"
                  value={formData.numberOfResidents}
                  onChange={(e) => handleInputChange('numberOfResidents', e.target.value)}
                  placeholder="مثال: 4 أشخاص"
                />
              </div>
              <div>
                <Label htmlFor="hasChildren">يوجد أطفال</Label>
                <Select value={formData.hasChildren} onValueChange={(value) => handleInputChange('hasChildren', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="هل يوجد أطفال؟" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">نعم</SelectItem>
                    <SelectItem value="لا">لا</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hasFurniture">يوجد أثاث</Label>
                <Select value={formData.hasFurniture} onValueChange={(value) => handleInputChange('hasFurniture', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="هل يملك أثاث؟" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">نعم</SelectItem>
                    <SelectItem value="لا">لا</SelectItem>
                    <SelectItem value="جزئياً">جزئياً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hasPets">يوجد حيوانات أليفة</Label>
                <Select value={formData.hasPets} onValueChange={(value) => handleInputChange('hasPets', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="هل يوجد حيوانات أليفة؟" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">نعم</SelectItem>
                    <SelectItem value="لا">لا</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* القسم التجاري */}
        {(formData.usageType === 'تجاري' || formData.usageType === 'مكتبي' || formData.usageType === 'مختلط') && (
          <Card>
            <CardHeader>
              <CardTitle>القسم التجاري</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessType">نوع العمل</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  placeholder="مثال: مكتب محاماة"
                />
              </div>
              <div>
                <Label htmlFor="numberOfEmployees">عدد الموظفين</Label>
                <Input
                  id="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                  placeholder="مثال: 5 موظفين"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* التواصل */}
        <Card>
          <CardHeader>
            <CardTitle>طريقة التواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="paymentMethod">طريقة الدفع المفضلة</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شهري">شهري</SelectItem>
                  <SelectItem value="ربع سنوي">ربع سنوي</SelectItem>
                  <SelectItem value="نصف سنوي">نصف سنوي</SelectItem>
                  <SelectItem value="سنوي">سنوي</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="additionalRequirements">متطلبات إضافية</Label>
              <Textarea
                id="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                placeholder="أضف أي متطلبات إضافية..."
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
          إنشاء ملف المستأجر
        </Button>
      </div>
    </div>
  );
};

export default TenantForm;