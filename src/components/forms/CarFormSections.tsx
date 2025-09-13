import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormSectionProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  updateArrayField: (field: string, value: string, checked: boolean) => void;
}

export const ModificationsSection = ({ formData, updateField }: FormSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🛠️ {t('car.modifications')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="modifications">{t('car.modifications')}</Label>
          <Textarea
            id="modifications"
            placeholder="أدخل التعديلات المطلوبة..."
            value={formData.modifications}
            onChange={(e) => updateField("modifications", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export const TechnicalDetailsSection = ({ formData, updateField }: FormSectionProps) => {
  const { t } = useLanguage();
  
  return (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        ⚙️ {t('car.technical_details')}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="engineType">{t('car.engine_type')}</Label>
          <Input
            id="engineType"
            placeholder="أدخل نوع المحرك"
            value={formData.engineType}
            onChange={(e) => updateField("engineType", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="steering">{t('car.steering')}</Label>
          <Select value={formData.steering} onValueChange={(value) => updateField("steering", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('options.choose')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="المقود العادي">المقود العادي</SelectItem>
              <SelectItem value="المقود الهيدروليكي">المقود الهيدروليكي</SelectItem>
              <SelectItem value="المقود الكهربائي">المقود الكهربائي</SelectItem>
              <SelectItem value="المقود الإلكتروني">المقود الإلكتروني</SelectItem>
              <SelectItem value="المقود متعدد الوظائف">المقود متعدد الوظائف</SelectItem>
              <SelectItem value="المقود الرياضي">المقود الرياضي</SelectItem>
              <SelectItem value="المقود الذكي">المقود الذكي</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="airbags">{t('car.airbags')}</Label>
          <Select value={formData.airbags} onValueChange={(value) => updateField("airbags", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('options.choose')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="متوفرة">{t('options.available')}</SelectItem>
              <SelectItem value="غير متوفرة">{t('options.not_available')}</SelectItem>
              <SelectItem value="جزئية">جزئية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="airConditioning">{t('car.air_conditioning')}</Label>
          <Select value={formData.airConditioning} onValueChange={(value) => updateField("airConditioning", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('options.choose')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="يعمل بكفاءة">يعمل بكفاءة</SelectItem>
              <SelectItem value="يحتاج صيانة">يحتاج صيانة</SelectItem>
              <SelectItem value="لا يعمل">لا يعمل</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export const CarConditionSection = ({ formData, updateField }: FormSectionProps) => {
  const { t } = useLanguage();
  
  return (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        🔍 {t('car.condition_section')}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="wheelType">{t('car.wheel_type')}</Label>
          <Input
            id="wheelType"
            placeholder="نوع العجلات"
            value={formData.wheelType}
            onChange={(e) => updateField("wheelType", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="glass">{t('car.glass')}</Label>
          <Input
            id="glass"
            placeholder="نوع الزجاج"
            value={formData.glass}
            onChange={(e) => updateField("glass", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="interior">{t('car.interior')}</Label>
          <Input
            id="interior"
            placeholder="نوع الصالون"
            value={formData.interior}
            onChange={(e) => updateField("interior", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="speakers">{t('car.speakers')}</Label>
          <Input
            id="speakers"
            placeholder="نوع السماعات"
            value={formData.speakers}
            onChange={(e) => updateField("speakers", e.target.value)}
          />
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export const UnwantedCustomersSection = ({ formData, updateArrayField }: FormSectionProps) => {
  const { t } = useLanguage();
  
  const unwantedTypes = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار", 
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج أو الخدمة"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🚫 {t('common.unwanted_customers_label')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {unwantedTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={type}
                checked={formData.unwantedCustomers.includes(type)}
                onCheckedChange={(checked) => updateArrayField("unwantedCustomers", type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-sm font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const AdditionalEquipmentSection = ({ formData, updateArrayField }: FormSectionProps) => {
  const { t } = useLanguage();
  
  const equipment = [
    "CD/MP3/Bluetooth 🎵",
    "رادار خلفي 📡",
    "كاميرا خلفية 📷", 
    "نظام الملاحة GPS 🗺️",
    "مقاعد جلدية 🪑",
    "تكييف ❄️",
    "مثبت السرعة ⚡",
    "فتحة سقف ☀️",
    "أضواء ضباب 💡",
    "عجلات الألمنيوم ⚙️",
    "نوافذ كهربائية 🔌",
    "قفل مركزي 🔒",
    "نظام إنذار 🚨",
    "حساسات الركن 📶",
    "مقاعد مدفأة 🔥",
    "دخول بدون مفتاح 🗝️"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          ⚙️ {t('car.additional_equipment')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {equipment.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={item}
                checked={formData.additionalEquipment.includes(item)}
                onCheckedChange={(checked) => updateArrayField("additionalEquipment", item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm font-normal">
                {item}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const OwnerInfoSection = ({ formData, updateField }: FormSectionProps) => {
  const { t } = useLanguage();
  
  return (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        👤 {t('car.owner_info')}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ownerType">{t('car.owner_type')}</Label>
          <Select value={formData.ownerType} onValueChange={(value) => updateField("ownerType", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('options.choose')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="رجل">رجل</SelectItem>
              <SelectItem value="امرأة">امرأة</SelectItem>
              <SelectItem value="وسيط">وسيط</SelectItem>
              <SelectItem value="بائع السيارات">بائع السيارات</SelectItem>
              <SelectItem value="شركة">شركة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="usageDuration">{t('car.usage_duration')}</Label>
          <Input
            id="usageDuration"
            placeholder="أدخل مدة الاستخدام"
            value={formData.usageDuration}
            onChange={(e) => updateField("usageDuration", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="ownership">{t('car.ownership')}</Label>
          <Input
            id="ownership"
            placeholder="أدخل نوع الملكية"
            value={formData.ownership}
            onChange={(e) => updateField("ownership", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="documentsReady">{t('car.documents_ready')}</Label>
          <Select value={formData.documentsReady} onValueChange={(value) => updateField("documentsReady", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('options.choose')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="نعم">{t('options.yes')}</SelectItem>
              <SelectItem value="لا">{t('options.no')}</SelectItem>
              <SelectItem value="جزئياً">جزئياً</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="taxAmount">{t('car.tax_amount')}</Label>
          <Input
            id="taxAmount"
            placeholder="أدخل مبلغ الضريبة"
            value={formData.taxAmount}
            onChange={(e) => updateField("taxAmount", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="insuranceAmount">{t('car.insurance_amount')}</Label>
          <Input
            id="insuranceAmount"
            placeholder="أدخل مبلغ التأمين"
            value={formData.insuranceAmount}
            onChange={(e) => updateField("insuranceAmount", e.target.value)}
          />
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
      </div>
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
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="additionalNotes">{t('form.additional_notes')}</Label>
        <Textarea
          id="additionalNotes"
          placeholder={t('placeholders.additional_notes')}
          value={formData.additionalNotes}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          rows={4}
        />
      </div>
    </CardContent>
  </Card>
  );
};