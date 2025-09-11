export interface MotorcycleData {
  type?: string;
  brand?: string;
  customBrand?: string;
  model?: string;
  year?: string;
  engineCapacity?: string;
  engineType?: string;
  transmission?: string;
  fuelType?: string;
  maxSpeed?: string;
  fuelConsumption?: string;
  fuelTankCapacity?: string;
  mileage?: string;
  color?: string;
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

export const generateMotorcycleDescription = (data: MotorcycleData, t: (key: string) => string): string => {
  let description = `🏍️ ${t('motorcycle.for_sale')}\n\n`;
  
  // معلومات أساسية
  if (data.type) {
    const typeMap: { [key: string]: string } = {
      "Sport": t('motorcycle.type.sport'),
      "Cruiser": t('motorcycle.type.cruiser'),
      "Touring": t('motorcycle.type.touring'),
      "Scooter": t('motorcycle.type.scooter'),
      "Off-road": t('motorcycle.type.off_road'),
      "Naked": t('motorcycle.type.naked'),
      "Adventure": t('motorcycle.type.adventure')
    };
    description += `🏷️ ${t('motorcycle.type')}: ${typeMap[data.type] || data.type}\n`;
  }
  if (data.brand) {
    const brandName = data.brand === "other" ? data.customBrand : data.brand;
    if (brandName) {
      description += `🏭 ${t('motorcycle.brand')}: ${brandName}\n`;
    }
  }
  if (data.model) {
    description += `📝 ${t('motorcycle.model')}: ${data.model}\n`;
  }
  if (data.year) {
    description += `📅 ${t('motorcycle.year')}: ${data.year}\n`;
  }
  
  description += "\n";
  
  // المواصفات التقنية
  description += `⚙️ ${t('motorcycle.technical_specs')}:\n`;
  if (data.engineCapacity) {
    description += `• ${t('motorcycle.engine_capacity')}: ${data.engineCapacity}\n`;
  }
  if (data.engineType) {
    const engineMap: { [key: string]: string } = {
      "2-stroke": t('motorcycle.engine_type.two_stroke'),
      "4-stroke": t('motorcycle.engine_type.four_stroke')
    };
    description += `• ${t('motorcycle.engine_type')}: ${engineMap[data.engineType] || data.engineType}\n`;
  }
  if (data.transmission) {
    const transmissionMap: { [key: string]: string } = {
      "manual": t('motorcycle.transmission.manual'),
      "automatic": t('motorcycle.transmission.automatic'),
      "semi-automatic": t('motorcycle.transmission.semi_automatic')
    };
    description += `• ${t('motorcycle.transmission')}: ${transmissionMap[data.transmission] || data.transmission}\n`;
  }
  if (data.fuelType) {
    const fuelMap: { [key: string]: string } = {
      "gasoline": t('motorcycle.fuel_type.gasoline'),
      "electric": t('motorcycle.fuel_type.electric'),
      "hybrid": t('motorcycle.fuel_type.hybrid')
    };
    description += `• ${t('motorcycle.fuel_type')}: ${fuelMap[data.fuelType] || data.fuelType}\n`;
  }
  
  description += "\n";
  
  // التعديلات
  if (data.modifications && data.modifications.length > 0) {
    description += `🛠️ ${t('motorcycle.modifications')}:\n`;
    data.modifications.forEach((mod: string) => {
      description += `• ${mod}\n`;
    });
    description += "\n";
  }
  
  // الملحقات
  if (data.accessories && data.accessories.length > 0) {
    description += `📦 ${t('motorcycle.accessories')}:\n`;
    data.accessories.forEach((accessory: string) => {
      description += `• ${accessory}\n`;
    });
    description += "\n";
  }
  
  // الأداء والاستهلاك
  if (data.maxSpeed || data.fuelConsumption || data.fuelTankCapacity) {
    description += `🚀 ${t('motorcycle.performance')}:\n`;
    if (data.maxSpeed) {
      description += `• ${t('motorcycle.max_speed')}: ${data.maxSpeed} ${t('motorcycle.kmh')}\n`;
    }
    if (data.fuelConsumption) {
      description += `• ${t('motorcycle.fuel_consumption')}: ${data.fuelConsumption} ${t('motorcycle.km_per_liter')}\n`;
    }
    if (data.fuelTankCapacity) {
      description += `• ${t('motorcycle.fuel_tank_capacity')}: ${data.fuelTankCapacity} ${t('motorcycle.liter')}\n`;
    }
    description += "\n";
  }
  
  // معلومات إضافية
  if (data.mileage) {
    description += `🛣️ ${t('motorcycle.mileage')}: ${data.mileage} ${t('motorcycle.km')}\n`;
  }
  if (data.color) {
    description += `🎨 ${t('motorcycle.color')}: ${data.color}\n`;
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
    description += `✅ ${t('motorcycle.condition')}: ${conditionMap[data.condition] || data.condition}\n`;
  }
  
  // معلومات البائع
  if (data.city || data.sellerType || data.deliveryMethod || data.negotiable || data.contactMethod || data.warranty || data.acceptExchange) {
    description += `\n👤 ${t('motorcycle.seller_info')}:\n`;
    if (data.city) description += `📍 ${t('motorcycle.city')}: ${data.city}\n`;
    if (data.sellerType) {
      const sellerTypeMap: { [key: string]: string } = {
        "person": t('seller_type.person'),
        "shop": t('seller_type.shop'),
        "company": t('seller_type.company'),
        "broker": t('seller_type.broker')
      };
      description += `👥 ${t('motorcycle.seller_type')}: ${sellerTypeMap[data.sellerType] || data.sellerType}\n`;
    }
    if (data.deliveryMethod) {
      const deliveryMap: { [key: string]: string } = {
        "personal_pickup": t('delivery.personal_pickup'),
        "delivery": t('delivery.delivery'),
        "shipping": t('delivery.shipping'),
        "both": t('delivery.both')
      };
      description += `🚚 ${t('motorcycle.delivery_method')}: ${deliveryMap[data.deliveryMethod] || data.deliveryMethod}\n`;
    }
    if (data.negotiable !== undefined) description += `💰 ${t('motorcycle.negotiable')}: ${data.negotiable ? t('yes') : t('no')}\n`;
    if (data.contactMethod) description += `📞 ${t('motorcycle.contact_method')}: ${data.contactMethod}\n`;
    if (data.warranty) {
      const warrantyMap: { [key: string]: string } = {
        "available": t('warranty.available'),
        "not_available": t('warranty.not_available'),
        "expired": t('warranty.expired')
      };
      description += `🛡️ ${t('motorcycle.warranty')}: ${warrantyMap[data.warranty] || data.warranty}\n`;
    }
    if (data.warranty === "available" && data.warrantyDuration) {
      description += `⏰ ${t('motorcycle.warranty_duration')}: ${data.warrantyDuration}\n`;
    }
    if (data.acceptExchange !== undefined) {
      description += `🔄 ${t('motorcycle.accept_exchange')}: ${data.acceptExchange ? t('yes') : t('no')}\n`;
    }
    description += "\n";
  }
  
  // سبب البيع
  if (data.sellReason) {
    description += `💭 ${t('motorcycle.sell_reason')}: ${data.sellReason}\n\n`;
  }
  
  // وصف إضافي
  if (data.description) {
    description += `📝 ${t('motorcycle.additional_details')}:\n${data.description}\n\n`;
  }
  
  // العملاء غير المرغوب فيهم
  if (data.unwantedCustomers && data.unwantedCustomers.length > 0) {
    description += `🚫 ${t('motorcycle.unwanted_customers')}:\n`;
    data.unwantedCustomers.forEach((customer: string) => {
      description += `• ${customer}\n`;
    });
    description += "\n";
  }
  
  description += `📞 ${t('motorcycle.contact_info')}`;
  
  return description;
};