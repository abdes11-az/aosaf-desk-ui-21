import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComputerFormData {
  // General Information
  type: string;
  brand: string;
  model: string;
  condition: string;
  price: string;
  city: string;
  
  // Technical Specifications
  processor: string;
  processorBrand: string;
  processorModel: string;
  ram: string;
  storageType: string;
  storageCapacity: string;
  graphicsType: string;
  graphicsModel: string;
  operatingSystem: string;
  screenSize: string;
  screenResolution: string;
  
  // Purchase Information
  purchaseDate: string;
  warranty: string;
  purchaseReason: string;
  
  // Selling Information
  sellingReason: string;
  negotiable: string;
  delivery: string;
  location: string;
  
  // Usage Information
  usagePurpose: string;
  usageHours: string;
  gamingPerformance: string;
  softwareIncluded: string;
  
  // Accessories
  includedAccessories: string[];
  keyboard: string;
  mouse: string;
  monitor: string;
  speakers: string;
  webcam: string;
  otherAccessories: string;
}

interface ComputerFormProps {
  onBack: () => void;
  onGenerateDescription: (data: ComputerFormData) => void;
}

const ComputerForm = ({ onBack, onGenerateDescription }: ComputerFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<ComputerFormData>({
    type: '',
    brand: '',
    model: '',
    condition: '',
    price: '',
    city: '',
    processor: '',
    processorBrand: '',
    processorModel: '',
    ram: '',
    storageType: '',
    storageCapacity: '',
    graphicsType: '',
    graphicsModel: '',
    operatingSystem: '',
    screenSize: '',
    screenResolution: '',
    purchaseDate: '',
    warranty: '',
    purchaseReason: '',
    sellingReason: '',
    negotiable: '',
    delivery: '',
    location: '',
    usagePurpose: '',
    usageHours: '',
    gamingPerformance: '',
    softwareIncluded: '',
    includedAccessories: [],
    keyboard: '',
    mouse: '',
    monitor: '',
    speakers: '',
    webcam: '',
    otherAccessories: ''
  });

  const handleInputChange = (field: keyof ComputerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccessoryChange = (accessory: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      includedAccessories: checked 
        ? [...prev.includedAccessories, accessory]
        : prev.includedAccessories.filter(item => item !== accessory)
    }));
  };

  const handleSubmit = () => {
    onGenerateDescription(formData);
  };

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface-hover -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('computer.title')}</h2>
          <p className="text-muted-foreground text-sm">{t('form.fill_details')}</p>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="general" className="space-y-4">
        {/* General Section */}
        <AccordionItem value="general" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.general_section')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.general_section_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="type">{t('computer.type')}</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">{t('options.desktop')}</SelectItem>
                    <SelectItem value="laptop">{t('options.laptop')}</SelectItem>
                    <SelectItem value="gaming">{t('options.gaming_pc')}</SelectItem>
                    <SelectItem value="workstation">{t('options.workstation')}</SelectItem>
                    <SelectItem value="mini-pc">{t('options.mini_pc')}</SelectItem>
                    <SelectItem value="all-in-one">{t('options.all_in_one')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">{t('computer.brand')}</Label>
                <Select onValueChange={(value) => handleInputChange('brand', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="hp">HP</SelectItem>
                    <SelectItem value="dell">Dell</SelectItem>
                    <SelectItem value="lenovo">Lenovo</SelectItem>
                    <SelectItem value="asus">ASUS</SelectItem>
                    <SelectItem value="acer">Acer</SelectItem>
                    <SelectItem value="msi">MSI</SelectItem>
                    <SelectItem value="sony">Sony</SelectItem>
                    <SelectItem value="custom">{t('options.custom_build')}</SelectItem>
                    <SelectItem value="other">{t('options.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">{t('computer.model')}</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder={t('form.enter_model')}
                />
              </div>

              <div>
                <Label htmlFor="condition">{t('computer.condition')}</Label>
                <Select onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">{t('options.new')}</SelectItem>
                    <SelectItem value="like-new">{t('options.like_new')}</SelectItem>
                    <SelectItem value="excellent">{t('options.excellent')}</SelectItem>
                    <SelectItem value="good">{t('options.good')}</SelectItem>
                    <SelectItem value="fair">{t('options.fair')}</SelectItem>
                    <SelectItem value="used">{t('options.used')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">{t('computer.price')}</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder={t('form.enter_price')}
                />
              </div>

              <div>
                <Label htmlFor="city">{t('computer.city')}</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder={t('form.enter_city')}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Technical Specifications */}
        <AccordionItem value="specs" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.specifications')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.specifications_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="processorBrand">{t('computer.processor_brand')}</Label>
                <Select onValueChange={(value) => handleInputChange('processorBrand', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intel">Intel</SelectItem>
                    <SelectItem value="amd">AMD</SelectItem>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="other">{t('options.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="processorModel">{t('computer.processor_model')}</Label>
                <Input
                  id="processorModel"
                  value={formData.processorModel}
                  onChange={(e) => handleInputChange('processorModel', e.target.value)}
                  placeholder="Core i7-12700K, Ryzen 7 5800X"
                />
              </div>

              <div>
                <Label htmlFor="ram">{t('computer.ram')}</Label>
                <Select onValueChange={(value) => handleInputChange('ram', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4gb">4 GB</SelectItem>
                    <SelectItem value="8gb">8 GB</SelectItem>
                    <SelectItem value="16gb">16 GB</SelectItem>
                    <SelectItem value="32gb">32 GB</SelectItem>
                    <SelectItem value="64gb">64 GB</SelectItem>
                    <SelectItem value="128gb">128 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="storageType">{t('computer.storage_type')}</Label>
                <Select onValueChange={(value) => handleInputChange('storageType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssd">SSD</SelectItem>
                    <SelectItem value="hdd">HDD</SelectItem>
                    <SelectItem value="nvme">NVMe SSD</SelectItem>
                    <SelectItem value="hybrid">Hybrid (SSD + HDD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="storageCapacity">{t('computer.storage_capacity')}</Label>
                <Select onValueChange={(value) => handleInputChange('storageCapacity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128gb">128 GB</SelectItem>
                    <SelectItem value="256gb">256 GB</SelectItem>
                    <SelectItem value="512gb">512 GB</SelectItem>
                    <SelectItem value="1tb">1 TB</SelectItem>
                    <SelectItem value="2tb">2 TB</SelectItem>
                    <SelectItem value="4tb">4 TB</SelectItem>
                    <SelectItem value="8tb">8 TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="graphicsType">{t('computer.graphics_type')}</Label>
                <Select onValueChange={(value) => handleInputChange('graphicsType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="integrated">{t('options.integrated_graphics')}</SelectItem>
                    <SelectItem value="dedicated">{t('options.dedicated_graphics')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="graphicsModel">{t('computer.graphics_model')}</Label>
                <Input
                  id="graphicsModel"
                  value={formData.graphicsModel}
                  onChange={(e) => handleInputChange('graphicsModel', e.target.value)}
                  placeholder="RTX 4070, GTX 1660, Radeon RX 6800"
                />
              </div>

              <div>
                <Label htmlFor="operatingSystem">{t('computer.operating_system')}</Label>
                <Select onValueChange={(value) => handleInputChange('operatingSystem', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows11">Windows 11</SelectItem>
                    <SelectItem value="windows10">Windows 10</SelectItem>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                    <SelectItem value="none">{t('options.no_os')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="screenSize">{t('computer.screen_size')}</Label>
                <Input
                  id="screenSize"
                  value={formData.screenSize}
                  onChange={(e) => handleInputChange('screenSize', e.target.value)}
                  placeholder='13"، 15"، 24"، 27"'
                />
              </div>

              <div>
                <Label htmlFor="screenResolution">{t('computer.screen_resolution')}</Label>
                <Select onValueChange={(value) => handleInputChange('screenResolution', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hd">1366x768 (HD)</SelectItem>
                    <SelectItem value="fhd">1920x1080 (Full HD)</SelectItem>
                    <SelectItem value="2k">2560x1440 (2K)</SelectItem>
                    <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                    <SelectItem value="retina">Retina Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Purchase Information */}
        <AccordionItem value="purchase" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.purchase_info')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.purchase_info_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="purchaseDate">{t('computer.purchase_date')}</Label>
                <Input
                  id="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  placeholder={t('form.enter_date')}
                />
              </div>

              <div>
                <Label htmlFor="warranty">{t('computer.warranty')}</Label>
                <Select onValueChange={(value) => handleInputChange('warranty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expired">{t('options.expired')}</SelectItem>
                    <SelectItem value="valid">{t('options.valid')}</SelectItem>
                    <SelectItem value="extended">{t('options.extended_warranty')}</SelectItem>
                    <SelectItem value="unknown">{t('options.unknown')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="purchaseReason">{t('computer.purchase_reason')}</Label>
                <Textarea
                  id="purchaseReason"
                  value={formData.purchaseReason}
                  onChange={(e) => handleInputChange('purchaseReason', e.target.value)}
                  placeholder={t('form.optional')}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Selling Information */}
        <AccordionItem value="selling" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.sell_info')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.sell_info_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="sellingReason">{t('computer.selling_reason')}</Label>
                <Textarea
                  id="sellingReason"
                  value={formData.sellingReason}
                  onChange={(e) => handleInputChange('sellingReason', e.target.value)}
                  placeholder={t('form.optional')}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="negotiable">{t('computer.negotiable')}</Label>
                <Select onValueChange={(value) => handleInputChange('negotiable', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">{t('options.yes')}</SelectItem>
                    <SelectItem value="no">{t('options.no')}</SelectItem>
                    <SelectItem value="slightly">{t('options.slightly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="delivery">{t('computer.delivery')}</Label>
                <Select onValueChange={(value) => handleInputChange('delivery', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">{t('options.available')}</SelectItem>
                    <SelectItem value="not-available">{t('options.not_available')}</SelectItem>
                    <SelectItem value="buyer-expense">{t('options.buyer_expense')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">{t('computer.location')}</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder={t('form.enter_location')}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Usage Information */}
        <AccordionItem value="usage" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.usage_info')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.usage_info_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="usagePurpose">{t('computer.usage_purpose')}</Label>
                <Select onValueChange={(value) => handleInputChange('usagePurpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">{t('options.work')}</SelectItem>
                    <SelectItem value="gaming">{t('options.gaming')}</SelectItem>
                    <SelectItem value="study">{t('options.study')}</SelectItem>
                    <SelectItem value="home">{t('options.home_use')}</SelectItem>
                    <SelectItem value="professional">{t('options.professional')}</SelectItem>
                    <SelectItem value="design">{t('options.design_graphics')}</SelectItem>
                    <SelectItem value="programming">{t('options.programming')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="usageHours">{t('computer.usage_hours')}</Label>
                <Select onValueChange={(value) => handleInputChange('usageHours', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t('options.light_use')}</SelectItem>
                    <SelectItem value="moderate">{t('options.moderate_use')}</SelectItem>
                    <SelectItem value="heavy">{t('options.heavy_use')}</SelectItem>
                    <SelectItem value="intensive">{t('options.intensive_use')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gamingPerformance">{t('computer.gaming_performance')}</Label>
                <Select onValueChange={(value) => handleInputChange('gamingPerformance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">{t('options.excellent')}</SelectItem>
                    <SelectItem value="good">{t('options.good')}</SelectItem>
                    <SelectItem value="fair">{t('options.fair')}</SelectItem>
                    <SelectItem value="not-suitable">{t('options.not_suitable')}</SelectItem>
                    <SelectItem value="not-tested">{t('options.not_tested')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="softwareIncluded">{t('computer.software_included')}</Label>
                <Textarea
                  id="softwareIncluded"
                  value={formData.softwareIncluded}
                  onChange={(e) => handleInputChange('softwareIncluded', e.target.value)}
                  placeholder={t('form.optional')}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Accessories */}
        <AccordionItem value="accessories" className="form-section">
          <AccordionTrigger className="text-lg font-semibold">
            {t('computer.accessories')}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {t('computer.accessories_desc')}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-3">
                <Label>{t('computer.included_accessories')}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'keyboard', label: t('computer.keyboard') },
                    { key: 'mouse', label: t('computer.mouse') },
                    { key: 'monitor', label: t('computer.monitor') },
                    { key: 'speakers', label: t('computer.speakers') },
                    { key: 'webcam', label: t('computer.webcam') }
                  ].map(accessory => (
                    <label key={accessory.key} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={(e) => handleAccessoryChange(accessory.key, e.target.checked)}
                      />
                      <span className="text-sm">{accessory.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="otherAccessories">{t('computer.other_accessories')}</Label>
                <Textarea
                  id="otherAccessories"
                  value={formData.otherAccessories}
                  onChange={(e) => handleInputChange('otherAccessories', e.target.value)}
                  placeholder={t('form.optional')}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="sticky bottom-0 bg-surface p-4 -mx-4 border-t border-border mt-8">
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          size="lg"
        >
          {t('form.generate_description')}
        </Button>
      </div>
    </div>
  );
};

export default ComputerForm;