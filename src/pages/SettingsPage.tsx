import { ChevronLeft, Moon, Sun, Monitor, Users, Shield, Mail, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

const SettingsPage = ({ onNavigate }: SettingsPageProps) => {
  const { theme, setTheme } = useTheme();
  const { dialect, setDialect } = useLanguage();
  const { t } = useLanguage();

  const settingsItems = [
    {
      id: 'terms',
      icon: Users,
      title: t('settings.terms'),
      description: t('settings.terms_desc')
    },
    {
      id: 'privacy',
      icon: Shield,
      title: t('settings.privacy'),
      description: t('settings.privacy_desc')
    },
    {
      id: 'contact',
      icon: Mail,
      title: t('settings.contact'),
      description: t('settings.contact_desc')
    }
  ];

  const dialectOptions = [
    { value: 'standard', label: t('dialects.standard'), flag: '🇸🇦' },
    { value: 'moroccan', label: t('dialects.moroccan'), flag: '🇲🇦' },
    { value: 'egyptian', label: t('dialects.egyptian'), flag: '🇪🇬' },
    { value: 'gulf', label: t('dialects.gulf'), flag: '🇦🇪' },
  ];

  return (
    <div className="page-content max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('settings.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('settings.description')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* إعدادات اللغة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t('settings.language')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dialect">{t('settings.choose_dialect')}</Label>
              <Select value={dialect} onValueChange={setDialect}>
                <SelectTrigger>
                  <SelectValue placeholder={t('settings.choose_dialect')} />
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
          </CardContent>
        </Card>

        {/* إعدادات المظهر */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="w-5 h-5" />
              {t('settings.appearance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">{t('settings.choose_theme')}</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder={t('settings.choose_theme')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      {t('settings.light')}
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      {t('settings.dark')}
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      {t('settings.system')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>


        {/* الصفحات الإضافية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('settings.important_pages')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-right"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;