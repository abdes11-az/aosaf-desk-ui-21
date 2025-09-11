export interface TabletData {
  brand?: string;
  model?: string;
  screenSize?: string;
  screenType?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  operatingSystem?: string;
  connectivity?: string;
  frontCamera?: string;
  rearCamera?: string;
  colors?: string[];
  modifications?: string[];
  accessories?: string[];
  condition?: string;
  city?: string;
  sellerType?: string;
  deliveryMethod?: string;
  negotiable?: boolean;
  contactMethod?: string;
  warranty?: string;
  warrantyDuration?: string;
  acceptExchange?: boolean;
  sellReason?: string;
  description?: string;
  unwantedCustomers?: string[];
}

export const generateTabletDescription = (data: TabletData, t: (key: string) => string): string => {
  let description = `📱 ${t('tablet.for_sale')}\n\n`;
  
  // معلومات أساسية
  if (data.brand) {
    description += `🏷️ ${t('tablet.brand')}: ${data.brand}\n`;
  }
  if (data.model) {
    description += `📱 ${t('tablet.model')}: ${data.model}\n`;
  }
  if (data.screenSize) {
    description += `📏 ${t('tablet.screen_size')}: ${data.screenSize}\n`;
  }
  if (data.screenType) {
    description += `🖥️ ${t('tablet.screen_type')}: ${data.screenType}\n`;
  }
  
  description += "\n";
  
  // المواصفات التقنية
  if (data.processor || data.ram || data.storage) {
    description += `⚙️ ${t('tablet.technical_specs')}:\n`;
    if (data.processor) {
      description += `• ${t('tablet.processor')}: ${data.processor}\n`;
    }
    if (data.ram) {
      description += `• ${t('tablet.ram')}: ${data.ram}\n`;
    }
    if (data.storage) {
      description += `• ${t('tablet.storage')}: ${data.storage}\n`;
    }
    description += "\n";
  }
  
  // معلومات إضافية
  if (data.battery) {
    description += `🔋 ${t('tablet.battery')}: ${data.battery} mAh\n`;
  }
  if (data.operatingSystem) {
    description += `💻 ${t('tablet.operating_system')}: ${data.operatingSystem}\n`;
  }
  if (data.connectivity) {
    description += `📶 ${t('tablet.connectivity')}: ${data.connectivity}\n`;
  }
  
  description += "\n";
  
  // التعديلات
  if (data.modifications && data.modifications.length > 0) {
    description += `🛠️ ${t('tablet.modifications')}:\n`;
    data.modifications.forEach((mod: string) => {
      description += `• ${mod}\n`;
    });
    description += "\n";
  }
  
  // الملحقات
  if (data.accessories && data.accessories.length > 0) {
    description += `📦 ${t('tablet.accessories')}:\n`;
    data.accessories.forEach((accessory: string) => {
      description += `• ${accessory}\n`;
    });
    description += "\n";
  }
  
  // الكاميرات
  if (data.frontCamera || data.rearCamera) {
    description += `📸 ${t('tablet.cameras')}:\n`;
    if (data.frontCamera) {
      description += `• ${t('tablet.front_camera')}: ${data.frontCamera}\n`;
    }
    if (data.rearCamera) {
      description += `• ${t('tablet.rear_camera')}: ${data.rearCamera}\n`;
    }
    description += "\n";
  }
  
  // الألوان
  if (data.colors && data.colors.length > 0) {
    description += `🎨 ${t('tablet.available_colors')}: ${data.colors.join(", ")}\n\n`;
  }
  
  // الحالة
  if (data.condition) {
    const conditionMap: { [key: string]: string } = {
      "new": t('condition.new'),
      "used": t('condition.used'),
      "like_new": t('condition.like_new'),
      "excellent": t('condition.excellent'),
      "good": t('condition.good'),
      "fair": t('condition.fair')
    };
    description += `✅ ${t('tablet.condition')}: ${conditionMap[data.condition] || data.condition}\n`;
  }
  
  // معلومات البائع
  if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
    description += `\n👤 ${t('tablet.seller_info')}:\n`;
    if (data.city) description += `📍 ${t('tablet.city')}: ${data.city}\n`;
    if (data.sellerType) {
      const sellerTypeMap: { [key: string]: string } = {
        "person": t('seller_type.person'),
        "shop": t('seller_type.shop'),
        "company": t('seller_type.company'),
        "broker": t('seller_type.broker')
      };
      description += `👥 ${t('tablet.seller_type')}: ${sellerTypeMap[data.sellerType] || data.sellerType}\n`;
    }
    if (data.deliveryMethod) {
      const deliveryMap: { [key: string]: string } = {
        "personal_pickup": t('delivery.personal_pickup'),
        "delivery": t('delivery.delivery'),
        "shipping": t('delivery.shipping'),
        "both": t('delivery.both')
      };
      description += `🚚 ${t('tablet.delivery_method')}: ${deliveryMap[data.deliveryMethod] || data.deliveryMethod}\n`;
    }
    if (data.negotiable !== undefined) description += `💰 ${t('tablet.negotiable')}: ${data.negotiable ? t('yes') : t('no')}\n`;
    if (data.contactMethod) description += `📞 ${t('tablet.contact_method')}: ${data.contactMethod}\n`;
    if (data.warranty) {
      const warrantyMap: { [key: string]: string } = {
        "available": t('warranty.available'),
        "not_available": t('warranty.not_available'),
        "expired": t('warranty.expired')
      };
      description += `🛡️ ${t('tablet.warranty')}: ${warrantyMap[data.warranty] || data.warranty}\n`;
    }
    if (data.warranty === "available" && data.warrantyDuration) {
      description += `⏰ ${t('tablet.warranty_duration')}: ${data.warrantyDuration}\n`;
    }
    if (data.acceptExchange !== undefined) {
      description += `🔄 ${t('tablet.accept_exchange')}: ${data.acceptExchange ? t('yes') : t('no')}\n`;
    }
    description += "\n";
  }
  
  // سبب البيع
  if (data.sellReason) {
    description += `💭 ${t('tablet.sell_reason')}: ${data.sellReason}\n\n`;
  }
  
  // وصف إضافي
  if (data.description) {
    description += `📝 ${t('tablet.additional_details')}:\n${data.description}\n\n`;
  }
  
  // العملاء غير المرغوب فيهم
  if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
    description += `🚫 ${t('tablet.unwanted_customers')}:\n`;
    data.unwantedCustomers.forEach((customer: string) => {
      description += `• ${customer}\n`;
    });
    description += "\n";
  }
  
  description += `📞 ${t('tablet.contact_info')}`;
  
  return description;
};