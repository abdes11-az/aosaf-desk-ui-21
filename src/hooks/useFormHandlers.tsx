import { useCallback } from 'react';
import { saveDescription } from '@/utils/saveSystem';
import { toast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/useAppStore';

export const useFormHandlers = () => {
  const {
    carFormData,
    phoneFormData,
    realEstateFormData,
    tenantFormData,
    tabletFormData,
    bicycleFormData,
    motorcycleFormData,
    clothingFormData,
    setCarFormData,
    setPhoneFormData,
    setRealEstateFormData,
    setTenantFormData,
    setTabletFormData,
    setBicycleFormData,
    setMotorcycleFormData,
    setClothingFormData,
    setCurrentPage
  } = useAppStore();

  const handleCarFormSubmit = useCallback((data: any) => {
    setCarFormData(data);
    setCurrentPage('car-description');
  }, [setCarFormData, setCurrentPage]);

  const handlePhoneFormSubmit = useCallback((data: any) => {
    setPhoneFormData(data);
    setCurrentPage('phone-description');
  }, [setPhoneFormData, setCurrentPage]);

  const handleRealEstateFormSubmit = useCallback((data: any) => {
    setRealEstateFormData(data);
    setCurrentPage('real-estate-description');
  }, [setRealEstateFormData, setCurrentPage]);

  const handleTenantFormSubmit = useCallback((data: any) => {
    setTenantFormData(data);
    setCurrentPage('tenant-description');
  }, [setTenantFormData, setCurrentPage]);

  const handleTabletFormSubmit = useCallback((data: any) => {
    setTabletFormData(data);
    setCurrentPage('tablet-description');
  }, [setTabletFormData, setCurrentPage]);

  const handleBicycleFormSubmit = useCallback((data: any) => {
    setBicycleFormData(data);
    setCurrentPage('bicycle-description');
  }, [setBicycleFormData, setCurrentPage]);

  const handleMotorcycleFormSubmit = useCallback((data: any) => {
    setMotorcycleFormData(data);
    setCurrentPage('motorcycle-description');
  }, [setMotorcycleFormData, setCurrentPage]);

  const handleClothingFormSubmit = useCallback((data: any) => {
    setClothingFormData(data);
    setCurrentPage('clothing-description');
  }, [setClothingFormData, setCurrentPage]);

  const handleNewCarDescription = useCallback(() => {
    setCurrentPage('car-form');
  }, [setCurrentPage]);

  const handleNewPhoneDescription = useCallback(() => {
    setCurrentPage('phone-form');
  }, [setCurrentPage]);

  const handleNewRealEstateDescription = useCallback(() => {
    setCurrentPage('real-estate-form');
  }, [setCurrentPage]);

  const handleNewTenantDescription = useCallback(() => {
    setCurrentPage('tenant-form');
  }, [setCurrentPage]);

  return {
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
  };
};