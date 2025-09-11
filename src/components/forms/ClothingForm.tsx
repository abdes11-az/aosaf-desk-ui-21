import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClothingFormProps {
  data: any;
  onChange: (data: any) => void;
}

const ClothingForm = ({ data, onChange }: ClothingFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    gender: "",
    category: "",
    brand: "",
    sizes: "",
    material: "",
    colors: [] as string[],
    style: "",
    season: "",
    countryOfOrigin: "",
    condition: "",
    modifications: [] as string[],
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

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked 
      ? [...formData.colors, color]
      : formData.colors.filter(c => c !== color);
    updateData({ ...formData, colors: newColors });
  };

  const handleModificationChange = (modification: string, checked: boolean) => {
    const newModifications = checked 
      ? [...formData.modifications, modification]
      : formData.modifications.filter(m => m !== modification);
    updateData({ ...formData, modifications: newModifications });
  };

  const handleUnwantedCustomerChange = (customer: string, checked: boolean) => {
    const newUnwantedCustomers = checked 
      ? [...formData.unwantedCustomers, customer]
      : formData.unwantedCustomers.filter(c => c !== customer);
    updateData({ ...formData, unwantedCustomers: newUnwantedCustomers });
  };

  const availableColors = [
    "أسود", "أبيض", "أزرق", "أحمر", "أخضر", "أصفر", "وردي", "بنفسجي", 
    "برتقالي", "رمادي", "بني", "بيج", "كحلي", "ذهبي", "فضي"
  ];

  const availableModifications = [
    "لا توجد تعديلات",
    "تعديل الطول",
    "تضييق أو توسيع",
    "تغيير الأزرار",
    "إضافة تطريز",
    "تغيير السحاب",
    "إصلاح تمزق",
    "تغيير البطانة",
    "إضافة جيوب",
    "تعديل الياقة",
    "تغيير الأكمام",
    "تعديلات أخرى"
  ];

  const availableUnwantedCustomers = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار",
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء ومحلات الملابس",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج",
    "👗 من يريدون تجربة الملابس فقط",
    "💸 من يطلبون أسعار غير معقولة",
    "📏 من يطلبون مقاسات غير متوفرة",
    "⏰ من لا يحترمون مواعيد المعاينة"
  ];

  const availableSizes = [
    "XS", "S", "M", "L", "XL", "XXL", 
    "38", "40", "42", "44", "46", "48"
  ];

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...(formData.sizes || []), size]
      : (formData.sizes || []).filter(s => s !== size);
    updateData({ ...formData, sizes: newSizes });
  };

  return (
    <div className="space-y-6">
      {/* المعلومات الأساسية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            👕 المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('clothing.gender')}</Label>
              <Select value={formData.gender} onValueChange={(value) => updateData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">رجالي</SelectItem>
                  <SelectItem value="women">نسائي</SelectItem>
                  <SelectItem value="kids">أطفال</SelectItem>
                  <SelectItem value="unisex">للجنسين</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('clothing.category')}</Label>
              <Input
                value={formData.category}
                onChange={(e) => updateData({ ...formData, category: e.target.value })}
                placeholder={t('placeholders.additional_details')}
              />
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
              <Label>{t('clothing.available_sizes')}</Label>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={size}
                        checked={formData.sizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      />
                      <Label htmlFor={size} className="text-sm">{size}</Label>
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="customSizes">{t('clothing.other_sizes')}</Label>
                  <Input
                    id="customSizes"
                    value={formData.customSizes || ""}
                    onChange={(e) => updateData({ ...formData, customSizes: e.target.value })}
                    placeholder="أدخل مقاسات إضافية مثال: XXS, 3XL..."
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>{t('clothing.material')}</Label>
              <Input
                value={formData.material}
                onChange={(e) => updateData({ ...formData, material: e.target.value })}
                placeholder="أدخل نوع المادة مثال: قطن"
              />
            </div>

            <div>
              <Label>{t('clothing.style')}</Label>
              <Select value={formData.style} onValueChange={(value) => updateData({ ...formData, style: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">رسمي</SelectItem>
                  <SelectItem value="casual">كاجوال</SelectItem>
                  <SelectItem value="sport">رياضي</SelectItem>
                  <SelectItem value="elegant">أنيق</SelectItem>
                  <SelectItem value="vintage">كلاسيكي</SelectItem>
                  <SelectItem value="modern">عصري</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('clothing.season')}</Label>
              <Input
                value={formData.season}
                onChange={(e) => updateData({ ...formData, season: e.target.value })}
                placeholder="أدخل الموسم مثال: صيفي"
              />
            </div>

            <div>
              <Label>{t('clothing.country_of_origin')}</Label>
              <Input
                value={formData.countryOfOrigin}
                onChange={(e) => updateData({ ...formData, countryOfOrigin: e.target.value })}
                placeholder="أدخل بلد الصنع"
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

      {/* الألوان المتاحة */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🎨 الألوان المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {availableColors.map((color) => (
              <div key={color} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={color}
                  checked={formData.colors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={color} className="text-sm">{color}</Label>
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
                <SelectItem value="تغيير المقاس">تغيير المقاس</SelectItem>
                <SelectItem value="عدم الاستخدام">عدم الاستخدام</SelectItem>
                <SelectItem value="تغيير الستايل">تغيير الستايل</SelectItem>
                <SelectItem value="شراء ملابس جديدة">شراء ملابس جديدة</SelectItem>
                <SelectItem value="تنظيف الخزانة">تنظيف الخزانة</SelectItem>
                <SelectItem value="الحاجة للمال">الحاجة للمال</SelectItem>
                <SelectItem value="تغيير الوزن">تغيير الوزن</SelectItem>
                <SelectItem value="انتهاء الموسم">انتهاء الموسم</SelectItem>
                <SelectItem value="عدم الراحة">عدم الراحة</SelectItem>
                <SelectItem value="تكرار القطع">تكرار القطع</SelectItem>
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

export default ClothingForm;