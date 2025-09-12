import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageRenderer from "@/components/PageRenderer";
import { useNavigation } from "@/hooks/useNavigation";
import { useFormHandlers } from "@/hooks/useFormHandlers";

const Index = () => {
  const {
    currentPage,
    activeTab,
    selectedCategory,
    viewingItem,
    setCurrentPage,
    handleNavigate,
    handleBack,
    handleTabChange,
    handleViewSavedItem,
    handleBackFromViewItem
  } = useNavigation();

  const {
    carFormData,
    phoneFormData,
    realEstateFormData,
    tenantFormData,
    tabletFormData,
    
    motorcycleFormData,
    clothingFormData,
    handleCarFormSubmit,
    handlePhoneFormSubmit,
    handleRealEstateFormSubmit,
    handleTenantFormSubmit,
    handleTabletFormSubmit,
    
    handleMotorcycleFormSubmit,
    handleClothingFormSubmit,
    handleNewCarDescription,
    handleNewPhoneDescription,
    handleNewRealEstateDescription,
    handleNewTenantDescription
  } = useFormHandlers(setCurrentPage);

  const handleQuestionBankCategory = (category: string) => {
    if (category === 'cars') {
      setCurrentPage('car-questions');
    } else if (category === 'phones') {
      setCurrentPage('phone-questions');
    } else if (category === 'real-estate') {
      setCurrentPage('real-estate-questions');
    }
  };

  return (
    <div className="mobile-container">
      <Header />
      <main className="bg-surface min-h-screen">
        <PageRenderer
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          viewingItem={viewingItem}
          carFormData={carFormData}
          phoneFormData={phoneFormData}
          realEstateFormData={realEstateFormData}
          tenantFormData={tenantFormData}
          tabletFormData={tabletFormData}
          
          motorcycleFormData={motorcycleFormData}
          clothingFormData={clothingFormData}
          onNavigate={handleNavigate}
          onBack={handleBack}
          onQuestionBankCategory={handleQuestionBankCategory}
          onViewSavedItem={handleViewSavedItem}
          onBackFromViewItem={handleBackFromViewItem}
          onCarFormSubmit={handleCarFormSubmit}
          onPhoneFormSubmit={handlePhoneFormSubmit}
          onRealEstateFormSubmit={handleRealEstateFormSubmit}
          onTenantFormSubmit={handleTenantFormSubmit}
          onTabletFormSubmit={handleTabletFormSubmit}
          
          onMotorcycleFormSubmit={handleMotorcycleFormSubmit}
          onClothingFormSubmit={handleClothingFormSubmit}
          onNewCarDescription={handleNewCarDescription}
          onNewPhoneDescription={handleNewPhoneDescription}
          onNewRealEstateDescription={handleNewRealEstateDescription}
          onNewTenantDescription={handleNewTenantDescription}
        />
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;