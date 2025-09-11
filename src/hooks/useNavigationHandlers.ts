import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const useNavigationHandlers = () => {
  const {
    setCurrentPage,
    setActiveTab,
    setSelectedCategory,
    setViewingItem,
  } = useAppStore();

  const handleNavigate = useCallback((page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
      // Navigate to specific forms based on category
      if (page === 'create-description') {
        switch (category) {
          case 'cars':
            setCurrentPage('car-form');
            break;
          case 'phones':
            setCurrentPage('phone-form');
            break;
          case 'real-estate':
            setCurrentPage('real-estate-form');
            break;
          case 'tenant':
            setCurrentPage('tenant-form');
            break;
          case 'tablet':
            setCurrentPage('tablet-form');
            break;
          case 'bicycle':
            setCurrentPage('bicycle-form');
            break;
          case 'motorcycle':
            setCurrentPage('motorcycle-form');
            break;
          case 'clothing':
            setCurrentPage('clothing-form');
            break;
        }
      }
    }
  }, [setCurrentPage, setSelectedCategory]);

  const handleBack = useCallback(() => {
    const { currentPage } = useAppStore.getState();
    
    switch (currentPage) {
      case 'create-description':
      case 'free-writing':
      case 'question-bank':
      case 'saved':
      case 'settings':
        setCurrentPage('home');
        setActiveTab('home');
        break;
      case 'car-description':
      case 'phone-description':
      case 'real-estate-description':
      case 'tenant-description':
      case 'bicycle-description':
      case 'motorcycle-description':
      case 'clothing-description':
      case 'tablet-description':
        setCurrentPage('create-description');
        break;
      case 'car-questions':
      case 'phone-questions':
      case 'real-estate-questions':
        setCurrentPage('question-bank');
        break;
      case 'car-form':
      case 'phone-form':
      case 'real-estate-form':
      case 'tenant-form':
      case 'tablet-form':
      case 'bicycle-form':
      case 'motorcycle-form':
      case 'clothing-form':
        setCurrentPage('create-description');
        break;
      case 'view-saved-item':
        setCurrentPage('saved');
        break;
      default:
        setCurrentPage('home');
        setActiveTab('home');
    }
  }, [setCurrentPage, setActiveTab]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  }, [setActiveTab, setCurrentPage]);

  const handleViewSavedItem = useCallback((item: any) => {
    setViewingItem(item);
    setCurrentPage('view-saved-item');
  }, [setViewingItem, setCurrentPage]);

  const handleBackFromViewItem = useCallback(() => {
    setCurrentPage('saved');
    setViewingItem(null);
  }, [setCurrentPage, setViewingItem]);

  const handleQuestionBankCategory = useCallback((category: string) => {
    if (category === 'cars') {
      setCurrentPage('car-questions');
    } else if (category === 'phones') {
      setCurrentPage('phone-questions');
    } else if (category === 'real-estate') {
      setCurrentPage('real-estate-questions');
    }
  }, [setCurrentPage]);

  return {
    handleNavigate,
    handleBack,
    handleTabChange,
    handleViewSavedItem,
    handleBackFromViewItem,
    handleQuestionBankCategory
  };
};