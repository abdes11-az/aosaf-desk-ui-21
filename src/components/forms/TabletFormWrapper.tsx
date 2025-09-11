import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TabletForm from "./TabletForm";

interface TabletFormWrapperProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const TabletFormWrapper = ({ onBack, onGenerateDescription }: TabletFormWrapperProps) => {
  const [formData, setFormData] = useState({});
  const { t } = useLanguage();

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
          <h2 className="text-2xl font-bold text-foreground">📱 وصف التابلت</h2>
          <p className="text-muted-foreground text-sm">أدخل تفاصيل التابلت</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
        <p className="text-sm text-muted-foreground">
          💡 {t('common.form_tip')}
        </p>
      </div>

      <TabletForm data={formData} onChange={setFormData} />

      <div className="mt-8">
        <Button onClick={handleSubmit} className="w-full">
          إنشاء الوصف
        </Button>
      </div>
    </div>
  );
};

export default TabletFormWrapper;