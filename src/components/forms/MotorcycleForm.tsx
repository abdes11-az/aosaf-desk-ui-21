import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface MotorcycleFormProps {
  data: any;
  onChange: (data: any) => void;
}

const MotorcycleForm = ({ data, onChange }: MotorcycleFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    customBrand: "",
    model: "",
    year: "",
    engineCapacity: "",
    engineType: "",
    transmission: "",
    fuelType: "",
    fuelTankCapacity: "",
    fuelConsumption: "",
    maxSpeed: "",
    mileage: "",
    color: "",
    condition: "",
    modifications: [] as string[],
    accessories: [] as string[],
    description: "",
    city: "",
    sellerType: "",
    deliveryMethod: "",
    negotiable: "",
    contactMethod: "",
    warranty: "",
    acceptExchange: "",
    sellReason: "",
    unwantedCustomers: [] as string[],
    ...data
  });

  const updateData = (newData: any) => {
    setFormData(newData);
    onChange(newData);
  };

  const handleModificationChange = (modification: string, checked: boolean) => {
    const newModifications = checked 
      ? [...formData.modifications, modification]
      : formData.modifications.filter(m => m !== modification);
    updateData({ ...formData, modifications: newModifications });
  };

  const handleAccessoryChange = (accessory: string, checked: boolean) => {
    const newAccessories = checked 
      ? [...formData.accessories, accessory]
      : formData.accessories.filter(a => a !== accessory);
    updateData({ ...formData, accessories: newAccessories });
  };

  const handleUnwantedCustomerChange = (customer: string, checked: boolean) => {
    const newUnwantedCustomers = checked 
      ? [...formData.unwantedCustomers, customer]
      : formData.unwantedCustomers.filter(c => c !== customer);
    updateData({ ...formData, unwantedCustomers: newUnwantedCustomers });
  };

  const availableModifications = [
    "لا توجد تعديلات",
    "تعديل العادم",
    "تغيير المكابح",
    "تعديل التعليق",
    "تغيير الإطارات",
    "تعديل المحرك",
    "إضافة إكسسوارات",
    "تغيير المقود",
    "تعديل الإضاءة",
    "تغيير المرايا",
    "إضافة حقائب جانبية",
    "تعديلات أخرى"
  ];

  const availableAccessories = [
    "خوذة",
    "جاكيت حماية",
    "قفازات",
    "حذاء واقي",
    "حقائب جانبية",
    "صندوق خلفي",
    "واقي رياح",
    "مرايا إضافية",
    "أضواء إضافية",
    "شاحن هاتف",
    "حامل هاتف",
    "غطاء دراجة",
    "أدوات صيانة",
    "قفل دراجة",
    "إنذار",
    "كاميرا تسجيل"
  ];

  const availableUnwantedCustomers = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار",
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء ومعارض الدراجات",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج",
    "🏍️ من يريدون تجربة القيادة فقط",
    "💸 من يطلبون أسعار غير معقولة",
    "🔧 من يطلبون ضمانات مبالغ فيها",
    "⏰ من لا يحترمون مواعيد المعاينة",
    "🚫 من لا يملكون رخصة قيادة",
    "⚡ من يبحثون عن دراجات للسباق فقط"
  ];

  return (
    <div className="space-y-6">
      {/* المعلومات الأساسية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🏍️ المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('motorcycle.motorcycle_type')}</Label>
              <Select value={formData.type} onValueChange={(value) => updateData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sport">Sport (رياضية)</SelectItem>
                  <SelectItem value="Cruiser">Cruiser (تجوال)</SelectItem>
                  <SelectItem value="Touring">Touring (سياحية)</SelectItem>
                  <SelectItem value="Scooter">Scooter (سكوتر)</SelectItem>
                  <SelectItem value="Off-road">Off-road (طرق وعرة)</SelectItem>
                  <SelectItem value="Naked">Naked (عارية)</SelectItem>
                  <SelectItem value="Adventure">Adventure (مغامرة)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('form.brand')}</Label>
              <Input
                value={formData.brand}
                onChange={(e) => updateData({ ...formData, brand: e.target.value })}
                placeholder={t('placeholders.enter_brand')}
              />
            </div>

            <div>
              <Label>{t('form.model')}</Label>
              <Input
                value={formData.model}
                onChange={(e) => updateData({ ...formData, model: e.target.value })}
                placeholder={t('placeholders.enter_model')}
              />
            </div>

            <div>
              <Label>{t('motorcycle.year')}</Label>
              <Input
                value={formData.year}
                onChange={(e) => updateData({ ...formData, year: e.target.value })}
                placeholder="مثال: 2023"
              />
            </div>

            <div>
              <Label>{t('form.color')}</Label>
              <Input
                value={formData.color}
                onChange={(e) => updateData({ ...formData, color: e.target.value })}
                placeholder={t('placeholders.enter_color')}
              />
            </div>

            <div>
              <Label>{t('motorcycle.mileage')}</Label>
              <Input
                value={formData.mileage}
                onChange={(e) => updateData({ ...formData, mileage: e.target.value })}
                placeholder="مثال: 15000"
              />
            </div>

            <div>
              <Label>{t('form.condition')}</Label>
              <Select value={formData.condition} onValueChange={(value) => updateData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t('options.new')}</SelectItem>
                  <SelectItem value="like-new">كالجديد</SelectItem>
                  <SelectItem value="excellent">{t('options.excellent')}</SelectItem>
                  <SelectItem value="good">{t('options.good')}</SelectItem>
                  <SelectItem value="fair">{t('options.fair')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>سعة المحرك</Label>
              <Input
                value={formData.engineCapacity}
                onChange={(e) => updateData({ ...formData, engineCapacity: e.target.value })}
                placeholder="أدخل سعة المحرك مثال: 250cc"
              />
            </div>

            <div>
              <Label>نوع المحرك</Label>
              <Input
                value={formData.engineType}
                onChange={(e) => updateData({ ...formData, engineType: e.target.value })}
                placeholder="أدخل نوع المحرك مثال: 4-stroke"
              />
            </div>

            <div>
              <Label>ناقل الحركة</Label>
              <Select value={formData.transmission} onValueChange={(value) => updateData({ ...formData, transmission: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر ناقل الحركة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">يدوي</SelectItem>
                  <SelectItem value="automatic">أوتوماتيك</SelectItem>
                  <SelectItem value="semi-automatic">شبه أوتوماتيك</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>نوع الوقود</Label>
              <Input
                value={formData.fuelType}
                onChange={(e) => updateData({ ...formData, fuelType: e.target.value })}
                placeholder="أدخل نوع الوقود مثال: بنزين"
              />
            </div>

            <div>
              <Label>سعة خزان الوقود (لتر)</Label>
              <Input
                value={formData.fuelTankCapacity}
                onChange={(e) => updateData({ ...formData, fuelTankCapacity: e.target.value })}
                placeholder="مثال: 15"
              />
            </div>

            <div>
              <Label>استهلاك الوقود (كم/لتر)</Label>
              <Input
                value={formData.fuelConsumption}
                onChange={(e) => updateData({ ...formData, fuelConsumption: e.target.value })}
                placeholder="مثال: 30"
              />
            </div>

            <div>
              <Label>السرعة القصوى (كم/ساعة)</Label>
              <Input
                value={formData.maxSpeed}
                onChange={(e) => updateData({ ...formData, maxSpeed: e.target.value })}
                placeholder="مثال: 180"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التعديلات */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🛠️ التعديلات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {availableModifications.map((modification) => (
              <div key={modification} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={modification}
                  checked={formData.modifications.includes(modification)}
                  onCheckedChange={(checked) => handleModificationChange(modification, checked as boolean)}
                />
                <Label htmlFor={modification} className="text-sm">{modification}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* الملحقات */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📦 الملحقات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {availableAccessories.map((accessory) => (
              <div key={accessory} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={accessory}
                  checked={formData.accessories.includes(accessory)}
                  onCheckedChange={(checked) => handleAccessoryChange(accessory, checked as boolean)}
                />
                <Label htmlFor={accessory} className="text-sm">{accessory}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* سبب البيع */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            💭 سبب البيع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>سبب البيع</Label>
            <Select value={formData.sellReason} onValueChange={(value) => updateData({ ...formData, sellReason: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر سبب البيع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="شراء دراجة نارية جديدة">شراء دراجة نارية جديدة</SelectItem>
                <SelectItem value="شراء سيارة">شراء سيارة</SelectItem>
                <SelectItem value="عدم الاستخدام">عدم الاستخدام</SelectItem>
                <SelectItem value="الحاجة للمال">الحاجة للمال</SelectItem>
                <SelectItem value="السفر للخارج">السفر للخارج</SelectItem>
                <SelectItem value="مشاكل في الصيانة">مشاكل في الصيانة</SelectItem>
                <SelectItem value="تغيير نمط الحياة">تغيير نمط الحياة</SelectItem>
                <SelectItem value="مشاكل صحية">مشاكل صحية</SelectItem>
                <SelectItem value="قوانين المرور">قوانين المرور</SelectItem>
                <SelectItem value="ضيق المساحة">ضيق المساحة</SelectItem>
                <SelectItem value="أسباب عائلية">أسباب عائلية</SelectItem>
                <SelectItem value="أسباب شخصية">أسباب شخصية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* العملاء غير المرغوب فيهم */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🚫 العملاء غير المرغوب فيهم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-base font-medium">من لا تريد التعامل معه؟:</Label>
          <div className="grid grid-cols-1 gap-2 mt-3">
            {availableUnwantedCustomers.map((customer) => (
              <div key={customer} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={customer}
                  checked={formData.unwantedCustomers.includes(customer)}
                  onCheckedChange={(checked) => handleUnwantedCustomerChange(customer, checked as boolean)}
                />
                <Label htmlFor={customer} className="text-sm">{customer}</Label>
              </div>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateData({ ...formData, city: e.target.value })}
                placeholder="أدخل اسم المدينة"
              />
            </div>
            <div>
              <Label htmlFor="sellerType">نوع البائع</Label>
              <Select value={formData.sellerType} onValueChange={(value) => updateData({ ...formData, sellerType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شخص">شخص</SelectItem>
                  <SelectItem value="محل">محل</SelectItem>
                  <SelectItem value="شركة">شركة</SelectItem>
                  <SelectItem value="وسيط">وسيط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryMethod">طريقة التسليم</Label>
              <Select value={formData.deliveryMethod} onValueChange={(value) => updateData({ ...formData, deliveryMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="استلام شخصي">استلام شخصي</SelectItem>
                  <SelectItem value="توصيل">توصيل</SelectItem>
                  <SelectItem value="شحن">شحن</SelectItem>
                  <SelectItem value="كلاهما">كلاهما</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">السعر</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => updateData({ ...formData, price: e.target.value })}
                placeholder="أدخل السعر"
              />
            </div>
            <div>
              <Label htmlFor="negotiable">السعر قابل للتفاوض</Label>
              <Select value={formData.negotiable} onValueChange={(value) => updateData({ ...formData, negotiable: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
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
              <Input
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => updateData({ ...formData, contactMethod: e.target.value })}
                placeholder="رقم الهاتف أو واتساب..."
              />
            </div>
            <div>
              <Label htmlFor="warranty">الضمان</Label>
              <Select value={formData.warranty} onValueChange={(value) => updateData({ ...formData, warranty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متوفر">متوفر</SelectItem>
                  <SelectItem value="غير متوفر">غير متوفر</SelectItem>
                  <SelectItem value="منتهي">منتهي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.warranty === "متوفر" && (
              <div>
                <Label htmlFor="warrantyDuration">مدة الضمان</Label>
                <Input
                  id="warrantyDuration"
                  value={formData.warrantyDuration || ""}
                  onChange={(e) => updateData({ ...formData, warrantyDuration: e.target.value })}
                  placeholder="مثال: سنة واحدة، 6 أشهر، سنتان..."
                />
              </div>
            )}
            <div>
              <Label htmlFor="acceptExchange">قبول التبادل</Label>
              <Select value={formData.acceptExchange} onValueChange={(value) => updateData({ ...formData, acceptExchange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                  <SelectItem value="حسب النوع">حسب النوع</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ملاحظات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📝 ملاحظات إضافية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>وصف إضافي</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateData({ ...formData, description: e.target.value })}
              placeholder="أضف أي تفاصيل إضافية..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotorcycleForm;