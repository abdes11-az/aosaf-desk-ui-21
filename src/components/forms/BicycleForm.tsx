import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BicycleFormProps {
  data: any;
  onChange: (data: any) => void;
}

const BicycleForm = ({ data, onChange }: BicycleFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    customBrand: "",
    model: "",
    frameSize: "",
    material: "",
    gearSystem: "",
    brakeType: "",
    modifications: [] as string[],
    accessories: [] as string[],
    weight: "",
    wheelSize: "",
    color: "",
    condition: "",
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
    "تغيير العجلات",
    "تغيير المكابح",
    "تغيير نظام السرعات",
    "تغيير المقود",
    "تغيير السرج",
    "إضافة إضاءة",
    "إضافة جرس",
    "تغيير السلسلة",
    "إضافة حامل زجاجة",
    "تغيير الإطارات",
    "تعديلات أخرى"
  ];

  const availableAccessories = [
    "خوذة",
    "أضواء أمامية",
    "أضواء خلفية",
    "جرس",
    "حامل زجاجة ماء",
    "حقيبة خلفية",
    "حقيبة أمامية",
    "مضخة هواء",
    "أدوات إصلاح",
    "قفل دراجة",
    "مرآة",
    "واقي طين",
    "حامل هاتف",
    "كمبيوتر دراجة",
    "مقعد إضافي",
    "عجلات تدريب"
  ];

  const availableUnwantedCustomers = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار",
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء ومحلات الدراجات",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج",
    "🚴‍♂️ من يريدون تجربة الدراجة فقط",
    "💸 من يطلبون أسعار غير معقولة",
    "🔧 من يطلبون ضمانات مبالغ فيها",
    "⏰ من لا يحترمون مواعيد المعاينة"
  ];

  return (
    <div className="space-y-6">
      {/* المعلومات الأساسية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🚲 المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('bicycle.bicycle_type')}</Label>
              <Select value={formData.type} onValueChange={(value) => updateData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mountain">دراجة جبلية</SelectItem>
                  <SelectItem value="road">دراجة طريق</SelectItem>
                  <SelectItem value="hybrid">دراجة هجين</SelectItem>
                  <SelectItem value="electric">دراجة كهربائية</SelectItem>
                  <SelectItem value="bmx">دراجة BMX</SelectItem>
                  <SelectItem value="city">دراجة مدينة</SelectItem>
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
              <Label>{t('form.color')}</Label>
              <Input
                value={formData.color}
                onChange={(e) => updateData({ ...formData, color: e.target.value })}
                placeholder={t('placeholders.enter_color')}
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
              <Label>حجم الإطار</Label>
              <Input
                value={formData.frameSize}
                onChange={(e) => updateData({ ...formData, frameSize: e.target.value })}
                placeholder="أدخل حجم الإطار مثال: M أو 18 بوصة"
              />
            </div>

            <div>
              <Label>مادة الإطار</Label>
              <Input
                value={formData.material}
                onChange={(e) => updateData({ ...formData, material: e.target.value })}
                placeholder="أدخل مادة الإطار مثال: ألومنيوم"
              />
            </div>

            <div>
              <Label>نظام السرعات</Label>
              <Select value={formData.gearSystem} onValueChange={(value) => updateData({ ...formData, gearSystem: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نظام السرعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">سرعة واحدة</SelectItem>
                  <SelectItem value="7">7 سرعات</SelectItem>
                  <SelectItem value="14">14 سرعة</SelectItem>
                  <SelectItem value="21">21 سرعة</SelectItem>
                  <SelectItem value="24">24 سرعة</SelectItem>
                  <SelectItem value="27">27 سرعة</SelectItem>
                  <SelectItem value="30">30 سرعة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>نوع المكابح</Label>
              <Input
                value={formData.brakeType}
                onChange={(e) => updateData({ ...formData, brakeType: e.target.value })}
                placeholder="أدخل نوع المكابح مثال: قرصية"
              />
            </div>

            <div>
              <Label>الوزن (كغ)</Label>
              <Input
                value={formData.weight}
                onChange={(e) => updateData({ ...formData, weight: e.target.value })}
                placeholder="مثال: 12.5"
              />
            </div>

            <div>
              <Label>حجم العجلات</Label>
              <Input
                value={formData.wheelSize}
                onChange={(e) => updateData({ ...formData, wheelSize: e.target.value })}
                placeholder="أدخل حجم العجلات مثال: 26 بوصة"
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
                <SelectItem value="شراء دراجة جديدة">شراء دراجة جديدة</SelectItem>
                <SelectItem value="عدم الاستخدام">عدم الاستخدام</SelectItem>
                <SelectItem value="تغيير نمط الحياة">تغيير نمط الحياة</SelectItem>
                <SelectItem value="الانتقال لمكان آخر">الانتقال لمكان آخر</SelectItem>
                <SelectItem value="الحاجة للمال">الحاجة للمال</SelectItem>
                <SelectItem value="مشاكل صحية">مشاكل صحية</SelectItem>
                <SelectItem value="شراء سيارة">شراء سيارة</SelectItem>
                <SelectItem value="تغيير الهواية">تغيير الهواية</SelectItem>
                <SelectItem value="ضيق المساحة">ضيق المساحة</SelectItem>
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

export default BicycleForm;