import { ChevronRight, Star, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDescription, generateTitleFromData } from "@/utils/saveSystem";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { yn, opt, cond } from "@/utils/i18nHelpers";

interface RealEstateDescriptionPageProps {
  realEstateData: any;
  onBack: () => void;
  onNewDescription: () => void;
}

const RealEstateDescriptionPage = ({ realEstateData, onBack, onNewDescription }: RealEstateDescriptionPageProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const generateRealEstateDescription = (data: any) => {
    let description = "";

    // العنوان الرئيسي
    if (data.propertyType) {
      description += `🏠 ${data.propertyType}`;
      if (data.district && data.city) {
        description += ` ${t('description.in')} ${data.district}, ${data.city}`;
      }
      description += "\n\n";
    }

    // المعلومات الأساسية
    description += `📋 ${t('realestate.basic_info')}:\n`;
    if (data.city) description += `📍 ${t('form.city')}: ${data.city}\n`;
    if (data.district) description += `🏘️ ${t('realestate.district')}: ${data.district}\n`;
    if (data.area) description += `📐 ${t('realestate.area')}: ${data.area}\n`;
    if (data.floors) description += `🏢 ${t('realestate.floors')}: ${data.floors}\n`;
    if (data.currentFloor) description += `📍 ${t('realestate.current_floor')}: ${data.currentFloor}\n`;
    if (data.clientType) description += `👤 ${t('realestate.client_type')}: ${data.clientType}\n`;
    description += "\n";

    // تفاصيل الغرف
    description += `🛏️ ${t('realestate.room_distribution')}:\n`;
    if (data.bedrooms) description += `🛏️ ${t('realestate.bedrooms')}: ${data.bedrooms}\n`;
    if (data.livingRooms) description += `🛋️ ${t('realestate.living_rooms')}: ${data.livingRooms}\n`;
    if (data.bathrooms) description += `🚿 ${t('realestate.bathrooms')}: ${data.bathrooms}\n`;
    if (data.kitchens) description += `🍳 ${t('realestate.kitchens')}: ${data.kitchens}\n`;
    if (data.hasBalcony) description += `🌅 ${t('realestate.has_balcony')}: ${yn(data.hasBalcony, t)}\n`;
    if (data.hasRoof) description += `🏠 ${t('realestate.has_roof')}: ${yn(data.hasRoof, t)}\n`;
    description += "\n";

    // التشطيبات
    if (data.flooring || data.wallFinish || data.kitchenFinish || data.bathroomFinish || data.doors || data.windows) {
      description += `✨ ${t('realestate.finishes')}:\n`;
      if (data.flooring) description += `🏠 ${t('realestate.flooring')}: ${data.flooring}\n`;
      if (data.wallFinish) description += `🧱 ${t('realestate.wall_finish')}: ${data.wallFinish}\n`;
      if (data.kitchenFinish) description += `🍳 ${t('realestate.kitchen_finish')}: ${data.kitchenFinish}\n`;
      if (data.bathroomFinish) description += `🚿 ${t('realestate.bathroom_finish')}: ${data.bathroomFinish}\n`;
      if (data.doors) description += `🚪 ${t('realestate.doors')}: ${data.doors}\n`;
      if (data.windows) description += `🪟 ${t('realestate.windows')}: ${data.windows}\n`;
      if (data.airConditioning) description += `❄️ ${t('realestate.air_conditioning')}: ${data.airConditioning}\n`;
      description += "\n";
    }

    // المرافق
    if (data.hasElevator || data.hasParking || data.isFurnished || (data.nearbyServices && data.nearbyServices.length > 0)) {
      description += `🏢 ${t('realestate.facilities')}:\n`;
      if (data.hasElevator) description += `🛗 ${t('realestate.has_elevator')}: ${yn(data.hasElevator, t)}\n`;
      if (data.hasParking) description += `🚗 ${t('realestate.has_parking')}: ${yn(data.hasParking, t)}\n`;
      if (data.isFurnished) description += `🪑 ${t('realestate.is_furnished')}: ${yn(data.isFurnished, t)}\n`;
      
      if (data.nearbyServices && data.nearbyServices.length > 0) {
        description += `${t('realestate.nearby_services')}:\n`;
        data.nearbyServices.forEach((service: string) => {
          description += `• ${service}\n`;
        });
      }
      description += "\n";
    }
    
    // فكرة عن الجيران والمكان
    if (data.neighborhoodType || data.neighborsType || data.noiseLevel || data.safetyLevel) {
      description += `🏘️ ${t('realestate.neighborhood_info')}:\n`;
      if (data.neighborhoodType) description += `🏠 ${t('realestate.neighborhood_type')}: ${data.neighborhoodType}\n`;
      if (data.neighborsType) description += `👨‍👩‍👦 ${t('realestate.neighbors_type')}: ${data.neighborsType}\n`;
      if (data.noiseLevel) description += `🔊 ${t('realestate.noise_level')}: ${data.noiseLevel}\n`;
      if (data.safetyLevel) description += `🛡️ ${t('realestate.safety_level')}: ${data.safetyLevel}\n`;
      description += "\n";
    }
    
    // السعر والتعامل
    if (data.price || data.isNegotiable || data.readyToMove || data.contactMethod) {
      description += `💰 ${t('realestate.price_contact')}:\n`;
      if (data.price) description += `💰 ${t('form.price')}: ${data.price}`;
      if (data.isNegotiable) description += ` - ${yn(data.isNegotiable, t) === t('options.yes') ? t('realestate.negotiable') : t('realestate.not_negotiable')}`;
      if (data.price) description += "\n";
      if (data.readyToMove) description += `🗝️ ${t('realestate.ready_to_move')}: ${yn(data.readyToMove, t)}\n`;
      if (data.contactMethod) description += `📞 ${t('description.contact_method')}: ${data.contactMethod}\n`;
      description += "\n";
    }
    
    // أوقات المعاينة
    if (data.inspectionTimes) {
      description += `⏰ ${t('realestate.inspection_times')}: ${data.inspectionTimes}\n\n`;
    }
    
    // سبب البيع
    if (data.sellReason) {
      description += `📝 ${t('realestate.sell_reason')}: ${data.sellReason}\n\n`;
    }
    
    // العملاء غير المرغوبين
    if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
      description += `🚫 ${t('common.unwanted_customers')}:\n`;
      data.unwantedCustomers.forEach((customer: string) => {
        description += `• ${customer}\n`;
      });
      description += "\n";
    }

    // ملاحظات إضافية
    if (data.additionalNotes) {
      description += `📝 ${t('common.additional_notes')}:\n${data.additionalNotes}\n\n`;
    }

    description += `${t('description.contact_info')}\n`;
    description += `${t('description.thank_you')} 🙏`;

    return description;
  };

  const generatedDescription = generateRealEstateDescription(realEstateData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      toast({
        title: t('messages.copied_success'),
        description: t('messages.description_copied'),
      });
    } catch (err) {
      console.error("فشل في نسخ النص:", err);
      toast({
        variant: "destructive",
        title: t('messages.copy_error'),
        description: t('messages.copy_failed'),
      });
    }
  };

  const handleSave = () => {
    try {
      const title = generateTitleFromData('real-estate', realEstateData);
      saveDescription('real-estate', title, generatedDescription, realEstateData);
      toast({
        title: t('messages.saved_success'),
        description: t('messages.description_saved'),
      });
    } catch (err) {
      console.error("فشل في حفظ الوصف:", err);
      toast({
        variant: "destructive",
        title: t('messages.save_error'),
        description: t('messages.save_failed'),
      });
    }
  };

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
        <div>
          <h2 className="text-xl font-bold text-foreground">{t('description.real_estate_title')}</h2>
          <p className="text-muted-foreground text-sm">{t('description.comprehensive_description')}</p>
        </div>
        </div>
      </div>
      
      <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
          {generatedDescription}
        </div>
      </div>
      
      <div className="space-y-3">
        <Button onClick={handleSave} className="w-full bg-success hover:bg-success/90 text-success-foreground">
          <Star className="w-4 h-4 ml-2" />
          {t('actions.save')}
        </Button>
        
        <Button onClick={handleCopy} variant="outline" className="w-full">
          <Copy className="w-4 h-4 ml-2" />
          {t('actions.copy')}
        </Button>
        
        <Button onClick={onNewDescription} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 ml-2" />
          {t('actions.edit_info')}
        </Button>
      </div>
      
      <div className="mt-8 bg-accent rounded-lg p-4">
        <p className="text-xs text-muted-foreground text-center">
          {t('description.auto_generated_note')}
        </p>
      </div>
    </div>
  );
};

export default RealEstateDescriptionPage;