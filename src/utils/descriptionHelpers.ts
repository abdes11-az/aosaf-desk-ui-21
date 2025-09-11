// Simple helper functions to replace i18n helpers
export const formatValue = (value: any): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return String(value ?? '');
};

export const formatYesNo = (value: any): string => {
  if (!value) return '';
  const str = String(value).trim().toLowerCase();
  if (['نعم', 'yes', 'true', '1'].includes(str)) return 'نعم';
  if (['لا', 'no', 'false', '0'].includes(str)) return 'لا';
  return formatValue(value);
};

export const formatCondition = (value: any): string => {
  if (!value) return '';
  const str = String(value).trim().toLowerCase();
  
  const conditionMap: Record<string, string> = {
    'new': 'جديد',
    'used': 'مستعمل',
    'excellent': 'ممتاز',
    'good': 'جيد',
    'fair': 'مقبول',
    'like-new': 'كالجديد'
  };
  
  return conditionMap[str] || formatValue(value);
};