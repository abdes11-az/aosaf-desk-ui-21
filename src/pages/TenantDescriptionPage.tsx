import { Button } from "@/components/ui/button";
import { ChevronRight, Copy, Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveDescription } from "@/utils/saveSystem";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt } from "@/utils/i18nHelpers";

interface TenantDescriptionPageProps {
  tenantData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const TenantDescriptionPage = ({ tenantData, onBack, onNewDescription }: TenantDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateTenantDescription = (data: any) => {
    let description = `📋 ${t('description.tenant_profile')}\n\n`;

    // القسم العام
    if (data.usageType || data.tenantType || data.rentalDuration) {
      description += `🧾 ${t('tenant.general_section')}:\n`;
      if (data.usageType) description += `• ${t('tenant.usage_type')}: ${opt(data.usageType, t)}\n`;
      if (data.tenantType) description += `• ${t('tenant.tenant_type')}: ${opt(data.tenantType, t)}\n`;
      if (data.rentalDuration) description += `• ${t('tenant.rental_duration')}: ${data.rentalDuration}\n`;
      description += "\n";
    }

    // القسم السكني
    if (data.numberOfResidents || data.hasChildren || data.hasFurniture || data.hasPets || data.contractSigning || data.paymentMethod) {
      description += `🏠 ${t('tenant.residential_section')}:\n`;
      if (data.numberOfResidents) description += `• ${t('tenant.number_of_residents')}: ${data.numberOfResidents}\n`;
      if (data.hasChildren) description += `• ${t('tenant.has_children')}: ${yn(data.hasChildren, t)}\n`;
      if (data.hasFurniture) description += `• ${t('tenant.has_furniture')}: ${yn(data.hasFurniture, t)}\n`;
      if (data.hasPets) description += `• ${t('tenant.has_pets')}: ${yn(data.hasPets, t)}\n`;
      if (data.contractSigning) description += `• ${t('tenant.contract_signing')}: ${opt(data.contractSigning, t)}\n`;
      if (data.paymentMethod) description += `• ${t('tenant.payment_method')}: ${opt(data.paymentMethod, t)}\n`;
      description += "\n";
    }

    // طريقة التواصل
    if (data.contactMethod || data.additionalRequirements) {
      description += `📞 ${t('tenant.contact_info')}:\n`;
      if (data.contactMethod) description += `• ${t('description.contact_method')}: ${data.contactMethod}\n`;
      if (data.additionalRequirements) description += `• ${t('tenant.additional_requirements')}: ${data.additionalRequirements}\n`;
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `💭 ${t('common.additional_notes')}:\n`;
      description += `${data.additionalNotes}\n\n`;
    }

    description += "---\n";
    description += t('description.generated_by_app');

    return description;
  };

  const generatedDescription = generateTenantDescription(tenantData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: t('messages.copied_success'),
        description: t('messages.tenant_copied'),
      });
    } catch (err) {
      toast({
        title: t('messages.copy_error'),
        description: t('messages.copy_failed'),
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    const title = `${t('description.tenant_profile')} - ${tenantData.tenantType || t('options.not_specified')} - ${new Date().toLocaleDateString('ar')}`;
    saveDescription('tenant', title, generatedDescription, tenantData);
    toast({
      title: t('messages.saved_success'),
      description: t('messages.tenant_saved'),
    });
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
            <h2 className="text-xl font-bold text-foreground">{t('description.tenant_profile')}</h2>
            <p className="text-muted-foreground text-sm">{t('description.generated')}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
          {generatedDescription}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {t('actions.save_file')}
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          {t('actions.copy')}
        </Button>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          {t('actions.edit_info')}
        </Button>
      </div>

      <div className="bg-accent rounded-lg p-4 text-center">
        <p className="text-sm text-accent-foreground">
          {t('description.generated_by_app')}
        </p>
      </div>
    </div>
  );
};

export default TenantDescriptionPage;