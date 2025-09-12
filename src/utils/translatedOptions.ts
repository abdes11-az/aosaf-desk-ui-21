import { useLanguage } from '@/contexts/LanguageContext';

// مولد خيارات مترجمة للنماذج
export const useTranslatedOptions = () => {
  const { t } = useLanguage();

  return {
    // خيارات الدراجات
    bicycleTypes: [
      { value: "mountain", label: t('bicycle.mountain') },
      { value: "road", label: t('bicycle.road') },
      { value: "hybrid", label: t('bicycle.hybrid') },
      { value: "electric", label: t('bicycle.electric') },
      { value: "bmx", label: t('bicycle.bmx') },
      { value: "city", label: t('bicycle.city') }
    ],

    // خيارات أنظمة السرعة
    gearSystems: [
      { value: "1", label: t('bicycle.single_speed') },
      { value: "7", label: t('bicycle.seven_speeds') },
      { value: "14", label: t('bicycle.fourteen_speeds') },
      { value: "21", label: t('bicycle.twenty_one_speeds') },
      { value: "24", label: t('bicycle.twenty_four_speeds') },
      { value: "27", label: t('bicycle.twenty_seven_speeds') },
      { value: "30", label: t('bicycle.thirty_speeds') }
    ],

    // أسباب البيع
    sellReasons: [
      { value: "شراء دراجة جديدة", label: t('bicycle.buy_new_bicycle') },
      { value: "عدم الاستخدام", label: t('bicycle.not_using') },
      { value: "تغيير نمط الحياة", label: t('bicycle.lifestyle_change') },
      { value: "الانتقال لمكان آخر", label: t('bicycle.moving') },
      { value: "الحاجة للمال", label: t('bicycle.need_money') },
      { value: "مشاكل صحية", label: t('bicycle.health_issues') },
      { value: "شراء سيارة", label: t('bicycle.buying_car') },
      { value: "تغيير الهواية", label: t('bicycle.hobby_change') },
      { value: "ضيق المساحة", label: t('bicycle.space_issues') },
      { value: "أسباب شخصية", label: t('bicycle.personal_reasons') }
    ],

    // خيارات عامة
    yesNo: [
      { value: "نعم", label: t('options.yes') },
      { value: "لا", label: t('options.no') }
    ],

    delivery: [
      { value: "استلام شخصي", label: t('options.personal_pickup') },
      { value: "توصيل", label: t('options.delivery') },
      { value: "شحن", label: t('options.shipping') },
      { value: "كلاهما", label: t('options.both') }
    ],

    sellerType: [
      { value: "شخص", label: t('options.person') },
      { value: "محل", label: t('options.shop') },
      { value: "شركة", label: t('options.company') },
      { value: "وسيط", label: t('options.broker') }
    ]
  };
};