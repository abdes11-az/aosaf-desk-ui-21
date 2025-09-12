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
    t('colors.black'), t('colors.white'), t('colors.blue'), t('colors.red'), 
    t('colors.green'), t('colors.yellow'), t('colors.pink'), t('colors.purple'), 
    t('colors.orange'), t('colors.gray'), t('colors.brown'), t('colors.beige'), 
    t('colors.navy'), t('colors.gold'), t('colors.silver')
  ];

  const availableModifications = [
    t('clothing.modifications.none'),
    t('clothing.modifications.length'),
    t('clothing.modifications.resize'),
    t('clothing.modifications.buttons'),
    t('clothing.modifications.embroidery'),
    t('clothing.modifications.zipper'),
    t('clothing.modifications.tear_repair'),
    t('clothing.modifications.lining'),
    t('clothing.modifications.pockets'),
    t('clothing.modifications.collar'),
    t('clothing.modifications.sleeves'),
    t('clothing.modifications.other')
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
                  <SelectItem value="men">{t('clothing.gender_options.men')}</SelectItem>
                  <SelectItem value="women">{t('clothing.gender_options.women')}</SelectItem>
                  <SelectItem value="kids">{t('clothing.gender_options.kids')}</SelectItem>
                  <SelectItem value="unisex">{t('clothing.gender_options.unisex')}</SelectItem>
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
                  <SelectItem value="formal">{t('clothing.style_options.formal')}</SelectItem>
                  <SelectItem value="casual">{t('clothing.style_options.casual')}</SelectItem>
                  <SelectItem value="sport">{t('clothing.style_options.sport')}</SelectItem>
                  <SelectItem value="elegant">{t('clothing.style_options.elegant')}</SelectItem>
                  <SelectItem value="vintage">{t('clothing.style_options.vintage')}</SelectItem>
                  <SelectItem value="modern">{t('clothing.style_options.modern')}</SelectItem>
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
                  <SelectItem value="like-new">{t('options.like_new')}</SelectItem>
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
            💭 {t('form.sell_reason')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>{t('form.sell_reason')}</Label>
            <Select value={formData.sellReason} onValueChange={(value) => updateData({ ...formData, sellReason: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('placeholders.choose_sell_reason')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="تغيير المقاس">{t('sell_reasons.clothing.size_change')}</SelectItem>
                <SelectItem value="عدم الاستخدام">{t('sell_reasons.clothing.no_use')}</SelectItem>
                <SelectItem value="تغيير الستايل">{t('sell_reasons.clothing.style_change')}</SelectItem>
                <SelectItem value="شراء ملابس جديدة">{t('sell_reasons.clothing.buy_new_clothes')}</SelectItem>
                <SelectItem value="تنظيف الخزانة">{t('sell_reasons.clothing.closet_cleanup')}</SelectItem>
                <SelectItem value="الحاجة للمال">{t('sell_reasons.clothing.need_money')}</SelectItem>
                <SelectItem value="تغيير الوزن">{t('sell_reasons.clothing.weight_change')}</SelectItem>
                <SelectItem value="انتهاء الموسم">{t('sell_reasons.clothing.season_end')}</SelectItem>
                <SelectItem value="عدم الراحة">{t('sell_reasons.clothing.not_comfortable')}</SelectItem>
                <SelectItem value="تكرار القطع">{t('sell_reasons.clothing.duplicate_items')}</SelectItem>
                <SelectItem value="أسباب شخصية">{t('sell_reasons.clothing.personal_reasons')}</SelectItem>
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
            👤 {t('common.seller_info')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">{t('description.city')}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateData({ ...formData, city: e.target.value })}
                placeholder={t('placeholders.enter_city')}
              />
            </div>
            <div>
              <Label htmlFor="sellerType">{t('description.seller_type')}</Label>
              <Select value={formData.sellerType} onValueChange={(value) => updateData({ ...formData, sellerType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.choose')} />
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
              <Label htmlFor="deliveryMethod">{t('description.delivery_method')}</Label>
              <Select value={formData.deliveryMethod} onValueChange={(value) => updateData({ ...formData, deliveryMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.choose')} />
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
                value={formData.price}
                onChange={(e) => updateData({ ...formData, price: e.target.value })}
                placeholder={t('placeholders.enter_price')}
              />
            </div>
            <div>
              <Label htmlFor="negotiable">{t('form.negotiable')}</Label>
              <Select value={formData.negotiable} onValueChange={(value) => updateData({ ...formData, negotiable: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                  <SelectItem value="لا">{t('options.no')}</SelectItem>
                  <SelectItem value="ضمن حدود معقولة">{t('options.within_reasonable_limits')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contactMethod">{t('description.contact_method')}</Label>
              <Input
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => updateData({ ...formData, contactMethod: e.target.value })}
                placeholder={t('placeholders.phone_whatsapp')}
              />
            </div>
            <div>
              <Label htmlFor="warranty">{t('description.warranty')}</Label>
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