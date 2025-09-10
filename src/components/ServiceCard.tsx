import { memo, ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}

const ServiceCard = memo(({ icon, title, description, onClick }: ServiceCardProps) => {
  return (
    <button
      onClick={onClick}
      className="service-card w-full text-right group"
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground text-lg">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;