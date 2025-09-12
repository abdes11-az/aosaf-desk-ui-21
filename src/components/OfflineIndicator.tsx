import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/utils/pwaUtils';
import { useLanguage } from '@/contexts/LanguageContext';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { watchConnectionStatus } = usePWA();
  const { t } = useLanguage();

  useEffect(() => {
    const cleanup = watchConnectionStatus((online) => {
      setIsOnline(online);
    });

    return cleanup;
  }, [watchConnectionStatus]);

  if (isOnline) {
    return null;
  }

  return (
    <Badge 
      variant="secondary" 
      className="fixed top-4 right-4 z-50 bg-orange-100 text-orange-800 border-orange-200"
    >
      <WifiOff className="w-3 h-3 mr-1" />
      {t('app.offline_mode')}
    </Badge>
  );
};