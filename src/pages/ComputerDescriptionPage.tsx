import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowLeft, Copy, Save, RefreshCw } from "lucide-react";
import { toast } from "../components/ui/use-toast";

export const ComputerDescriptionPage: React.FC<{ data: any; onBack: () => void; onNewDescription: () => void; }> = ({ data, onBack, onNewDescription }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<any>(data);
  const [generatedDescription, setGeneratedDescription] = useState<string>("");

  useEffect(() => {
    // Use the passed data
    if (data) {
      setFormData(data);
      generateDescription(data);
    }
  }, [data]);

  const generateDescription = (data: any) => {
    let description = `${t('description.computer_for_sale')}\n\n`;
    
    // Basic Info
    if (data.brand || data.model) {
      description += `${t('computer.basic_info')}:\n`;
      if (data.brand) description += `• ${t('form.brand')}: ${data.brand}\n`;
      if (data.model) description += `• ${t('form.model')}: ${data.model}\n`;
      if (data.type) description += `• ${t('computer.type')}: ${data.type}\n`;
      if (data.color) description += `• ${t('form.color')}: ${data.color}\n`;
      if (data.condition) description += `• ${t('form.condition')}: ${data.condition}\n`;
      description += "\n";
    }

    // Technical Details
    if (data.processor || data.ram || data.storage) {
      description += `${t('computer.technical_details')}:\n`;
      if (data.processor) description += `• ${t('computer.processor')}: ${data.processor}\n`;
      if (data.ram) description += `• ${t('computer.ram')}: ${data.ram}\n`;
      if (data.storage) description += `• ${t('computer.storage')}: ${data.storage}\n`;
      if (data.screen_size) description += `• ${t('computer.screen_size')}: ${data.screen_size}\n`;
      if (data.graphics_card) description += `• ${t('computer.graphics_card')}: ${data.graphics_card}\n`;
      if (data.operating_system) description += `• ${t('computer.operating_system')}: ${data.operating_system}\n`;
      if (data.battery_life) description += `• ${t('computer.battery_life')}: ${data.battery_life}\n`;
      if (data.ports) description += `• ${t('computer.ports')}: ${data.ports}\n`;
      if (data.connectivity) description += `• ${t('computer.connectivity')}: ${data.connectivity}\n`;
      if (data.webcam) description += `• ${t('computer.webcam')}: ${data.webcam}\n`;
      if (data.keyboard_layout) description += `• ${t('computer.keyboard_layout')}: ${data.keyboard_layout}\n`;
      description += "\n";
    }

    // Accessories & Modifications
    if (data.accessories || data.modifications) {
      if (data.accessories) {
        description += `${t('computer.accessories')}:\n${data.accessories}\n\n`;
      }
      if (data.modifications) {
        description += `${t('computer.modifications')}:\n${data.modifications}\n\n`;
      }
    }

    // Available Colors
    if (data.available_colors) {
      description += `${t('computer.available_colors')}: ${data.available_colors}\n\n`;
    }

    // Price and Location
    if (data.price) {
      description += `${t('description.price')}: ${data.price}`;
      if (data.negotiable === 'yes') {
        description += ` (${t('description.negotiable')})`;
      } else if (data.negotiable === 'no') {
        description += ` (${t('description.not_negotiable')})`;
      }
      description += "\n";
    }

    if (data.city) {
      description += `${t('description.city')}: ${data.city}\n`;
    }

    // Seller Information
    if (data.seller_type) {
      description += `${t('description.seller_type')}: ${data.seller_type}\n`;
    }

    if (data.delivery_method) {
      description += `${t('description.delivery_method')}: ${data.delivery_method}\n`;
    }

    // Warranty
    if (data.warranty && data.warranty !== 'not_available') {
      description += `${t('description.warranty')}: ${t('options.available')}`;
      if (data.warranty_duration) {
        description += ` (${data.warranty_duration})`;
      }
      description += "\n";
    }

    // Accept Exchange
    if (data.accept_exchange === 'yes') {
      description += `${t('description.accept_exchange')}\n`;
    }

    // Sell Reason
    if (data.sell_reason) {
      description += `\n${t('description.sell_reason')}: ${data.sell_reason}\n`;
    }

    // Unwanted Customers
    if (data.unwanted_customers) {
      description += `\n${t('description.unwanted_customers')}:\n${data.unwanted_customers}\n`;
    }

    // Additional Notes
    if (data.additional_notes) {
      description += `\n${t('description.additional_notes')}:\n${data.additional_notes}\n`;
    }

    // Contact Information
    description += `\n${t('description.contact_info')}`;
    if (data.contact_method) {
      description += `\n📱 ${data.contact_method}`;
    }

    description += `\n\n${t('description.thank_you')}`;

    setGeneratedDescription(description);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: t('messages.copied_success'),
        description: t('messages.description_copied'),
      });
    } catch (error) {
      toast({
        title: t('messages.error'),
        description: t('messages.copy_error'),
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    try {
      const savedDescriptions = JSON.parse(localStorage.getItem('savedDescriptions') || '[]');
      const newDescription = {
        id: Date.now(),
        type: 'computer',
        title: `${formData?.brand || ''} ${formData?.model || ''} ${t('description.computer_for_sale')}`.trim(),
        content: generatedDescription,
        date: new Date().toLocaleDateString(),
        formData: formData
      };
      savedDescriptions.push(newDescription);
      localStorage.setItem('savedDescriptions', JSON.stringify(savedDescriptions));
      
      toast({
        title: t('messages.saved_success'),
        description: t('messages.description_saved'),
      });
    } catch (error) {
      toast({
        title: t('messages.error'),
        description: t('messages.save_error'),
        variant: "destructive",
      });
    }
  };

  const handleRegenerate = () => {
    if (formData) {
      generateDescription(formData);
      onNewDescription();
    }
  };

  if (!formData) {
    return <div className="container mx-auto px-4 py-6">Loading...</div>;
  }

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
        <h1 className="text-2xl font-bold">{t('common.generated_description')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t('common.comprehensive_description')}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRegenerate}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t('actions.new_description')}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {t('actions.copy')}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {t('actions.save')}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {generatedDescription}
            </pre>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {t('messages.auto_generated')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};