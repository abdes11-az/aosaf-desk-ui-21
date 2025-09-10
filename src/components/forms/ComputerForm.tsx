import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface ComputerFormData {
  // Basic Info
  brand: string;
  model: string;
  type: string;
  color: string;
  condition: string;
  
  // Technical Details
  processor: string;
  ram: string;
  storage: string;
  screen_size: string;
  graphics_card: string;
  operating_system: string;
  battery_life: string;
  ports: string;
  connectivity: string;
  webcam: string;
  keyboard_layout: string;
  
  // Modifications & Accessories
  modifications: string;
  accessories: string;
  available_colors: string;
  
  // Seller Information
  price: string;
  city: string;
  seller_type: string;
  delivery_method: string;
  contact_method: string;
  warranty: string;
  warranty_duration: string;
  accept_exchange: string;
  negotiable: string;
  sell_reason: string;
  unwanted_customers: string;
  additional_notes: string;
}

interface ComputerFormProps {
  onSubmit: (data: ComputerFormData) => void;
}

export const ComputerForm: React.FC<ComputerFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<ComputerFormData>({
    brand: "",
    model: "",
    type: "",
    color: "",
    condition: "",
    processor: "",
    ram: "",
    storage: "",
    screen_size: "",
    graphics_card: "",
    operating_system: "",
    battery_life: "",
    ports: "",
    connectivity: "",
    webcam: "",
    keyboard_layout: "",
    modifications: "",
    accessories: "",
    available_colors: "",
    price: "",
    city: "",
    seller_type: "",
    delivery_method: "",
    contact_method: "",
    warranty: "",
    warranty_duration: "",
    accept_exchange: "",
    negotiable: "",
    sell_reason: "",
    unwanted_customers: "",
    additional_notes: ""
  });

  const handleInputChange = (field: keyof ComputerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="computer-form">
      <Card>
        <CardHeader>
          <CardTitle>{t('computer.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {/* Basic Information */}
            <AccordionItem value="basic-info">
              <AccordionTrigger>{t('computer.basic_info')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">{t('form.brand')}</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder={t('placeholders.enter_brand')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">{t('form.model')}</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder={t('placeholders.enter_model')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">{t('computer.type')}</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laptop">لابتوب</SelectItem>
                        <SelectItem value="desktop">ديسكتوب</SelectItem>
                        <SelectItem value="all-in-one">الكل في واحد</SelectItem>
                        <SelectItem value="mini-pc">مين بي سي</SelectItem>
                        <SelectItem value="workstation">وورك ستيشن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">{t('form.color')}</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      placeholder={t('placeholders.enter_color')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="condition">{t('form.condition')}</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{t('options.new')}</SelectItem>
                        <SelectItem value="like_new">{t('options.like_new')}</SelectItem>
                        <SelectItem value="excellent">{t('options.excellent')}</SelectItem>
                        <SelectItem value="good">{t('options.good')}</SelectItem>
                        <SelectItem value="fair">{t('options.fair')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Technical Details */}
            <AccordionItem value="technical">
              <AccordionTrigger>{t('computer.technical_details')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="processor">{t('computer.processor')}</Label>
                    <Input
                      id="processor"
                      value={formData.processor}
                      onChange={(e) => handleInputChange('processor', e.target.value)}
                      placeholder="Intel Core i7, AMD Ryzen 5..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="ram">{t('computer.ram')}</Label>
                    <Select value={formData.ram} onValueChange={(value) => handleInputChange('ram', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4gb">4 GB</SelectItem>
                        <SelectItem value="8gb">8 GB</SelectItem>
                        <SelectItem value="16gb">16 GB</SelectItem>
                        <SelectItem value="32gb">32 GB</SelectItem>
                        <SelectItem value="64gb">64 GB</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="storage">{t('computer.storage')}</Label>
                    <Input
                      id="storage"
                      value={formData.storage}
                      onChange={(e) => handleInputChange('storage', e.target.value)}
                      placeholder="256GB SSD, 1TB HDD..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="screen_size">{t('computer.screen_size')}</Label>
                    <Input
                      id="screen_size"
                      value={formData.screen_size}
                      onChange={(e) => handleInputChange('screen_size', e.target.value)}
                      placeholder="13.3 بوصة، 15.6 بوصة..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="graphics_card">{t('computer.graphics_card')}</Label>
                    <Input
                      id="graphics_card"
                      value={formData.graphics_card}
                      onChange={(e) => handleInputChange('graphics_card', e.target.value)}
                      placeholder="NVIDIA GTX 1660, Intel UHD..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="operating_system">{t('computer.operating_system')}</Label>
                    <Select value={formData.operating_system} onValueChange={(value) => handleInputChange('operating_system', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows-11">Windows 11</SelectItem>
                        <SelectItem value="windows-10">Windows 10</SelectItem>
                        <SelectItem value="macos">macOS</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="chrome-os">Chrome OS</SelectItem>
                        <SelectItem value="dos">DOS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="battery_life">{t('computer.battery_life')}</Label>
                    <Input
                      id="battery_life"
                      value={formData.battery_life}
                      onChange={(e) => handleInputChange('battery_life', e.target.value)}
                      placeholder="8 ساعات، 12 ساعة..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="ports">{t('computer.ports')}</Label>
                    <Input
                      id="ports"
                      value={formData.ports}
                      onChange={(e) => handleInputChange('ports', e.target.value)}
                      placeholder="USB 3.0, HDMI, Type-C..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="connectivity">{t('computer.connectivity')}</Label>
                    <Input
                      id="connectivity"
                      value={formData.connectivity}
                      onChange={(e) => handleInputChange('connectivity', e.target.value)}
                      placeholder="Wi-Fi 6, Bluetooth 5.0..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="webcam">{t('computer.webcam')}</Label>
                    <Select value={formData.webcam} onValueChange={(value) => handleInputChange('webcam', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">{t('options.available')}</SelectItem>
                        <SelectItem value="not_available">{t('options.not_available')}</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                        <SelectItem value="full-hd">Full HD</SelectItem>
                        <SelectItem value="4k">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="keyboard_layout">{t('computer.keyboard_layout')}</Label>
                    <Select value={formData.keyboard_layout} onValueChange={(value) => handleInputChange('keyboard_layout', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arabic">عربي</SelectItem>
                        <SelectItem value="english">إنجليزي</SelectItem>
                        <SelectItem value="arabic-english">عربي / إنجليزي</SelectItem>
                        <SelectItem value="french">فرنسي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Modifications & Accessories */}
            <AccordionItem value="modifications">
              <AccordionTrigger>{t('computer.modifications')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="modifications">{t('computer.modifications')}</Label>
                    <Textarea
                      id="modifications"
                      value={formData.modifications}
                      onChange={(e) => handleInputChange('modifications', e.target.value)}
                      placeholder="أي تحديثات أو تعديلات تمت..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessories">{t('computer.accessories')}</Label>
                    <Textarea
                      id="accessories"
                      value={formData.accessories}
                      onChange={(e) => handleInputChange('accessories', e.target.value)}
                      placeholder="ماوس، كيبورد، حقيبة..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="available_colors">{t('computer.available_colors')}</Label>
                    <Input
                      id="available_colors"
                      value={formData.available_colors}
                      onChange={(e) => handleInputChange('available_colors', e.target.value)}
                      placeholder="أسود، فضي، رمادي..."
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Seller Information */}
            <AccordionItem value="seller-info">
              <AccordionTrigger>{t('common.seller_info')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">{t('form.price')}</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder={t('placeholders.enter_price')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">{t('form.city')}</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder={t('placeholders.enter_city')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seller_type">{t('form.seller_type')}</Label>
                    <Select value={formData.seller_type} onValueChange={(value) => handleInputChange('seller_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="person">{t('options.person')}</SelectItem>
                        <SelectItem value="shop">{t('options.shop')}</SelectItem>
                        <SelectItem value="company">{t('options.company')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="delivery_method">{t('form.delivery_method')}</Label>
                    <Select value={formData.delivery_method} onValueChange={(value) => handleInputChange('delivery_method', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal_pickup">{t('options.personal_pickup')}</SelectItem>
                        <SelectItem value="delivery">{t('options.delivery')}</SelectItem>
                        <SelectItem value="shipping">{t('options.shipping')}</SelectItem>
                        <SelectItem value="both">{t('options.both')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact_method">{t('form.contact_method')}</Label>
                    <Input
                      id="contact_method"
                      value={formData.contact_method}
                      onChange={(e) => handleInputChange('contact_method', e.target.value)}
                      placeholder={t('placeholders.phone_whatsapp')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="warranty">{t('form.warranty')}</Label>
                    <Select value={formData.warranty} onValueChange={(value) => handleInputChange('warranty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">{t('options.available')}</SelectItem>
                        <SelectItem value="not_available">{t('options.not_available')}</SelectItem>
                        <SelectItem value="expired">{t('options.expired')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="warranty_duration">{t('form.warranty_duration')}</Label>
                    <Input
                      id="warranty_duration"
                      value={formData.warranty_duration}
                      onChange={(e) => handleInputChange('warranty_duration', e.target.value)}
                      placeholder="6 أشهر، سنة..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="accept_exchange">{t('form.accept_exchange')}</Label>
                    <Select value={formData.accept_exchange} onValueChange={(value) => handleInputChange('accept_exchange', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t('options.yes')}</SelectItem>
                        <SelectItem value="no">{t('options.no')}</SelectItem>
                        <SelectItem value="partially">{t('options.partially')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="negotiable">{t('form.negotiable')}</Label>
                    <Select value={formData.negotiable} onValueChange={(value) => handleInputChange('negotiable', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.choose')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t('options.yes')}</SelectItem>
                        <SelectItem value="no">{t('options.no')}</SelectItem>
                        <SelectItem value="within_reasonable_limits">{t('options.within_reasonable_limits')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sell_reason">{t('form.sell_reason')}</Label>
                    <Textarea
                      id="sell_reason"
                      value={formData.sell_reason}
                      onChange={(e) => handleInputChange('sell_reason', e.target.value)}
                      placeholder="سبب البيع..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unwanted_customers">{t('common.unwanted_customers')}</Label>
                    <Textarea
                      id="unwanted_customers"
                      value={formData.unwanted_customers}
                      onChange={(e) => handleInputChange('unwanted_customers', e.target.value)}
                      placeholder={t('common.unwanted_customers_desc')}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="additional_notes">{t('form.additional_notes')}</Label>
                    <Textarea
                      id="additional_notes"
                      value={formData.additional_notes}
                      onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                      placeholder={t('placeholders.additional_notes')}
                      rows={4}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </form>
  );
};