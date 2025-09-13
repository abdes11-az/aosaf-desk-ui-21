import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HomePage from "@/pages/HomePage";
import CategoriesPage from "@/pages/CategoriesPage";
import DescriptionPage from "@/pages/DescriptionPage";
import QuestionBankPage from "@/pages/QuestionBankPage";
import CarQuestionsPage from "@/pages/CarQuestionsPage";
import PhoneQuestionsPage from "@/pages/PhoneQuestionsPage";
import RealEstateQuestionsPage from "@/pages/RealEstateQuestionsPage";
import CarForm from "@/components/forms/CarForm";
import PhoneForm from "@/components/forms/PhoneForm";
import RealEstateForm from "@/components/forms/RealEstateForm";
import TenantForm from "@/components/forms/TenantForm";
import ClothingFormWrapper from "@/components/forms/ClothingFormWrapper";
import CarDescriptionPage from "@/pages/CarDescriptionPage";
import PhoneDescriptionPage from "@/pages/PhoneDescriptionPage";
import RealEstateDescriptionPage from "@/pages/RealEstateDescriptionPage";
import TenantDescriptionPage from "@/pages/TenantDescriptionPage";
import ClothingDescriptionPage from "@/pages/ClothingDescriptionPage";
import ProductForm from "@/components/forms/ProductForm";
import FreeWritingPage from "@/pages/FreeWritingPage";
import SavedPage from "@/pages/SavedPage";
import SettingsPage from "@/pages/SettingsPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ContactPage from "@/pages/ContactPage";

interface PageRendererProps {
  currentPage: string;
  selectedCategory: string;
  viewingItem: any;
  carFormData: any;
  phoneFormData: any;
  realEstateFormData: any;
  tenantFormData: any;
  clothingFormData: any;
  onNavigate: (page: string, category?: string) => void;
  onBack: () => void;
  onQuestionBankCategory: (category: string) => void;
  onViewSavedItem: (item: any) => void;
  onBackFromViewItem: () => void;
  onCarFormSubmit: (data: any) => void;
  onPhoneFormSubmit: (data: any) => void;
  onRealEstateFormSubmit: (data: any) => void;
  onTenantFormSubmit: (data: any) => void;
  onClothingFormSubmit: (data: any) => void;
  onNewCarDescription: () => void;
  onNewPhoneDescription: () => void;
  onNewRealEstateDescription: () => void;
  onNewTenantDescription: () => void;
}

const PageRenderer = ({
  currentPage,
  selectedCategory,
  viewingItem,
  carFormData,
  phoneFormData,
  realEstateFormData,
  tenantFormData,
  clothingFormData,
  onNavigate,
  onBack,
  onQuestionBankCategory,
  onViewSavedItem,
  onBackFromViewItem,
  onCarFormSubmit,
  onPhoneFormSubmit,
  onRealEstateFormSubmit,
  onTenantFormSubmit,
  onClothingFormSubmit,
  onNewCarDescription,
  onNewPhoneDescription,
  onNewRealEstateDescription,
  onNewTenantDescription
}: PageRendererProps) => {
  const { t } = useLanguage();
  
  switch (currentPage) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'question-bank':
      return <QuestionBankPage onBack={onBack} onSelectCategory={onQuestionBankCategory} />;
    case 'car-questions':
      return <CarQuestionsPage onBack={onBack} />;
    case 'phone-questions':
      return <PhoneQuestionsPage onBack={onBack} />;
    case 'real-estate-questions':
      return <RealEstateQuestionsPage onBack={onBack} />;
    case 'create-description':
      return <CategoriesPage onNavigate={onNavigate} onBack={onBack} />;
    case 'car-form':
      return <CarForm onBack={onBack} onGenerateDescription={onCarFormSubmit} />;
    case 'phone-form':
      return <PhoneForm onBack={onBack} onGenerateDescription={onPhoneFormSubmit} />;
    case 'real-estate-form':
      return <RealEstateForm onBack={onBack} onGenerateDescription={onRealEstateFormSubmit} />;
    case 'tenant-form':
      return <TenantForm onBack={onBack} onGenerateDescription={onTenantFormSubmit} />;
    case 'clothing-form':
      return <ClothingFormWrapper onBack={onBack} onGenerateDescription={onClothingFormSubmit} />;
    case 'car-description':
      return (
        <CarDescriptionPage 
          carData={carFormData} 
          onBack={onBack}
          onNewDescription={onNewCarDescription}
        />
      );
    case 'phone-description':
      return (
        <PhoneDescriptionPage 
          phoneData={phoneFormData} 
          onBack={onBack}
          onNewDescription={onNewPhoneDescription}
        />
      );
    case 'real-estate-description':
      return (
        <RealEstateDescriptionPage 
          realEstateData={realEstateFormData} 
          onBack={onBack}
          onNewDescription={onNewRealEstateDescription}
        />
      );
    case 'tenant-description':
      return (
        <TenantDescriptionPage 
          tenantData={tenantFormData} 
          onBack={onBack}
          onNewDescription={onNewTenantDescription}
        />
      );
    case 'clothing-description':
      return <ClothingDescriptionPage data={clothingFormData} onBack={onBack} onNewDescription={() => onNavigate('clothing-form')} />;
    case 'product-form':
      return <ProductForm onBack={onBack} />;
    case 'free-writing':
      return <FreeWritingPage onBack={onBack} />;
    case 'description':
      return <DescriptionPage category={selectedCategory} onBack={onBack} />;
    case 'saved':
      return <SavedPage onViewItem={onViewSavedItem} />;
    case 'view-saved-item':
      return (
        <div className="page-content">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={onBackFromViewItem}
              className="touch-button bg-accent hover:bg-surface -mr-2"
            >
              <ChevronRight className="w-5 h-5 text-accent-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {viewingItem?.type === 'car' ? '🚗' : 
                 viewingItem?.type === 'phone' ? '📱' : 
                 viewingItem?.type === 'tenant' ? '📋' : 
                 viewingItem?.type === 'free-writing' ? '✍️' : '🏠'}
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">{viewingItem?.title}</h2>
                <p className="text-muted-foreground text-sm">{t('app.saved_description')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-card-border rounded-lg p-6 mb-6">
            <div className="whitespace-pre-line text-card-foreground leading-relaxed text-sm">
              {viewingItem?.description}
            </div>
          </div>
        </div>
      );
    case 'settings':
      return <SettingsPage onNavigate={onNavigate} />;
    case 'terms':
      return <TermsPage onBack={onBack} />;
    case 'privacy':
      return <PrivacyPage onBack={onBack} />;
    case 'contact':
      return <ContactPage onBack={onBack} />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
};

export default PageRenderer;