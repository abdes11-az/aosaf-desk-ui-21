import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Header = () => {
  const { dialect, setDialect } = useLanguage();
  const { t } = useLanguage();

  const dialectOptions = [
    { value: 'standard', label: t('dialects.standard'), flag: '🇸🇦' },
    { value: 'moroccan', label: t('dialects.moroccan'), flag: '🇲🇦' },
    { value: 'egyptian', label: t('dialects.egyptian'), flag: '🇪🇬' },
    { value: 'gulf', label: t('dialects.gulf'), flag: '🇦🇪' },
  ];

  return (
    <header className="app-header">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t('app.title')}</h1>
        <Popover>
          <PopoverTrigger asChild>
            <button className="touch-button bg-accent hover:bg-surface-hover">
              <Globe className="w-5 h-5 text-accent-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">{t('settings.choose_dialect')}</h3>
              <Select value={dialect} onValueChange={(value) => setDialect(value as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dialectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;