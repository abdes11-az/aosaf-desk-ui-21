import { Button } from "@/components/ui/button";
import { ChevronRight, Copy, Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveDescription } from "@/utils/saveSystem";

interface TenantDescriptionPageProps {
  tenantData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const TenantDescriptionPage = ({ tenantData, onBack, onNewDescription }: TenantDescriptionPageProps) => {
  const { toast } = useToast();

  const generateTenantDescription = (data: any) => {
    let description = "📋 ملف المستأجر\n\n";

    // القسم العام
    if (data.usageType || data.tenantType || data.rentalDuration) {
      description += "🧾 القسم العام:\n";
      if (data.usageType) description += `• نوع الاستخدام: ${data.usageType}\n`;
      if (data.tenantType) description += `• نوع المستأجر: ${data.tenantType}\n`;
      if (data.rentalDuration) description += `• مدة الإيجار: ${data.rentalDuration}\n`;
      description += "\n";
    }

    // القسم السكني
    if (data.numberOfResidents || data.hasChildren || data.hasFurniture || data.hasPets || data.contractSigning || data.paymentMethod) {
      description += "🏠 القسم السكني:\n";
      if (data.numberOfResidents) description += `• عدد السكان: ${data.numberOfResidents}\n`;
      if (data.hasChildren) description += `• يوجد أطفال: ${data.hasChildren}\n`;
      if (data.hasFurniture) description += `• يوجد أثاث: ${data.hasFurniture}\n`;
      if (data.hasPets) description += `• يوجد حيوانات أليفة: ${data.hasPets}\n`;
      if (data.contractSigning) description += `• توقيع العقد: ${data.contractSigning}\n`;
      if (data.paymentMethod) description += `• طريقة الدفع: ${data.paymentMethod}\n`;
      description += "\n";
    }

    // طريقة التواصل
    if (data.contactMethod || data.additionalRequirements) {
      description += "📞 معلومات التواصل:\n";
      if (data.contactMethod) description += `• طريقة التواصل: ${data.contactMethod}\n`;
      if (data.additionalRequirements) description += `• متطلبات إضافية: ${data.additionalRequirements}\n`;
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += "💭 ملاحظات إضافية:\n";
      description += `${data.additionalNotes}\n\n`;
    }

    description += "---\n";
    description += "تم إنشاء هذا الملف بواسطة تطبيق إنشاء الأوصاف";

    return description;
  };

  const generatedDescription = generateTenantDescription(tenantData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: "تم النسخ",
        description: "تم نسخ ملف المستأجر إلى الحافظة",
      });
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل في نسخ النص",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    const title = `ملف مستأجر - ${tenantData.tenantType || 'غير محدد'} - ${new Date().toLocaleDateString('ar')}`;
    saveDescription('tenant', title, generatedDescription, tenantData);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ ملف المستأجر بنجاح",
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
            <h2 className="text-xl font-bold text-foreground">ملف المستأجر</h2>
            <p className="text-muted-foreground text-sm">الوصف المُنشأ</p>
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
          حفظ الملف
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          نسخ النص
        </Button>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          تعديل المعلومات
        </Button>
      </div>

      <div className="bg-accent rounded-lg p-4 text-center">
        <p className="text-sm text-accent-foreground">
          تم إنشاء هذا الملف بواسطة تطبيق إنشاء الأوصاف
        </p>
      </div>
    </div>
  );
};

export default TenantDescriptionPage;