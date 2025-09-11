import { memo } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageRenderer from "@/components/PageRenderer";
import { useAppStore } from "@/store/useAppStore";
import { useNavigationHandlers } from "@/hooks/useNavigationHandlers";
import { useFormHandlers } from "@/hooks/useFormHandlers";

const Index = memo(() => {
  const {
    currentPage,
    activeTab,
    selectedCategory,
    viewingItem,
    carFormData,
    phoneFormData,
    realEstateFormData,
    tenantFormData,
    tabletFormData,
    bicycleFormData,
    motorcycleFormData,
    clothingFormData,
    setCurrentPage,
  } = useAppStore();

  const {
    handleNavigate,
    handleBack,
    handleTabChange,
    handleViewSavedItem,
    handleBackFromViewItem,
    handleQuestionBankCategory
  } = useNavigationHandlers();

  const {
    handleCarFormSubmit,
    handlePhoneFormSubmit,
    handleRealEstateFormSubmit,
    handleTenantFormSubmit,
    handleTabletFormSubmit,
    handleBicycleFormSubmit,
    handleMotorcycleFormSubmit,
    handleClothingFormSubmit,
    handleNewCarDescription,
    handleNewPhoneDescription,
    handleNewRealEstateDescription,
    handleNewTenantDescription
  } = useFormHandlers();


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
          bicycleFormData={bicycleFormData}
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
          onBicycleFormSubmit={handleBicycleFormSubmit}
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
});

Index.displayName = 'Index';

export default Index;