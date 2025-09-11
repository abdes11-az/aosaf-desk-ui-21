import { useState } from 'react';

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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
    } else if (currentPage === 'car-form' || currentPage === 'phone-form' || currentPage === 'real-estate-form' || currentPage === 'tenant-form' || currentPage === 'tablet-form' || currentPage === 'bicycle-form' || currentPage === 'motorcycle-form' || currentPage === 'clothing-form') {
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentPage('home');
    } else if (tab === 'saved') {
      setCurrentPage('saved');
    } else if (tab === 'settings') {
      setCurrentPage('settings');
    } else {
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

  return {
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
  };
};