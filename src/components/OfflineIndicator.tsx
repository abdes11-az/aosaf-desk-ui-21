import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/utils/pwaUtils';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { watchConnectionStatus } = usePWA();

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
      وضع بدون انترنت
    </Badge>
  );
};