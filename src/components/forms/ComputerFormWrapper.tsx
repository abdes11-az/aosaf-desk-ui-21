import React from "react";
import { useNavigate } from "react-router-dom";
import { ComputerForm } from "./ComputerForm";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { toast } from "../ui/use-toast";

export const ComputerFormWrapper: React.FC<{ onBack: () => void; onGenerateDescription: (data: any) => void; }> = ({ onBack, onGenerateDescription }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFormSubmit = (data: any) => {
    // Call the parent's onGenerateDescription
    onGenerateDescription(data);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('actions.back')}
        </Button>
        <h1 className="text-2xl font-bold">{t('computer.title')}</h1>
      </div>

      <ComputerForm onSubmit={handleFormSubmit} />
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          form="computer-form" 
          size="lg"
          className="px-8"
          onClick={() => {
            const form = document.getElementById('computer-form') as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
        >
          {t('actions.generate')}
        </Button>
      </div>
    </div>
  );
};