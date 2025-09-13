import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { sanitizeFormData } from "@/utils/security";
import { debounce } from "@/utils/performance";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ModificationsSection,
  TechnicalDetailsSection, 
  CarConditionSection,
  UnwantedCustomersSection,
  AdditionalEquipmentSection,
  OwnerInfoSection,
  SellReasonSection
} from "./CarFormSections";

interface CarFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const CarForm = ({ onBack, onGenerateDescription }: CarFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // المعلومات الأساسية
    city: "",
    carType: "",
    model: "",
    year: "",
    fuelType: "",
    enginePower: "",
    transmission: "",
    fuelConsumption: "",
    doors: "",
    condition: "مستعمل",
    
    // تفاصيل الاستخدام
    firstUse: "",
    allServicesAvailable: "",
    firstUseInCountry: "",
    kilometers: "",
    color: "",
    hadAccident: "",
    originalPaint: "",
    
    // التعديلات
    modifications: [] as string[],
    
    // التفاصيل التقنية
    engineType: "",
    steering: "",
    airbags: "",
    airConditioning: "",
    
    // حالة السيارة
    wheelType: "",
    glass: "",
    interior: "",
    speakers: "",
    
    // سبب البيع
    sellReason: "",
    
    // أوقات المعاينة
    inspectionTimes: "",
    
    // العملاء غير المرغوبين
    unwantedCustomers: [] as string[],
    
    // التجهيزات الإضافية
    additionalEquipment: [] as string[],
    
    // معلومات المالك
    ownerType: "",
    usageDuration: "",
    ownership: "",
    documentsReady: "",
    taxAmount: "",
    insuranceAmount: "",
    phoneNumber: "",
    price: "",
    negotiable: "",
    additionalNotes: ""
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = () => {
    // تنظيف البيانات قبل الإرسال
    const cleanData = sanitizeFormData(formData);
    onGenerateDescription(cleanData);
  };

  return (
    <div className="page-content max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚗</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('car.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('form.fill_all_info')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🚗 {t('car.basic_info')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">{t('form.city')}</Label>
                <Input
                  id="city"
                  placeholder={t('placeholders.enter_city')}
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="carType">{t('car.car_type')}</Label>
                <Select value={formData.carType} onValueChange={(value) => updateField("carType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="داسيا — Dacia">داسيا — Dacia</SelectItem>
                    <SelectItem value="رونو — Renault">رونو — Renault</SelectItem>
                    <SelectItem value="هيونداي — Hyundai">هيونداي — Hyundai</SelectItem>
                    <SelectItem value="بيجو — Peugeot">بيجو — Peugeot</SelectItem>
                    <SelectItem value="فولكس فاغن — Volkswagen">فولكس فاغن — Volkswagen</SelectItem>
                    <SelectItem value="تويوتا — Toyota">تويوتا — Toyota</SelectItem>
                    <SelectItem value="كيا — Kia">كيا — Kia</SelectItem>
                    <SelectItem value="سيتروين — Citroën">سيتروين — Citroën</SelectItem>
                    <SelectItem value="فيات — Fiat">فيات — Fiat</SelectItem>
                    <SelectItem value="فورد — Ford">فورد — Ford</SelectItem>
                    <SelectItem value="أوبل — Opel">أوبل — Opel</SelectItem>
                    <SelectItem value="سكودا — Skoda">سكودا — Skoda</SelectItem>
                    <SelectItem value="نيسان — Nissan">نيسان — Nissan</SelectItem>
                    <SelectItem value="شيفروليه — Chevrolet">شيفروليه — Chevrolet</SelectItem>
                    <SelectItem value="مرسيدس — Mercedes-Benz">مرسيدس — Mercedes-Benz</SelectItem>
                    <SelectItem value="بي إم دبليو — BMW">بي إم دبليو — BMW</SelectItem>
                    <SelectItem value="أودي — Audi">أودي — Audi</SelectItem>
                    <SelectItem value="لاند روفر — Land Rover">لاند روفر — Land Rover</SelectItem>
                    <SelectItem value="جيب — Jeep">جيب — Jeep</SelectItem>
                    <SelectItem value="فولفو — Volvo">فولفو — Volvo</SelectItem>
                    <SelectItem value="بورشه — Porsche">بورشه — Porsche</SelectItem>
                    <SelectItem value="جاجوار — Jaguar">جاجوار — Jaguar</SelectItem>
                    <SelectItem value="تسلا — Tesla">تسلا — Tesla</SelectItem>
                    <SelectItem value="بي واي دي — BYD">بي واي دي — BYD</SelectItem>
                    <SelectItem value="إم جي — MG">إم جي — MG</SelectItem>
                    <SelectItem value="هافال — Great Wall / Haval">هافال — Great Wall / Haval</SelectItem>
                    <SelectItem value="جيلي — Geely">جيلي — Geely</SelectItem>
                    <SelectItem value="نيو موتورز — Neo Motors">نيو موتورز — Neo Motors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">{t('form.model')}</Label>
                <Input
                  id="model"
                  placeholder={t('placeholders.enter_model')}
                  value={formData.model}
                  onChange={(e) => updateField("model", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="year">{t('car.year')}</Label>
                <Input
                  id="year"
                  placeholder="أدخل سنة الصنع"
                  value={formData.year}
                  onChange={(e) => updateField("year", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fuelType">{t('car.fuel_type')}</Label>
                <Input
                  id="fuelType"
                  placeholder="أدخل نوع الوقود مثال: بنزين"
                  value={formData.fuelType}
                  onChange={(e) => updateField("fuelType", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="enginePower">{t('car.engine_power')}</Label>
                <Input
                  id="enginePower"
                  placeholder="أدخل قوة المحرك"
                  value={formData.enginePower}
                  onChange={(e) => updateField("enginePower", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="transmission">{t('car.transmission')}</Label>
                <Select value={formData.transmission} onValueChange={(value) => updateField("transmission", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="يدوي">يدوي</SelectItem>
                    <SelectItem value="اتوماتيكي">اتوماتيكي</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuelConsumption">{t('car.fuel_consumption')}</Label>
                <Input
                  id="fuelConsumption"
                  placeholder="أدخل الاستهلاك"
                  value={formData.fuelConsumption}
                  onChange={(e) => updateField("fuelConsumption", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="doors">{t('car.doors')}</Label>
                <Select value={formData.doors} onValueChange={(value) => updateField("doors", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 أبواب</SelectItem>
                    <SelectItem value="3">3 أبواب</SelectItem>
                    <SelectItem value="4">4 أبواب</SelectItem>
                    <SelectItem value="5">5 أبواب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition">{t('form.condition')}</Label>
                <Input
                  id="condition"
                  placeholder="أدخل حالة السيارة"
                  value={formData.condition}
                  onChange={(e) => updateField("condition", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل الاستخدام */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📅 {t('car.usage_details')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstUse">{t('car.first_use')}</Label>
                <Select value={formData.firstUse} onValueChange={(value) => updateField("firstUse", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="allServicesAvailable">{t('car.all_services')}</Label>
                <Select value={formData.allServicesAvailable} onValueChange={(value) => updateField("allServicesAvailable", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="firstUseInCountry">{t('car.first_use_country')}</Label>
                <Input
                  id="firstUseInCountry"
                  placeholder="مثال: 2021 أو 03/2021 أو 10/03/2021"
                  value={formData.firstUseInCountry}
                  onChange={(e) => updateField("firstUseInCountry", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="kilometers">{t('car.kilometers')}</Label>
                <Input
                  id="kilometers"
                  placeholder="أدخل عدد الكيلومترات"
                  value={formData.kilometers}
                  onChange={(e) => updateField("kilometers", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="color">{t('form.color')}</Label>
                <Input
                  id="color"
                  placeholder={t('placeholders.enter_color')}
                  value={formData.color}
                  onChange={(e) => updateField("color", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hadAccident">{t('car.had_accident')}</Label>
                <Select value={formData.hadAccident} onValueChange={(value) => updateField("hadAccident", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="حادث بسيط">حادث بسيط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="originalPaint">{t('car.original_paint')}</Label>
                <Select value={formData.originalPaint} onValueChange={(value) => updateField("originalPaint", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أصلي بالكامل">أصلي بالكامل</SelectItem>
                    <SelectItem value="صباغة جزئية">صباغة جزئية</SelectItem>
                    <SelectItem value="صباغة كاملة">صباغة كاملة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التعديلات */}
        <ModificationsSection 
          formData={formData} 
          updateField={updateField}
          updateArrayField={updateArrayField} 
        />

        {/* التفاصيل التقنية */}
        <TechnicalDetailsSection
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
        />

        {/* حالة السيارة */}
        <CarConditionSection
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
        />

        {/* العملاء غير المرغوبين */}
        <UnwantedCustomersSection
          formData={formData}
          updateField={updateField}
        />

        {/* التجهيزات الإضافية */}
        <AdditionalEquipmentSection
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
        />

        {/* معلومات المالك */}
        <OwnerInfoSection
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
        />

        {/* سبب البيع وأوقات المعاينة */}
        <SellReasonSection
          formData={formData}
          updateField={updateField}
        />

        <div className="pt-6 border-t">
          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
            {t('actions.generate')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarForm;