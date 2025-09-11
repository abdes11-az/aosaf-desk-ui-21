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
      title: 'السيارات'
    },
    {
      id: 'real-estate',
      icon: '🏠',
      title: 'العقارات'
    },
    {
      id: 'phones',
      icon: '📱',
      title: 'الهواتف'
    },
    {
      id: 'tablet',
      icon: '📱',
      title: 'الأجهزة اللوحية'
    },
    {
      id: 'bicycle',
      icon: '🚲',
      title: 'الدراجات الهوائية'
    },
    {
      id: 'motorcycle',
      icon: '🏍️',
      title: 'الدراجات النارية'
    },
    {
      id: 'clothing',
      icon: '👕',
      title: 'الملابس'
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
          <h2 className="text-2xl font-bold text-foreground">اختر التصنيف</h2>
          <p className="text-muted-foreground text-sm">حدد نوع المنتج لإنشاء الوصف المناسب</p>
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
          سيتم إضافة المزيد من التصنيفات قريباً
        </p>
      </div>
    </div>
  );
};

export default CategoriesPage;