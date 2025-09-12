import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface TabletFormProps {
  data: any;
  onChange: (data: any) => void;
}

const TabletForm = ({ data, onChange }: TabletFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    brand: "",
    customBrand: "",
    model: "",
    screenSize: "",
    screenType: "",
    processor: "",
    storage: "",
    ram: "",
    battery: "",
    operatingSystem: "",
    frontCamera: "",
    rearCamera: "",
    connectivity: "",
    modifications: [] as string[],
    accessories: [] as string[],
    colors: [] as string[],
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

  const availableColors = [
    t('colors.black'), t('colors.silver'), t('colors.gold'), t('colors.blue'), 
    t('colors.red'), t('colors.pink'), t('colors.green'), t('colors.gray'), t('colors.white')
  ];

  const availableModifications = [
    t('tablet.modifications.none'),
    t('tablet.modifications.screen'),
    t('tablet.modifications.battery'),
    t('tablet.modifications.charging_port'),
    t('tablet.modifications.speakers'),
    t('tablet.modifications.screen_protector'),
    t('tablet.modifications.back_cover'),
    t('tablet.modifications.os_update'),
    t('tablet.modifications.memory'),
    t('tablet.modifications.camera'),
    t('tablet.modifications.motherboard'),
    t('tablet.modifications.other')
  ];

  const availableAccessories = [
    t('tablet.accessories.original_charger'),
    t('tablet.accessories.usb_cable'),
    t('tablet.accessories.headphones'),
    t('tablet.accessories.digital_pen'),
    t('tablet.accessories.keyboard'),
    t('tablet.accessories.mouse'),
    t('tablet.accessories.case'),
    t('tablet.accessories.screen_protector'),
    t('tablet.accessories.stand'),
    t('tablet.accessories.car_charger'),
    t('tablet.accessories.power_bank'),
    t('tablet.accessories.memory_card'),
    t('tablet.accessories.usb_adapter'),
    t('tablet.accessories.bluetooth_speaker'),
    t('tablet.accessories.external_camera'),
    t('tablet.accessories.led_light')
  ];

  const availableUnwantedCustomers = [
    "👀 المهتمون بالسعر فقط دون نية للشراء",
    "😴 غير الجادين في اتخاذ القرار",
    "🔄 من يطلبون التبادل فقط",
    "🏢 الوسطاء والمتاجر",
    "👶 غير المؤهلين (الأطفال)",
    "💭 من لا يملكون اهتمامًا حقيقيًا بالمنتج",
    "🎮 من يريدون استخدامه للألعاب فقط",
    "📚 الطلاب الذين يبحثون عن أسعار مخفضة",
    "🔧 من يطلبون ضمانات غير معقولة",
    "⏰ من لا يحترمون مواعيد المعاينة"
  ];

  return (
    <div className="space-y-6">
      {/* المعلومات الأساسية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📱 المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>{t('tablet.screen_size')}</Label>
              <Input
                value={formData.screenSize}
                onChange={(e) => updateData({ ...formData, screenSize: e.target.value })}
                placeholder="أدخل حجم الشاشة مثال: 10.1 بوصة"
              />
            </div>

            <div>
              <Label>{t('tablet.screen_type')}</Label>
              <Select value={formData.screenType} onValueChange={(value) => updateData({ ...formData, screenType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IPS">IPS</SelectItem>
                  <SelectItem value="AMOLED">AMOLED</SelectItem>
                  <SelectItem value="LCD">LCD</SelectItem>
                  <SelectItem value="OLED">OLED</SelectItem>
                  <SelectItem value="Retina">Retina</SelectItem>
                </SelectContent>
              </Select>
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

      {/* التفاصيل التقنية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            ⚙️ {t('tablet.technical_details')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('tablet.processor')}</Label>
              <Input
                value={formData.processor}
                onChange={(e) => updateData({ ...formData, processor: e.target.value })}
                placeholder="أدخل نوع المعالج مثال: Apple M2"
              />
            </div>

            <div>
              <Label>{t('tablet.storage')}</Label>
              <Select value={formData.storage} onValueChange={(value) => updateData({ ...formData, storage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="32GB">32 جيجابايت</SelectItem>
                  <SelectItem value="64GB">64 جيجابايت</SelectItem>
                  <SelectItem value="128GB">128 جيجابايت</SelectItem>
                  <SelectItem value="256GB">256 جيجابايت</SelectItem>
                  <SelectItem value="512GB">512 جيجابايت</SelectItem>
                  <SelectItem value="1TB">1 تيرابايت</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('tablet.ram')}</Label>
              <Select value={formData.ram} onValueChange={(value) => updateData({ ...formData, ram: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2GB">2 جيجابايت</SelectItem>
                  <SelectItem value="4GB">4 جيجابايت</SelectItem>
                  <SelectItem value="6GB">6 جيجابايت</SelectItem>
                  <SelectItem value="8GB">8 جيجابايت</SelectItem>
                  <SelectItem value="12GB">12 جيجابايت</SelectItem>
                  <SelectItem value="16GB">16 جيجابايت</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('tablet.battery')}</Label>
              <Input
                value={formData.battery}
                onChange={(e) => updateData({ ...formData, battery: e.target.value })}
                placeholder="مثال: 8000"
              />
            </div>

            <div>
              <Label>{t('tablet.operating_system')}</Label>
              <Select value={formData.operatingSystem} onValueChange={(value) => updateData({ ...formData, operatingSystem: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iOS">iOS</SelectItem>
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="Windows">Windows</SelectItem>
                  <SelectItem value="iPadOS">iPadOS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t('tablet.front_camera')}</Label>
              <Input
                value={formData.frontCamera}
                onChange={(e) => updateData({ ...formData, frontCamera: e.target.value })}
                placeholder="مثال: 12 ميغابكسل"
              />
            </div>

            <div>
              <Label>{t('tablet.rear_camera')}</Label>
              <Input
                value={formData.rearCamera}
                onChange={(e) => updateData({ ...formData, rearCamera: e.target.value })}
                placeholder="مثال: 48 ميغابكسل"
              />
            </div>

            <div>
              <Label>{t('tablet.connectivity')}</Label>
              <Select value={formData.connectivity} onValueChange={(value) => updateData({ ...formData, connectivity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('options.choose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wi-Fi Only">Wi-Fi فقط</SelectItem>
                  <SelectItem value="Wi-Fi + 4G">Wi-Fi + 4G</SelectItem>
                  <SelectItem value="Wi-Fi + 5G">Wi-Fi + 5G</SelectItem>
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
                  <SelectItem value="شراء تابلت جديد">{t('sell_reasons.tablet.buy_new_tablet')}</SelectItem>
                  <SelectItem value="عدم الاستخدام">{t('sell_reasons.tablet.no_use')}</SelectItem>
                  <SelectItem value="الحاجة للمال">{t('sell_reasons.tablet.need_money')}</SelectItem>
                  <SelectItem value="شراء لابتوب بدلاً منه">{t('sell_reasons.tablet.buy_laptop')}</SelectItem>
                  <SelectItem value="تغيير في احتياجات العمل">{t('sell_reasons.tablet.work_needs_change')}</SelectItem>
                  <SelectItem value="السفر">{t('sell_reasons.tablet.travel')}</SelectItem>
                  <SelectItem value="تصغير الأجهزة">{t('sell_reasons.tablet.downsize_devices')}</SelectItem>
                  <SelectItem value="مشاكل في الجهاز">{t('sell_reasons.tablet.device_problems')}</SelectItem>
                  <SelectItem value="أسباب شخصية">{t('sell_reasons.tablet.personal_reasons')}</SelectItem>
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

export default TabletForm;