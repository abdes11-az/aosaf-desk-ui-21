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
    // صفحات الوصف ترجع لصفحات النماذج
    const descriptionToFormMap: Record<string, string> = {
      'car-description': 'car-form',
      'phone-description': 'phone-form',
      'real-estate-description': 'real-estate-form',
      'tenant-description': 'tenant-form',
      'tablet-description': 'tablet-form',
      'bicycle-description': 'bicycle-form',
      'motorcycle-description': 'motorcycle-form',
      'clothing-description': 'clothing-form'
    };

    // النماذج ترجع لصفحة إنشاء الوصف
    const forms = ['car-form', 'phone-form', 'real-estate-form', 'tenant-form', 'tablet-form', 'bicycle-form', 'motorcycle-form', 'clothing-form'];
    
    // أسئلة ترجع لبنك الأسئلة
    const questions = ['car-questions', 'phone-questions', 'real-estate-questions'];
    
    // صفحات الإعدادات
    const settingsPages = ['terms', 'privacy', 'contact'];

    if (descriptionToFormMap[currentPage]) {
      setCurrentPage(descriptionToFormMap[currentPage]);
    } else if (forms.includes(currentPage)) {
      setCurrentPage('create-description');
    } else if (questions.includes(currentPage)) {
      setCurrentPage('question-bank');
    } else if (currentPage === 'question-bank') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (currentPage === 'description') {
      setCurrentPage('create-description');
    } else if (currentPage === 'create-description') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (settingsPages.includes(currentPage)) {
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