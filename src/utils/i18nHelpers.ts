import { TFunction } from 'i18next';

// Normalize value to compare easily
const norm = (v: any) => (typeof v === 'string' ? v.trim().toLowerCase() : v);

export const isYes = (v: any): boolean => {
  const n = norm(v);
  return n === 'نعم' || n === 'yes' || n === 'ايوا' || n === 'ايوه' || n === 'أيوة' || n === 'اي' || n === 'إي' || n === 'اه' || n === 'آه' || n === 'أجل';
};

export const isNo = (v: any): boolean => {
  const n = norm(v);
  return n === 'لا' || n === 'no' || n === 'لأ' || n === 'مو' || n === 'مش';
};

export const yn = (v: any, t: TFunction): string => {
  if (isYes(v)) return t('options.yes');
  if (isNo(v)) return t('options.no');
  return typeof v === 'string' ? v : String(v ?? '');
};

// Common option translator (seller type, delivery, availability, negotiable variants, partial, etc.)
export const opt = (v: any, t: TFunction): string => {
  const n = norm(v);
  switch (n) {
    // Availability
    case 'متوفر':
    case 'متوفرة':
    case 'available':
      return t('options.available');
    case 'غير متوفر':
    case 'غير متوفرة':
    case 'not available':
    case 'not_available':
      return t('options.not_available');
    case 'منتهي':
    case 'expired':
      return t('options.expired');

    // Seller type
    case 'شخص':
    case 'person':
      return t('options.person');
    case 'محل':
    case 'shop':
      return t('options.shop');
    case 'شركة':
    case 'company':
      return t('options.company');
    case 'وسيط':
    case 'broker':
      return t('options.broker');

    // Delivery
    case 'استلام شخصي':
    case 'personal pickup':
    case 'personal_pickup':
      return t('options.personal_pickup');
    case 'توصيل':
    case 'delivery':
      return t('options.delivery');
    case 'شحن':
    case 'shipping':
      return t('options.shipping');
    case 'كلاهما':
    case 'both':
      return t('options.both');

    // Negotiable / partial etc.
    case 'ضمن حدود معقولة':
    case 'within reasonable limits':
    case 'within_reasonable_limits':
      return t('options.within_reasonable_limits');
    case 'جزئياً':
    case 'جزئيا':
    case 'partially':
      return t('options.partially');
  }
  if (isYes(n) || isNo(n)) return yn(n, t);
  return typeof v === 'string' ? v : String(v ?? '');
};

export const cond = (v: any, t: TFunction): string => {
  const n = norm(v);
  switch (n) {
    case 'new':
    case 'جديد':
    case 'جديدة':
      return t('options.new');
    case 'like-new':
    case 'كالجديد':
    case 'شبه جديدة':
    case 'شبه جديد':
      return t('options.like_new', { defaultValue: 'كالجديد' });
    case 'excellent':
    case 'ممتاز':
      return t('options.excellent');
    case 'good':
    case 'جيد':
    case 'كويس':
    case 'مزيان':
    case 'زين':
      return t('options.good');
    case 'fair':
    case 'مقبول':
      return t('options.fair');
    case 'used':
    case 'مستعمل':
    case 'مستعملة':
      return t('options.used');
    default:
      return typeof v === 'string' ? v : String(v ?? '');
  }
};
