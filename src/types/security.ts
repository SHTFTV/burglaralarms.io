export type PropertyType = 'residential' | 'small_business' | 'commercial' | 'estate';

export type AlarmArmMode = 'disarmed' | 'armed_away' | 'armed_stay' | 'armed_night' | 'alarm_triggered';

export type SensorType = 
  | 'door_contact'
  | 'pir_motion'
  | 'glassbreak'
  | 'outdoor_beam'
  | 'siren_strobe'
  | 'keypad'
  | 'smoke_detector'
  | 'water_flood'
  | 'ai_camera';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'core' | 'perimeter' | 'interior' | 'deterrence' | 'life_safety' | 'surveillance';
  type: SensorType;
  price: number;
  monthlyFee?: number;
  description: string;
  batteryLife: string;
  range: string;
  specs: string[];
  recommendedQty: (property: PropertyType, sqft: number) => number;
  iconName: string;
}

export interface ZoneItem {
  id: string;
  zoneNumber: number;
  name: string;
  type: SensorType;
  room: string;
  x: number; // percentage on floorplan
  y: number; // percentage on floorplan
  status: 'normal' | 'triggered' | 'bypassed' | 'low_battery' | 'tamper';
  isPetImmune?: boolean;
  batteryLevel: number;
  signalStrength: number; // 1-100%
  chimeOnOpen: boolean;
}

export interface SystemEventLog {
  id: string;
  timestamp: string;
  type: 'arm' | 'disarm' | 'alarm' | 'tamper' | 'trouble' | 'zone_open' | 'bypass' | 'info';
  message: string;
  zone?: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

export interface MonitoringPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualDiscountPrice: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  slaResponseTime: string;
  cellularBackup: boolean;
  twoWayVoice: boolean;
  policeDispatch: boolean;
  insuranceDiscountCert: boolean;
}

export interface RiskQuestion {
  id: string;
  title: string;
  category: 'perimeter' | 'visibility' | 'access' | 'tech' | 'neighborhood';
  options: {
    label: string;
    scoreWeight: number; // 0 (high risk) to 10 (low risk)
    tip: string;
  }[];
}

export interface SystemConfiguration {
  propertyType: PropertyType;
  sqft: number;
  exteriorDoors: number;
  perimeterWindows: number;
  bedroomsOrOffices: number;
  selectedEquipment: Record<string, number>;
  selectedPlanId: string;
  installationType: 'diy' | 'pro_install';
  billingCycle: 'monthly' | 'annual';
}
