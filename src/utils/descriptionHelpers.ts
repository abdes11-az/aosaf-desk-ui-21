// وظائف مساعدة لتنسيق البيانات في الأوصاف
export const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') return '';
  return String(value);
};

export const formatYesNo = (value: any): string => {
  if (value === 'نعم' || value === 'yes' || value === true) return 'نعم';
  if (value === 'لا' || value === 'no' || value === false) return 'لا';
  return formatValue(value);
};

export const formatCondition = (value: any): string => {
  const conditions: Record<string, string> = {
    'new': 'جديد',
    'جديد': 'جديد',
    'used': 'مستعمل',
    'مستعمل': 'مستعمل',
    'like-new': 'كالجديد',
    'كالجديد': 'كالجديد',
    'excellent': 'ممتاز',
    'ممتاز': 'ممتاز',
    'good': 'جيد',
    'جيد': 'جيد',
    'fair': 'مقبول',
    'مقبول': 'مقبول'
  };
  
  return conditions[value] || formatValue(value);
};

export const formatOption = (value: any): string => {
  const options: Record<string, string> = {
    'available': 'متوفر',
    'متوفر': 'متوفر',
    'not_available': 'غير متوفر',
    'غير متوفر': 'غير متوفر',
    'person': 'شخص',
    'شخص': 'شخص',
    'shop': 'محل',
    'محل': 'محل',
    'company': 'شركة',
    'شركة': 'شركة',
    'delivery': 'توصيل',
    'توصيل': 'توصيل',
    'pickup': 'استلام شخصي',
    'استلام شخصي': 'استلام شخصي'
  };
  
  return options[value] || formatValue(value);
};