import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HomePage from "./HomePage";
import CategoriesPage from "./CategoriesPage";
import DescriptionPage from "./DescriptionPage";
import QuestionBankPage from "./QuestionBankPage";
import CarQuestionsPage from "./CarQuestionsPage";
import PhoneQuestionsPage from "./PhoneQuestionsPage";
import RealEstateQuestionsPage from "./RealEstateQuestionsPage";
import CarForm from "@/components/forms/CarForm";
import PhoneForm from "@/components/forms/PhoneForm";
import RealEstateForm from "@/components/forms/RealEstateForm";
import TenantForm from "@/components/forms/TenantForm";
import TabletFormWrapper from "@/components/forms/TabletFormWrapper";
import BicycleFormWrapper from "@/components/forms/BicycleFormWrapper";
import MotorcycleFormWrapper from "@/components/forms/MotorcycleFormWrapper";
import ClothingFormWrapper from "@/components/forms/ClothingFormWrapper";
import { ComputerFormWrapper } from "@/components/forms/ComputerFormWrapper";
import CarDescriptionPage from "./CarDescriptionPage";
import PhoneDescriptionPage from "./PhoneDescriptionPage";
import RealEstateDescriptionPage from "./RealEstateDescriptionPage";
import TenantDescriptionPage from "./TenantDescriptionPage";
import TabletDescriptionPage from "./TabletDescriptionPage";
import BicycleDescriptionPage from "./BicycleDescriptionPage";
import MotorcycleDescriptionPage from "./MotorcycleDescriptionPage";
import ClothingDescriptionPage from "./ClothingDescriptionPage";
import { ComputerDescriptionPage } from "./ComputerDescriptionPage";
import FreeWritingPage from "./FreeWritingPage";
import SavedPage from "./SavedPage";
import SettingsPage from "./SettingsPage";
import TermsPage from "./TermsPage";
import PrivacyPage from "./PrivacyPage";
import ContactPage from "./ContactPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [carFormData, setCarFormData] = useState<any>(null);
  const [phoneFormData, setPhoneFormData] = useState<any>(null);
  const [realEstateFormData, setRealEstateFormData] = useState<any>(null);
  const [tenantFormData, setTenantFormData] = useState<any>(null);
  const [tabletFormData, setTabletFormData] = useState<any>(null);
  const [bicycleFormData, setBicycleFormData] = useState<any>(null);
  const [motorcycleFormData, setMotorcycleFormData] = useState<any>(null);
  const [clothingFormData, setClothingFormData] = useState<any>(null);
  const [computerFormData, setComputerFormData] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
      // Navigate to specific forms based on category
      if (category === 'cars') {
        setCurrentPage('car-form');
      } else if (category === 'phones') {
        setCurrentPage('phone-form');
      } else if (category === 'real-estate') {
        setCurrentPage('real-estate-form');
      } else if (category === 'tenant') {
        setCurrentPage('tenant-form');
      } else if (category === 'tablet') {
        setCurrentPage('tablet-form');
      } else if (category === 'bicycle') {
        setCurrentPage('bicycle-form');
      } else if (category === 'motorcycle') {
        setCurrentPage('motorcycle-form');
      } else if (category === 'clothing') {
        setCurrentPage('clothing-form');
      } else if (category === 'computer') {
        setCurrentPage('computer-form');
      }
    }
  };

  const handleBack = () => {
    if (currentPage === 'car-description') {
      setCurrentPage('car-form');
    } else if (currentPage === 'phone-description') {
      setCurrentPage('phone-form');
    } else if (currentPage === 'real-estate-description') {
      setCurrentPage('real-estate-form');
    } else if (currentPage === 'tenant-description') {
      setCurrentPage('tenant-form');
    } else if (currentPage === 'tablet-description') {
      setCurrentPage('tablet-form');
    } else if (currentPage === 'bicycle-description') {
      setCurrentPage('bicycle-form');
    } else if (currentPage === 'motorcycle-description') {
      setCurrentPage('motorcycle-form');
    } else if (currentPage === 'clothing-description') {
      setCurrentPage('clothing-form');
    } else if (currentPage === 'computer-description') {
      setCurrentPage('computer-form');
    } else if (currentPage === 'car-form' || currentPage === 'phone-form' || currentPage === 'real-estate-form' || currentPage === 'tenant-form' || currentPage === 'tablet-form' || currentPage === 'bicycle-form' || currentPage === 'motorcycle-form' || currentPage === 'clothing-form' || currentPage === 'computer-form') {
      setCurrentPage('create-description');
    } else if (currentPage === 'car-questions' || currentPage === 'phone-questions' || currentPage === 'real-estate-questions') {
      setCurrentPage('question-bank');
    } else if (currentPage === 'question-bank') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (currentPage === 'description') {
      setCurrentPage('create-description');
    } else if (currentPage === 'create-description') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (currentPage === 'terms' || currentPage === 'privacy' || currentPage === 'contact') {
      setCurrentPage('settings');
      setActiveTab('settings');
    } else if (currentPage === 'settings') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (currentPage === 'free-writing') {
      setCurrentPage('home');
      setActiveTab('home');
    }
  };

  const handleQuestionBankCategory = (category: string) => {
    if (category === 'cars') {
      setCurrentPage('car-questions');
    } else if (category === 'phones') {
      setCurrentPage('phone-questions');
    } else if (category === 'real-estate') {
      setCurrentPage('real-estate-questions');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentPage('home');
    } else if (tab === 'saved') {
      setCurrentPage('saved');
    } else if (tab === 'settings') {
      setCurrentPage('settings');
    } else {
      // For other tabs
      setCurrentPage(tab);
    }
  };

  const handleViewSavedItem = (item: any) => {
    setViewingItem(item);
    setCurrentPage('view-saved-item');
  };

  const handleBackFromViewItem = () => {
    setCurrentPage('saved');
    setActiveTab('saved');
  };

  const handleCarFormSubmit = (data: any) => {
    setCarFormData(data);
    setCurrentPage('car-description');
  };

  const handlePhoneFormSubmit = (data: any) => {
    setPhoneFormData(data);
    setCurrentPage('phone-description');
  };

  const handleRealEstateFormSubmit = (data: any) => {
    setRealEstateFormData(data);
    setCurrentPage('real-estate-description');
  };

  const handleTenantFormSubmit = (data: any) => {
    setTenantFormData(data);
    setCurrentPage('tenant-description');
  };

  const handleTabletFormSubmit = (data: any) => {
    setTabletFormData(data);
    setCurrentPage('tablet-description');
  };

  const handleBicycleFormSubmit = (data: any) => {
    setBicycleFormData(data);
    setCurrentPage('bicycle-description');
  };

  const handleMotorcycleFormSubmit = (data: any) => {
    setMotorcycleFormData(data);
    setCurrentPage('motorcycle-description');
  };

  const handleClothingFormSubmit = (data: any) => {
    setClothingFormData(data);
    setCurrentPage('clothing-description');
  };

  const handleComputerFormSubmit = (data: any) => {
    setComputerFormData(data);
    setCurrentPage('computer-description');
  };

  const handleNewCarDescription = () => {
    setCurrentPage('car-form');
  };

  const handleNewPhoneDescription = () => {
    setCurrentPage('phone-form');
  };

  const handleNewRealEstateDescription = () => {
    setCurrentPage('real-estate-form');
  };

  const handleNewTenantDescription = () => {
    setCurrentPage('tenant-form');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'question-bank':
        return <QuestionBankPage onBack={handleBack} onSelectCategory={handleQuestionBankCategory} />;
      case 'car-questions':
        return <CarQuestionsPage onBack={handleBack} />;
      case 'phone-questions':
        return <PhoneQuestionsPage onBack={handleBack} />;
      case 'real-estate-questions':
        return <RealEstateQuestionsPage onBack={handleBack} />;
      case 'create-description':
        return <CategoriesPage onNavigate={handleNavigate} onBack={handleBack} />;
      case 'car-form':
        return <CarForm onBack={handleBack} onGenerateDescription={handleCarFormSubmit} />;
      case 'phone-form':
        return <PhoneForm onBack={handleBack} onGenerateDescription={handlePhoneFormSubmit} />;
      case 'real-estate-form':
        return <RealEstateForm onBack={handleBack} onGenerateDescription={handleRealEstateFormSubmit} />;
      case 'tenant-form':
        return <TenantForm onBack={handleBack} onGenerateDescription={handleTenantFormSubmit} />;
      case 'tablet-form':
        return <TabletFormWrapper onBack={handleBack} onGenerateDescription={handleTabletFormSubmit} />;
      case 'bicycle-form':
        return <BicycleFormWrapper onBack={handleBack} onGenerateDescription={handleBicycleFormSubmit} />;
      case 'motorcycle-form':
        return <MotorcycleFormWrapper onBack={handleBack} onGenerateDescription={handleMotorcycleFormSubmit} />;
      case 'clothing-form':
        return <ClothingFormWrapper onBack={handleBack} onGenerateDescription={handleClothingFormSubmit} />;
      case 'computer-form':
        return <ComputerFormWrapper onBack={handleBack} onGenerateDescription={handleComputerFormSubmit} />;
      case 'car-description':
        return (
          <CarDescriptionPage 
            carData={carFormData} 
            onBack={handleBack}
            onNewDescription={handleNewCarDescription}
          />
        );
      case 'phone-description':
        return (
          <PhoneDescriptionPage 
            phoneData={phoneFormData} 
            onBack={handleBack}
            onNewDescription={handleNewPhoneDescription}
          />
        );
      case 'real-estate-description':
        return (
          <RealEstateDescriptionPage 
            realEstateData={realEstateFormData} 
            onBack={handleBack}
            onNewDescription={handleNewRealEstateDescription}
          />
        );
      case 'tenant-description':
        return (
          <TenantDescriptionPage 
            tenantData={tenantFormData} 
            onBack={handleBack}
            onNewDescription={handleNewTenantDescription}
          />
        );
      case 'tablet-description':
        return <TabletDescriptionPage data={tabletFormData} onBack={handleBack} onNewDescription={() => setCurrentPage('tablet-form')} />;
      case 'bicycle-description':
        return <BicycleDescriptionPage data={bicycleFormData} onBack={handleBack} onNewDescription={() => setCurrentPage('bicycle-form')} />;
      case 'motorcycle-description':
        return <MotorcycleDescriptionPage data={motorcycleFormData} onBack={handleBack} onNewDescription={() => setCurrentPage('motorcycle-form')} />;
      case 'clothing-description':
        return <ClothingDescriptionPage data={clothingFormData} onBack={handleBack} onNewDescription={() => setCurrentPage('clothing-form')} />;
      case 'computer-description':
        return <ComputerDescriptionPage data={computerFormData} onBack={handleBack} onNewDescription={() => setCurrentPage('computer-form')} />;
      case 'free-writing':
        return <FreeWritingPage onBack={handleBack} />;
      case 'description':
        return <DescriptionPage category={selectedCategory} onBack={handleBack} />;
      case 'saved':
        return <SavedPage onViewItem={handleViewSavedItem} />;
      case 'view-saved-item':
        return (
          <div className="page-content">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBackFromViewItem}
                className="touch-button bg-accent hover:bg-surface -mr-2"
              >
                <ChevronRight className="w-5 h-5 text-accent-foreground" />
              </button>
              <div className="flex items-center gap-2">
                 <span className="text-2xl">
                   {viewingItem?.type === 'car' ? '🚗' : 
                    viewingItem?.type === 'phone' ? '📱' : 
                    viewingItem?.type === 'tenant' ? '📋' : 
                    viewingItem?.type === 'computer' ? '💻' :
                    viewingItem?.type === 'free-writing' ? '✍️' : '🏠'}
                 </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{viewingItem?.title}</h2>
                  <p className="text-muted-foreground text-sm">وصف محفوظ</p>
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
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onBack={handleBack} />;
      case 'privacy':
        return <PrivacyPage onBack={handleBack} />;
      case 'contact':
        return <ContactPage onBack={handleBack} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="mobile-container">
      <Header />
      <main className="bg-surface min-h-screen">
        {renderCurrentPage()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;