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

interface PhoneFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const PhoneForm = ({ onBack, onGenerateDescription }: PhoneFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // المعلومات الأساسية
    phoneName: "",
    color: "",
    condition: "",
    usageDuration: "",
    
    // التفاصيل التقنية
    storage: "",
    ram: "",
    screenType: "",
    operatingSystem: "",
    batteryCapacity: "",
    batteryLifeNormal: "",
    batteryLifeGaming: "",
    batteryPercentageIphone: "",
    fingerprintWorking: "",
    waterResistant: "",
    networkStatus: "",
    
    // التعديلات
    modifications: [] as string[],
    
    // الملحقات
    originalBox: "",
    originalCharger: "",
    additionalAccessories: [] as string[],
    
    // معلومات البائع
    city: "",
    sellerType: "",
    deliveryMethod: "",
    price: "",
    negotiable: "",
    contactMethod: "",
    warranty: "",
    warrantyDuration: "",
    acceptExchange: "",
    
    // سبب البيع
    sellReason: "",
    
    // أوقات المعاينة
    inspectionTimes: "",
    
    // العملاء غير المرغوبين
    unwantedCustomers: [] as string[],
    
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

  const modifications = [
    "لا توجد تعديلات",
    "تغيير الشاشة",
    "تغيير البطارية",
    "تغيير منفذ الشحن",
    "تغيير الكاميرا",
    "تجديد الجهاز",
    "تغيير السماعة",
    "تغيير الميكروفون",
    "إصلاح اللوحة الأم",
    "تحديث النظام",
    "تغييرات أخرى"
  ];

  const additionalAccessories = [
    "جراب",
    "واقي الشاشة",
    "سماعات",
    "كابل الشحن",
    "رأس الشاحن",
    "شاحن لاسلكي",
    "باور بانك",
    "شاحن سيارة",
    "حامل هاتف",
    "سماعة بلوتوث",
    "كارت ذاكرة",
    "أدوات تنظيف"
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
          <span className="text-2xl">📱</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('phone.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('form.fill_all_info')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📱 {t('phone.basic_info')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneName">{t('phone.phone_name')}</Label>
                <Input
                  id="phoneName"
                  placeholder={t('placeholders.enter_brand')}
                  value={formData.phoneName}
                  onChange={(e) => updateField("phoneName", e.target.value)}
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
                <Label htmlFor="condition">{t('form.condition')}</Label>
                <Select value={formData.condition} onValueChange={(value) => updateField("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جديد">{t('options.new')}</SelectItem>
                    <SelectItem value="مستعمل">{t('options.used')}</SelectItem>
                    <SelectItem value="مجدد">مجدد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="usageDuration">{t('phone.usage_duration')}</Label>
                <Input
                  id="usageDuration"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.usageDuration}
                  onChange={(e) => updateField("usageDuration", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التفاصيل التقنية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              ⚙️ {t('phone.technical_details')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storage">{t('phone.storage')}</Label>
                <Input
                  id="storage"
                  placeholder="مثال: 128GB"
                  value={formData.storage}
                  onChange={(e) => updateField("storage", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ram">الذاكرة العشوائية RAM</Label>
                <Input
                  id="ram"
                  placeholder="مثال: 8GB"
                  value={formData.ram}
                  onChange={(e) => updateField("ram", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="screenType">{t('phone.screen_type')}</Label>
                <Select value={formData.screenType} onValueChange={(value) => updateField("screenType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OLED">OLED</SelectItem>
                    <SelectItem value="AMOLED">AMOLED</SelectItem>
                    <SelectItem value="Super AMOLED">Super AMOLED</SelectItem>
                    <SelectItem value="LCD">LCD</SelectItem>
                    <SelectItem value="IPS">IPS</SelectItem>
                    <SelectItem value="Retina">Retina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="operatingSystem">{t('phone.operating_system')}</Label>
                <Input
                  id="operatingSystem"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.operatingSystem}
                  onChange={(e) => updateField("operatingSystem", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="batteryCapacity">{t('phone.battery_capacity')}</Label>
                <Input
                  id="batteryCapacity"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.batteryCapacity}
                  onChange={(e) => updateField("batteryCapacity", e.target.value)}
                />
              </div>
               <div>
                 <Label htmlFor="batteryLifeNormal">{t('phone.battery_life_normal')}</Label>
                 <Input
                   id="batteryLifeNormal"
                   placeholder="أدخل عمر البطارية"
                   value={formData.batteryLifeNormal}
                   onChange={(e) => updateField("batteryLifeNormal", e.target.value)}
                 />
               </div>
               <div>
                 <Label htmlFor="batteryLifeGaming">{t('phone.battery_life_gaming')}</Label>
                 <Input
                   id="batteryLifeGaming"
                   placeholder="أدخل عمر البطارية في الألعاب"
                   value={formData.batteryLifeGaming}
                   onChange={(e) => updateField("batteryLifeGaming", e.target.value)}
                 />
               </div>
               <div>
                 <Label htmlFor="batteryPercentageIphone">{t('phone.battery_percentage_iphone')}</Label>
                 <Input
                   id="batteryPercentageIphone"
                   placeholder="أدخل نسبة البطارية للآيفون"
                   value={formData.batteryPercentageIphone}
                   onChange={(e) => updateField("batteryPercentageIphone", e.target.value)}
                 />
               </div>
              <div>
                <Label htmlFor="fingerprintWorking">{t('phone.fingerprint_working')}</Label>
                <Select value={formData.fingerprintWorking} onValueChange={(value) => updateField("fingerprintWorking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="لا يوجد">لا يوجد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="waterResistant">{t('phone.water_resistant')}</Label>
                <Select value={formData.waterResistant} onValueChange={(value) => updateField("waterResistant", value)}>
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
              <div>
                <Label htmlFor="networkStatus">{t('phone.network_status')}</Label>
                <Select value={formData.networkStatus} onValueChange={(value) => updateField("networkStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ممتازة">{t('options.excellent')}</SelectItem>
                    <SelectItem value="جيدة">{t('options.good')}</SelectItem>
                    <SelectItem value="ضعيفة">ضعيفة</SelectItem>
                    <SelectItem value="لا تعمل">لا تعمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التعديلات */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🛠️ {t('phone.modifications')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="text-base font-medium">{t('phone.modifications')}:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {modifications.map((modification) => (
                <div key={modification} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={modification}
                    checked={formData.modifications.includes(modification)}
                    onCheckedChange={(checked) => updateArrayField("modifications", modification, checked as boolean)}
                  />
                  <Label htmlFor={modification} className="text-sm cursor-pointer">
                    {modification === "لا توجد تعديلات" && "✅ "}
                    {modification === "تغيير الشاشة" && "📱 "}
                    {modification === "تغيير البطارية" && "🔋 "}
                    {modification === "تغيير منفذ الشحن" && "🔌 "}
                    {modification === "تغيير الكاميرا" && "📷 "}
                    {modification === "تجديد الجهاز" && "🔧 "}
                    {modification === "تغيير السماعة" && "🔊 "}
                    {modification === "تغيير الميكروفون" && "🎤 "}
                    {modification === "إصلاح اللوحة الأم" && "⚡ "}
                    {modification === "تحديث النظام" && "💾 "}
                    {modification === "تغييرات أخرى" && "🔄 "}
                    {modification}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* الملحقات */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📦 {t('phone.accessories')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="originalBox">{t('phone.original_box')}</Label>
                <Select value={formData.originalBox} onValueChange={(value) => updateField("originalBox", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متوفرة">{t('options.available')}</SelectItem>
                    <SelectItem value="غير متوفرة">{t('options.not_available')}</SelectItem>
                    <SelectItem value="تالفة">تالفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="originalCharger">{t('phone.original_charger')}</Label>
                <Select value={formData.originalCharger} onValueChange={(value) => updateField("originalCharger", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متوفر">{t('options.available')}</SelectItem>
                    <SelectItem value="غير متوفر">{t('options.not_available')}</SelectItem>
                    <SelectItem value="تالف">تالف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">{t('phone.additional_accessories')}:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {additionalAccessories.map((accessory) => (
                  <div key={accessory} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={accessory}
                      checked={formData.additionalAccessories.includes(accessory)}
                      onCheckedChange={(checked) => updateArrayField("additionalAccessories", accessory, checked as boolean)}
                    />
                    <Label htmlFor={accessory} className="text-sm cursor-pointer">
                      {accessory === "جراب" && "📱 "}
                      {accessory === "واقي الشاشة" && "🛡️ "}
                      {accessory === "سماعات" && "🎧 "}
                      {accessory === "كابل الشحن" && "🔌 "}
                      {accessory === "رأس الشاحن" && "🔋 "}
                      {accessory === "شاحن لاسلكي" && "📡 "}
                      {accessory === "باور بانك" && "🔋 "}
                      {accessory === "شاحن سيارة" && "🚗 "}
                      {accessory === "حامل هاتف" && "📐 "}
                      {accessory === "سماعة بلوتوث" && "🔊 "}
                      {accessory === "كارت ذاكرة" && "💾 "}
                      {accessory === "أدوات تنظيف" && "🧽 "}
                      {accessory}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات البائع */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              👤 {t('common.seller_info')}
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
                <Label htmlFor="sellerType">{t('form.seller_type')}</Label>
                <Select value={formData.sellerType} onValueChange={(value) => updateField("sellerType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شخص">{t('options.person')}</SelectItem>
                    <SelectItem value="محل">{t('options.shop')}</SelectItem>
                    <SelectItem value="شركة">{t('options.company')}</SelectItem>
                    <SelectItem value="وسيط">{t('options.broker')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryMethod">{t('form.delivery_method')}</Label>
                <Select value={formData.deliveryMethod} onValueChange={(value) => updateField("deliveryMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="استلام شخصي">{t('options.personal_pickup')}</SelectItem>
                    <SelectItem value="توصيل">{t('options.delivery')}</SelectItem>
                    <SelectItem value="شحن">{t('options.shipping')}</SelectItem>
                    <SelectItem value="كلاهما">{t('options.both')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="negotiable">{t('form.negotiable')}</Label>
                <Select value={formData.negotiable} onValueChange={(value) => updateField("negotiable", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="ضمن حدود معقولة">{t('options.within_reasonable_limits')}</SelectItem>
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
              <div>
                <Label htmlFor="warranty">{t('form.warranty')}</Label>
                <Select value={formData.warranty} onValueChange={(value) => updateField("warranty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متوفر">{t('options.available')}</SelectItem>
                    <SelectItem value="غير متوفر">{t('options.not_available')}</SelectItem>
                    <SelectItem value="منتهي">{t('options.expired')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.warranty === "متوفر" && (
                <div>
                  <Label htmlFor="warrantyDuration">{t('form.warranty_duration')}</Label>
                  <Input
                    id="warrantyDuration"
                    placeholder="مثال: سنة واحدة، 6 أشهر، سنتان..."
                    value={formData.warrantyDuration || ""}
                    onChange={(e) => updateField("warrantyDuration", e.target.value)}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="acceptExchange">{t('form.accept_exchange')}</Label>
                <Select value={formData.acceptExchange} onValueChange={(value) => updateField("acceptExchange", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="حسب النوع">{t('options.by_type')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* سبب البيع */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              💭 {t('form.sell_reason')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="sellReason">{t('form.sell_reason')}</Label>
              <Select value={formData.sellReason} onValueChange={(value) => updateField("sellReason", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شراء هاتف جديد">شراء هاتف جديد</SelectItem>
                  <SelectItem value="عدم الحاجة">عدم الحاجة</SelectItem>
                  <SelectItem value="ظروف مالية">ظروف مالية</SelectItem>
                  <SelectItem value="السفر">السفر</SelectItem>
                  <SelectItem value="مشاكل في الجهاز">مشاكل في الجهاز</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* أوقات المعاينة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🕒 {t('car.inspection_times')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="inspectionTimes">{t('car.inspection_times')}</Label>
              <Select value={formData.inspectionTimes} onValueChange={(value) => updateField("inspectionTimes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="في أي وقت">في أي وقت</SelectItem>
                  <SelectItem value="أوقات العمل فقط">أوقات العمل فقط</SelectItem>
                  <SelectItem value="عطلة نهاية الأسبوع">عطلة نهاية الأسبوع</SelectItem>
                  <SelectItem value="بالاتفاق المسبق">بالاتفاق المسبق</SelectItem>
                  <SelectItem value="المساء فقط">المساء فقط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* العملاء غير المرغوبين */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🚫 {t('common.unwanted_customers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="text-base font-medium">{t('common.unwanted_customers_desc')}:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {unwantedCustomers.map((customer) => (
                <div key={customer} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={customer}
                    checked={formData.unwantedCustomers.includes(customer)}
                    onCheckedChange={(checked) => updateArrayField("unwantedCustomers", customer, checked as boolean)}
                  />
                  <Label htmlFor={customer} className="text-sm cursor-pointer">
                    {customer === "السائلين عن السعر فقط" && "🤔 "}
                    {customer === "غير الجادين" && "😴 "}
                    {customer === "طالبي التبادل فقط" && "🔄 "}
                    {customer === "الوسطاء" && "🏢 "}
                    {customer === "الأطفال" && "👶 "}
                    {customer === "غير المهتمين حقاً" && "💭 "}
                    {customer}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ملاحظات إضافية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('form.additional_notes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Textarea
                placeholder={t('placeholders.additional_notes')}
                value={formData.additionalNotes}
                onChange={(e) => updateField("additionalNotes", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* زر الإرسال */}
        <div className="pt-6 border-t">
          <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
            {t('actions.generate')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneForm;