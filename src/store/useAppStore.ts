import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  currentPage: string;
  activeTab: string;
  selectedCategory: string | null;
  viewingItem: any;
}

interface FormData {
  carFormData: any;
  phoneFormData: any;
  realEstateFormData: any;
  tenantFormData: any;
  tabletFormData: any;
  bicycleFormData: any;
  motorcycleFormData: any;
  clothingFormData: any;
}

interface AppState extends NavigationState, FormData {
  // Navigation actions
  setCurrentPage: (page: string) => void;
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setViewingItem: (item: any) => void;
  
  // Form actions
  setCarFormData: (data: any) => void;
  setPhoneFormData: (data: any) => void;
  setRealEstateFormData: (data: any) => void;
  setTenantFormData: (data: any) => void;
  setTabletFormData: (data: any) => void;
  setBicycleFormData: (data: any) => void;
  setMotorcycleFormData: (data: any) => void;
  setClothingFormData: (data: any) => void;
  
  // Reset functions
  resetNavigation: () => void;
  resetFormData: () => void;
}

const initialState = {
  // Navigation state
  currentPage: 'home',
  activeTab: 'home',
  selectedCategory: null,
  viewingItem: null,
  
  // Form data
  carFormData: {},
  phoneFormData: {},
  realEstateFormData: {},
  tenantFormData: {},
  tabletFormData: {},
  bicycleFormData: {},
  motorcycleFormData: {},
  clothingFormData: {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Navigation actions
      setCurrentPage: (page: string) => set({ currentPage: page }),
      setActiveTab: (tab: string) => set({ activeTab: tab }),
      setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),
      setViewingItem: (item: any) => set({ viewingItem: item }),
      
      // Form actions
      setCarFormData: (data: any) => set({ carFormData: data }),
      setPhoneFormData: (data: any) => set({ phoneFormData: data }),
      setRealEstateFormData: (data: any) => set({ realEstateFormData: data }),
      setTenantFormData: (data: any) => set({ tenantFormData: data }),
      setTabletFormData: (data: any) => set({ tabletFormData: data }),
      setBicycleFormData: (data: any) => set({ bicycleFormData: data }),
      setMotorcycleFormData: (data: any) => set({ motorcycleFormData: data }),
      setClothingFormData: (data: any) => set({ clothingFormData: data }),
      
      // Reset functions
      resetNavigation: () => set({
        currentPage: 'home',
        activeTab: 'home',
        selectedCategory: null,
        viewingItem: null,
      }),
      resetFormData: () => set({
        carFormData: {},
        phoneFormData: {},
        realEstateFormData: {},
        tenantFormData: {},
        tabletFormData: {},
        bicycleFormData: {},
        motorcycleFormData: {},
        clothingFormData: {},
      }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        carFormData: state.carFormData,
        phoneFormData: state.phoneFormData,
        realEstateFormData: state.realEstateFormData,
        tenantFormData: state.tenantFormData,
        tabletFormData: state.tabletFormData,
        bicycleFormData: state.bicycleFormData,
        motorcycleFormData: state.motorcycleFormData,
        clothingFormData: state.clothingFormData,
      }),
    }
  )
);