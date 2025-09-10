import { ChevronRight } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionBankPageProps {
  onBack: () => void;
  onSelectCategory: (category: string) => void;
}

const QuestionBankPage = ({ onBack, onSelectCategory }: QuestionBankPageProps) => {
  const { t } = useLanguage();
  
  const categories = [
    {
      id: 'cars',
      icon: '🚗',
      title: t('categories.cars')
    },
    {
      id: 'real-estate',
      icon: '🏠',
      title: t('categories.real_estate')
    },
    {
      id: 'phones',
      icon: '📱',
      title: t('categories.phones')
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
          <h2 className="text-2xl font-bold text-foreground">{t('home.question_bank')}</h2>
          <p className="text-muted-foreground text-sm">{t('home.question_bank_desc')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t('home.question_bank_desc')}
        </p>
      </div>
    </div>
  );
};

export default QuestionBankPage;