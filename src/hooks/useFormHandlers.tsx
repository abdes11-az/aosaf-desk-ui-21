import { useState } from 'react';

export const useFormHandlers = (setCurrentPage: (page: string) => void) => {
  const [carFormData, setCarFormData] = useState<any>(null);
  const [phoneFormData, setPhoneFormData] = useState<any>(null);
  const [realEstateFormData, setRealEstateFormData] = useState<any>(null);
  const [tenantFormData, setTenantFormData] = useState<any>(null);
  const [clothingFormData, setClothingFormData] = useState<any>(null);
  const [productFormData, setProductFormData] = useState<any>(null);

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


  const handleClothingFormSubmit = (data: any) => {
    setClothingFormData(data);
    setCurrentPage('clothing-description');
  };

  const handleProductFormSubmit = (data: any) => {
    setProductFormData(data);
    setCurrentPage('product-description');
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

  const handleNewProductDescription = () => {
    setCurrentPage('product-form');
  };

  return {
    carFormData,
    phoneFormData,
    realEstateFormData,
    tenantFormData,
    clothingFormData,
    productFormData,
    handleCarFormSubmit,
    handlePhoneFormSubmit,
    handleRealEstateFormSubmit,
    handleTenantFormSubmit,
    handleClothingFormSubmit,
    handleProductFormSubmit,
    handleNewCarDescription,
    handleNewPhoneDescription,
    handleNewRealEstateDescription,
    handleNewTenantDescription,
    handleNewProductDescription
  };
};