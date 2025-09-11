import { memo } from "react";
import { Home, Star, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = memo(({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'saved', icon: Star, label: t('nav.saved') },
    { id: 'settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`nav-item ${isActive ? 'active' : 'hover:bg-accent'}`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            <span className={`text-xs ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
});

BottomNav.displayName = "BottomNav";

export default BottomNav;