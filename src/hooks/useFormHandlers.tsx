import { useState } from 'react';

export const useFormHandlers = (setCurrentPage: (page: string) => void) => {
  const [carFormData, setCarFormData] = useState<any>(null);
  const [phoneFormData, setPhoneFormData] = useState<any>(null);
  const [realEstateFormData, setRealEstateFormData] = useState<any>(null);
  const [tenantFormData, setTenantFormData] = useState<any>(null);
  const [tabletFormData, setTabletFormData] = useState<any>(null);
  const [bicycleFormData, setBicycleFormData] = useState<any>(null);
  const [motorcycleFormData, setMotorcycleFormData] = useState<any>(null);
  const [clothingFormData, setClothingFormData] = useState<any>(null);

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

  return {
    carFormData,
    phoneFormData,
    realEstateFormData,
    tenantFormData,
    tabletFormData,
    bicycleFormData,
    motorcycleFormData,
    clothingFormData,
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