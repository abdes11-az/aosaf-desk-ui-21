import { useState } from "react";
import { ChevronLeft, Moon, Sun, Monitor, Users, Shield, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

const SettingsPage = ({ onNavigate }: SettingsPageProps) => {
  const { theme, setTheme } = useTheme();

  const settingsItems = [
    {
      id: 'terms',
      icon: Users,
      title: 'الشروط والأحكام',
      description: 'اطلع على شروط استخدام التطبيق'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'سياسة الخصوصية',
      description: 'تعرف على كيفية حماية بياناتك'
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'اتصل بنا',
      description: 'تواصل معنا للاستفسارات والدعم'
    }
  ];

  return (
    <div className="page-content max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">الإعدادات</h2>
            <p className="text-muted-foreground text-sm">إدارة إعدادات التطبيق والتخصيص</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* إعدادات المظهر */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="w-5 h-5" />
              إعدادات المظهر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">اختر المظهر</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المظهر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      فاتح
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      داكن
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      تلقائي (حسب النظام)
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
            <CardTitle className="text-lg">صفحات مهمة</CardTitle>
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