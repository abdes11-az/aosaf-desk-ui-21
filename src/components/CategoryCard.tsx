import { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

const CategoryCard = ({ icon, title, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="service-card w-full text-center group"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <h3 className="font-semibold text-card-foreground text-lg">{title}</h3>
      </div>
    </button>
  );
};

export default CategoryCard;