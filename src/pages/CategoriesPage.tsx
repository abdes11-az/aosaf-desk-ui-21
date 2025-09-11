import { ChevronRight } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";

interface CategoriesPageProps {
  onNavigate: (page: string, category?: string) => void;
  onBack: () => void;
}

const CategoriesPage = ({ onNavigate, onBack }: CategoriesPageProps) => {
  const categories = [
    {
      id: 'cars',
      icon: '🚗',
      title: 'سيارات'
    },
    {
      id: 'real-estate',
      icon: '🏠',
      title: 'عقارات'
    },
    {
      id: 'phones',
      icon: '📱',
      title: 'هواتف'
    },
    {
      id: 'tablet',
      icon: '📱',
      title: 'تابلت'
    },
    {
      id: 'bicycle',
      icon: '🚲',
      title: 'دراجات هوائية'
    },
    {
      id: 'motorcycle',
      icon: '🏍️',
      title: 'دراجات نارية'
    },
    {
      id: 'clothing',
      icon: '👕',
      title: 'ملابس'
    },
    {
      id: 'tenant',
      icon: '📋',
      title: 'ملف المستأجر'
    }
  ];

  return (
    <div className="page-content">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface-hover -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">اختر الفئة</h2>
          <p className="text-muted-foreground text-sm">حدد نوع المنتج لكتابة الوصف المناسب</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            onClick={() => onNavigate('description', category.id)}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          سنضيف المزيد من الفئات قريباً
        </p>
      </div>
    </div>
  );
};

export default CategoriesPage;