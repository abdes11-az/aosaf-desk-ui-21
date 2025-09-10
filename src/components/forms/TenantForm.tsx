import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import { sanitizeFormData } from "@/utils/security";
import { useLanguage } from "@/contexts/LanguageContext";

interface TenantFormProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const TenantForm = ({ onBack, onGenerateDescription }: TenantFormProps) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // القسم العام
    usageType: "",
    tenantType: "",
    rentalDuration: "",
    
    // القسم السكني
    numberOfResidents: "",
    hasChildren: "",
    hasFurniture: "",
    hasPets: "",
    contractSigning: "",
    paymentMethod: "",
    
    // القسم التجاري
    businessType: "",
    numberOfEmployees: "",
    businessContractSigning: "",
    
    // طريقة التواصل
    contactMethod: "",
    additionalRequirements: "",
    additionalNotes: ""
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleSubmit = () => {
    // تنظيف البيانات قبل الإرسال
    const cleanData = sanitizeFormData(formData);
    onGenerateDescription(cleanData);
  };

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
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('tenant.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('form.fill_all_info')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* القسم العام */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🧾 {t('tenant.general_section')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="usageType">{t('tenant.usage_type')}</Label>
                <Select value={formData.usageType} onValueChange={(value) => updateField("usageType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سكني">سكني</SelectItem>
                    <SelectItem value="تجاري">تجاري</SelectItem>
                    <SelectItem value="مكتبي">مكتبي</SelectItem>
                    <SelectItem value="مختلط">مختلط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tenantType">{t('tenant.tenant_type')}</Label>
                <Select value={formData.tenantType} onValueChange={(value) => updateField("tenantType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عائلة">عائلة</SelectItem>
                    <SelectItem value="أعزب">أعزب</SelectItem>
                    <SelectItem value="طلاب">طلاب</SelectItem>
                    <SelectItem value="موظفين">موظفين</SelectItem>
                    <SelectItem value="شركة">شركة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rentalDuration">{t('tenant.rental_duration')}</Label>
                <Select value={formData.rentalDuration} onValueChange={(value) => updateField("rentalDuration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شهر واحد">شهر واحد</SelectItem>
                    <SelectItem value="شهرين">شهرين</SelectItem>
                    <SelectItem value="ثلاثة أشهر">ثلاثة أشهر</SelectItem>
                    <SelectItem value="ستة أشهر">ستة أشهر</SelectItem>
                    <SelectItem value="سنة واحدة">سنة واحدة</SelectItem>
                    <SelectItem value="سنتان">سنتان</SelectItem>
                    <SelectItem value="ثلاث سنوات">ثلاث سنوات</SelectItem>
                    <SelectItem value="طويلة المدى">طويلة المدى</SelectItem>
                    <SelectItem value="قصيرة المدى">قصيرة المدى</SelectItem>
                    <SelectItem value="شهري">شهري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* قسم خاص بالسكني */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏠 {t('tenant.residential_section')}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {t('tenant.residential_desc')}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfResidents">{t('tenant.number_of_residents')}</Label>
                <Input
                  id="numberOfResidents"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.numberOfResidents}
                  onChange={(e) => updateField("numberOfResidents", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hasChildren">{t('tenant.has_children')}</Label>
                <Select value={formData.hasChildren} onValueChange={(value) => updateField("hasChildren", value)}>
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
                <Label htmlFor="hasFurniture">{t('tenant.has_furniture')}</Label>
                <Select value={formData.hasFurniture} onValueChange={(value) => updateField("hasFurniture", value)}>
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
                <Label htmlFor="hasPets">{t('tenant.has_pets')}</Label>
                <Select value={formData.hasPets} onValueChange={(value) => updateField("hasPets", value)}>
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
                <Label htmlFor="contractSigning">{t('tenant.contract_signing')}</Label>
                <Select value={formData.contractSigning} onValueChange={(value) => updateField("contractSigning", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="حسب رغبة صاحب الملك">حسب رغبة صاحب الملك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">{t('tenant.payment_method')}</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => updateField("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شهري">شهري</SelectItem>
                    <SelectItem value="ربع سنوي">ربع سنوي</SelectItem>
                    <SelectItem value="نصف سنوي">نصف سنوي</SelectItem>
                    <SelectItem value="سنوي">سنوي</SelectItem>
                    <SelectItem value="مقدماً">مقدماً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* قسم خاص بالتجاري */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🏢 {t('tenant.commercial_section')}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {t('tenant.commercial_desc')}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessType">{t('tenant.business_type')}</Label>
                <Input
                  id="businessType"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numberOfEmployees">{t('tenant.number_of_employees')}</Label>
                <Input
                  id="numberOfEmployees"
                  placeholder={t('placeholders.additional_details')}
                  value={formData.numberOfEmployees}
                  onChange={(e) => updateField("numberOfEmployees", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="businessContractSigning">{t('tenant.business_contract_signing')}</Label>
                <Select value={formData.businessContractSigning} onValueChange={(value) => updateField("businessContractSigning", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('options.choose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم">{t('options.yes')}</SelectItem>
                    <SelectItem value="لا">{t('options.no')}</SelectItem>
                    <SelectItem value="حسب رغبة صاحب الملك">حسب رغبة صاحب الملك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* طريقة التواصل */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📞 {t('tenant.contact_section')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="additionalRequirements">{t('tenant.additional_requirements')}</Label>
              <Textarea
                id="additionalRequirements"
                placeholder={t('placeholders.additional_details')}
                value={formData.additionalRequirements}
                onChange={(e) => updateField("additionalRequirements", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="additionalNotes">{t('form.additional_notes')}</Label>
              <Textarea
                id="additionalNotes"
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

export default TenantForm;