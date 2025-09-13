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
import { useLanguage } from "@/contexts/LanguageContext";

interface RealEstateFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const RealEstateForm = ({ onBack, onGenerateDescription }: RealEstateFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // الغرض من العقار
    purpose: "",
    
    // المعلومات الأساسية
    propertyType: "",
    city: "",
    district: "",
    area: "",
    floors: "",
    currentFloor: "",
    clientType: "",
    
    // توزيع البيوت
    bedrooms: "",
    livingRooms: "",
    bathrooms: "",
    kitchens: "",
    hasBalcony: "",
    hasRoof: "",
    
    // المرافق والخدمات
    hasElevator: "",
    hasParking: "",
    isFurnished: "",
    nearbyServices: [] as string[],
    
    // السعر والتواصل
    price: "",
    isNegotiable: "",
    readyToMove: "",
    contactMethod: "",
    
    // أوقات المعاينة
    inspectionTimes: "",
    
    // العملاء غير المرغوبين
    unwantedCustomers: [] as string[],
    
    // سبب البيع
    sellReason: "",
    
    // فكرة عن الجيران والمكان
    neighborhoodType: "",
    neighborsType: "",
    noiseLevel: "",
    safetyLevel: "",
    
    // ملاحظات إضافية
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

  const nearbyServices = [
    "مدارس",
    "مستشفيات",
    "مراكز تسوق",
    "مواصلات عامة",
    "مساجد",
    "حدائق",
    "مطاعم",
    "صيدليات",
    "بنوك",
    "محطات وقود",
    "صالات رياضية",
    "مقاهي"
  ];

  const unwantedCustomers = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار",
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج أو الخدمة"
  ];

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
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">تفاصيل العقار</h2>
            <p className="text-muted-foreground text-sm">املأ جميع المعلومات لإنشاء وصف شامل</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* الغرض من العقار */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🎯 {t('realestate.purpose')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="purpose">{t('realestate.purpose')}</Label>
              <Select value={formData.purpose} onValueChange={(value) => updateField("purpose", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="للبيع">للبيع</SelectItem>
                  <SelectItem value="للإيجار">للإيجار</SelectItem>
                  <SelectItem value="للاستثمار">للاستثمار</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🧾 {t('realestate.basic_info')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">{t('realestate.property_type')}</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateField("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شقة">شقة</SelectItem>
                    <SelectItem value="فيلا">فيلا</SelectItem>
                    <SelectItem value="دور">دور</SelectItem>
                    <SelectItem value="استراحة">استراحة</SelectItem>
                    <SelectItem value="مكتب">مكتب</SelectItem>
                    <SelectItem value="محل تجاري">محل تجاري</SelectItem>
                    <SelectItem value="مستودع">مستودع</SelectItem>
                    <SelectItem value="أرض">أرض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="district">{t('realestate.district')}</Label>
                <Input
                  id="district"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.district}
                  onChange={(e) => updateField("district", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="area">{t('realestate.area')}</Label>
                <Input
                  id="area"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.area}
                  onChange={(e) => updateField("area", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="floors">{t('realestate.floors')}</Label>
                <Input
                  id="floors"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.floors}
                  onChange={(e) => updateField("floors", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currentFloor">{t('realestate.current_floor')}</Label>
                <Input
                  id="currentFloor"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.currentFloor}
                  onChange={(e) => updateField("currentFloor", e.target.value)}
                />
              </div>
               <div>
                 <Label htmlFor="clientType">{t('realestate.client_type')}</Label>
                <Input
                  id="clientType"
                  placeholder={t('placeholders.enter_client_type')}
                  value={formData.clientType}
                  onChange={(e) => updateField("clientType", e.target.value)}
                />
               </div>
            </div>
          </CardContent>
        </Card>

        {/* توزيع البيوت */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🛏️ {t('realestate.room_distribution')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms">{t('realestate.bedrooms')}</Label>
                <Input
                  id="bedrooms"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.bedrooms}
                  onChange={(e) => updateField("bedrooms", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="livingRooms">{t('realestate.living_rooms')}</Label>
                <Input
                  id="livingRooms"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.livingRooms}
                  onChange={(e) => updateField("livingRooms", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">{t('realestate.bathrooms')}</Label>
                <Input
                  id="bathrooms"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.bathrooms}
                  onChange={(e) => updateField("bathrooms", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="kitchens">{t('realestate.kitchens')}</Label>
                <Input
                  id="kitchens"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.kitchens}
                  onChange={(e) => updateField("kitchens", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hasBalcony">{t('realestate.has_balcony')}</Label>
                <Select value={formData.hasBalcony} onValueChange={(value) => updateField("hasBalcony", value)}>
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
                <Label htmlFor="hasRoof">{t('realestate.has_roof')}</Label>
                <Select value={formData.hasRoof} onValueChange={(value) => updateField("hasRoof", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* المرافق والخدمات */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏢 {t('realestate.facilities')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hasElevator">{t('realestate.has_elevator')}</Label>
                <Select value={formData.hasElevator} onValueChange={(value) => updateField("hasElevator", value)}>
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
                <Label htmlFor="hasParking">{t('realestate.has_parking')}</Label>
                <Select value={formData.hasParking} onValueChange={(value) => updateField("hasParking", value)}>
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
                <Label htmlFor="isFurnished">{t('realestate.is_furnished')}</Label>
                <Select value={formData.isFurnished} onValueChange={(value) => updateField("isFurnished", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="جزئياً">{t('options.partially')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">{t('realestate.nearby_services')}:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {nearbyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={`service-${index}`}
                      checked={formData.nearbyServices.includes(service)}
                      onCheckedChange={(checked) => updateArrayField("nearbyServices", service, !!checked)}
                    />
                    <Label htmlFor={`service-${index}`} className="text-sm">
                      {service === "مدارس" && "🏫"} 
                      {service === "مستشفيات" && "🏥"} 
                      {service === "مراكز تسوق" && "🛒"} 
                      {service === "مواصلات عامة" && "🚌"} 
                      {service === "مساجد" && "🕌"} 
                      {service === "حدائق" && "🌳"} 
                      {service === "مطاعم" && "🍽️"} 
                      {service === "صيدليات" && "💊"} 
                      {service === "بنوك" && "🏦"} 
                      {service === "محطات وقود" && "⛽"} 
                      {service === "صالات رياضية" && "💪"} 
                      {service === "مقاهي" && "☕"} 
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* السعر والتواصل */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              💰 {t('realestate.price_contact')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{t('form.price')}</Label>
                <Input
                  id="price"
                  placeholder={t('placeholders.enter_price')}
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="isNegotiable">{t('realestate.is_negotiable')}</Label>
                <Select value={formData.isNegotiable} onValueChange={(value) => updateField("isNegotiable", value)}>
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
                <Label htmlFor="readyToMove">{t('realestate.ready_to_move')}</Label>
                <Select value={formData.readyToMove} onValueChange={(value) => updateField("readyToMove", value)}>
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
                <Label htmlFor="contactMethod">{t('form.contact_method')}</Label>
                <Input
                  id="contactMethod"
                  placeholder={t('placeholders.phone_whatsapp')}
                  value={formData.contactMethod}
                  onChange={(e) => updateField("contactMethod", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* أوقات المعاينة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🕒 أوقات المعاينة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="inspectionTimes">أوقات المعاينة</Label>
              <Select value={formData.inspectionTimes} onValueChange={(value) => updateField("inspectionTimes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="في أي وقت">في أي وقت</SelectItem>
                  <SelectItem value="صباحاً فقط">صباحاً فقط</SelectItem>
                  <SelectItem value="مساءً فقط">مساءً فقط</SelectItem>
                  <SelectItem value="نهاية الأسبوع">نهاية الأسبوع</SelectItem>
                  <SelectItem value="بموعد مسبق">بموعد مسبق</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* قسم خاص بالبيع - سبب البيع */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📝 {t('realestate.sell_section')}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {t('realestate.sell_section_desc')}
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="sellReason">{t('form.sell_reason')}</Label>
              <Textarea
                id="sellReason"
                placeholder="أدخل سبب البيع..."
                value={formData.sellReason}
                onChange={(e) => updateField("sellReason", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* فكرة عن الجيران والمكان */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏘️ {t('realestate.neighborhood_info')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="neighborhoodType">{t('realestate.neighborhood_type')} 🏠</Label>
                <Select value={formData.neighborhoodType} onValueChange={(value) => updateField("neighborhoodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سكني">سكني</SelectItem>
                    <SelectItem value="تجاري">تجاري</SelectItem>
                    <SelectItem value="صناعي">صناعي</SelectItem>
                    <SelectItem value="مختلط">مختلط</SelectItem>
                    <SelectItem value="ريفي">ريفي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="neighborsType">{t('realestate.neighbors_type')} 👨‍👩‍👦</Label>
                <Select value={formData.neighborsType} onValueChange={(value) => updateField("neighborsType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عائلات">عائلات</SelectItem>
                    <SelectItem value="عزاب">عزاب</SelectItem>
                    <SelectItem value="طلاب">طلاب</SelectItem>
                    <SelectItem value="مغتربون">مغتربون</SelectItem>
                    <SelectItem value="متنوع">متنوع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="noiseLevel">{t('realestate.noise_level')} 🔊</Label>
                <Select value={formData.noiseLevel} onValueChange={(value) => updateField("noiseLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="هادئ جدًا">هادئ جدًا</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="صاخب">صاخب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="safetyLevel">{t('realestate.safety_level')} 🛡️</Label>
                <Select value={formData.safetyLevel} onValueChange={(value) => updateField("safetyLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مرتفع">مرتفع</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="منخفض">منخفض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* العملاء غير المرغوبين */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🚫 {t('common.unwanted_customers_label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="unwantedCustomers">{t('common.unwanted_customers_desc')}</Label>
              <Textarea
                id="unwantedCustomers"
                placeholder="أدخل أنواع العملاء غير المرغوب فيهم..."
                value={formData.unwantedCustomers}
                onChange={(e) => updateField("unwantedCustomers", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* ملاحظات إضافية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              💭 {t('form.additional_notes')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Textarea
                placeholder={t('placeholders.additional_notes')}
                value={formData.additionalNotes}
                onChange={(e) => updateField("additionalNotes", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="pt-6 border-t">
          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
            {t('actions.generate')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateForm;