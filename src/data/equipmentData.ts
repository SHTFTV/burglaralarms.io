import { EquipmentItem, MonitoringPlan, RiskQuestion, ZoneItem } from '../types/security';

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: 'hub_pro_gen3',
    name: 'Aegis Pro Dual-SIM 5G Cellular Hub',
    category: 'core',
    type: 'keypad',
    price: 199,
    description: 'Central security brain with dual-carrier 5G/LTE-M fallback, 868MHz encrypted mesh, 24-hour backup battery, and built-in 95dB tamper siren.',
    batteryLife: '24-hour Li-ion emergency backup',
    range: 'Up to 2,000 meters open field (LoRa Mesh)',
    specs: [
      'Dual SIM cards with automatic carrier hopping',
      'AES-128 / AES-256 rolling code encryption',
      'Anti-jamming frequency hopping technology',
      'Supports up to 150 wireless zones & 64 users'
    ],
    recommendedQty: () => 1,
    iconName: 'ShieldAlert'
  },
  {
    id: 'contact_door_window',
    name: 'Micro Magnetic Reed Perimeter Contact',
    category: 'perimeter',
    type: 'door_contact',
    price: 29,
    description: 'Ultra-slim magnetic door and window sensor. Triggers instantly upon 15mm separation with built-in vibration sensor and case tamper switch.',
    batteryLife: '5+ years (CR123A)',
    range: '1,200 meters from hub',
    specs: [
      'Dual magnetic reed switch (parallel mounting)',
      'Built-in surface shock sensor for forced entry attempts',
      'Chime notification mode when disarmed',
      'External contact terminal for hardwired extension'
    ],
    recommendedQty: (_prop, _sqft) => Math.max(3, Math.round(_sqft / 400)),
    iconName: 'DoorClosed'
  },
  {
    id: 'pir_dualtech_motion',
    name: 'Dual-Tech PIR + Microwave Motion Detector',
    category: 'interior',
    type: 'pir_motion',
    price: 49,
    description: 'Combines Passive Infrared thermal tracking with 24GHz micro-radar. Virtually eliminates false alarms from heating vents, sunlight, or drapes.',
    batteryLife: '4 years (2x CR123A)',
    range: '12m x 12m (85° wide field of view)',
    specs: [
      'Pet Immunity up to 50 lbs (22 kg)',
      'Digital temperature compensation algorithm',
      'Creep zone look-down lens below detector',
      'Grade 2 security certified (EN 50131)'
    ],
    recommendedQty: (_prop, sqft) => Math.max(1, Math.round(sqft / 750)),
    iconName: 'Activity'
  },
  {
    id: 'acoustic_glassbreak',
    name: 'Acoustic Dual-Frequency Glassbreak Detector',
    category: 'perimeter',
    type: 'glassbreak',
    price: 45,
    description: 'Listens for the micro-pressure thud of impact followed by the high-frequency shatter of tempered, plate, or laminated architectural glass.',
    batteryLife: '4 years',
    range: '9-meter radius (360° omnidirectional)',
    specs: [
      'Dual-stage audio frequency analyzer (Thud + Shatter)',
      'Guards multiple windows in a single room',
      'Immune to barking dogs and thunder claps',
      'Sensitivity calibration dip-switches'
    ],
    recommendedQty: (_prop, sqft) => Math.max(1, Math.round(sqft / 1000)),
    iconName: 'Waves'
  },
  {
    id: 'outdoor_perimeter_beam',
    name: 'Active Infrared Solar Perimeter Beam Set',
    category: 'perimeter',
    type: 'outdoor_beam',
    price: 119,
    description: 'Dual pulsed infrared beam sets for fence lines, driveways, and property boundaries. Triggers alarm before intruders touch doors or windows.',
    batteryLife: 'Solar powered with 30-day dark battery reserve',
    range: '60-meter outdoor detection corridor',
    specs: [
      'Dual synchronized beams prevent bird/leaf false trips',
      'IP66 all-weather waterproof casing',
      'Optical alignment sight and buzzer test',
      'Anti-tamper cover and base switches'
    ],
    recommendedQty: (prop) => (prop === 'estate' || prop === 'commercial' ? 2 : 0),
    iconName: 'ScanLine'
  },
  {
    id: 'siren_strobe_outdoor',
    name: 'High-Decibel 115dB Strobe Siren & Beacon',
    category: 'deterrence',
    type: 'siren_strobe',
    price: 69,
    description: 'Weatherproof outdoor sounder with flashing high-intensity LED strobe. Scares away intruders and directs emergency first responders to the exact address.',
    batteryLife: '3.5 years (or hardwired 12V with battery backup)',
    range: '115 dB sound pressure at 1 meter',
    specs: [
      'Selectable warble/yelp tone frequencies',
      'Polycarbonate UV-resistant vandal-proof housing',
      'Visual armed status LED indicator beacon',
      'Configurable alarm duration (1 to 15 mins)'
    ],
    recommendedQty: () => 1,
    iconName: 'Volume2'
  },
  {
    id: 'touch_keypad_rfid',
    name: 'Wireless Touch Keypad with Encrypted RFID',
    category: 'core',
    type: 'keypad',
    price: 79,
    description: 'Capacitive touch keypad with quick Arm Away, Arm Stay, and Duress Panic. Includes 2 proximity RFID key fobs for one-touch disarming.',
    batteryLife: '3 years',
    range: '1,500m from hub',
    specs: [
      'Silent Duress code alert dispatch to central station',
      'Proximity reader for DESFire encrypted key tags',
      'Visual zone status LEDs (Red/Green/Amber)',
      'Illuminated buttons with ambient light sensor'
    ],
    recommendedQty: (prop) => (prop === 'commercial' || prop === 'estate' ? 2 : 1),
    iconName: 'KeyRound'
  },
  {
    id: 'smoke_heat_detector',
    name: 'Photoelectric Smoke + Rate-of-Rise Heat Sensor',
    category: 'life_safety',
    type: 'smoke_detector',
    price: 59,
    description: 'Monitored fire protection that triggers central station dispatch 24/7, even when your burglar alarm is completely disarmed.',
    batteryLife: '10-year sealed lithium cell',
    range: 'Interlinked with all system sounders',
    specs: [
      'Dual optical chamber for slow smoldering fires',
      'Thermal rate-of-rise sensor (>135°F or >15°F/min)',
      'Local 85dB Temporal 3 buzzer and central station signal',
      'UL 217 & UL 268 certified'
    ],
    recommendedQty: (_prop, sqft) => Math.max(1, Math.round(sqft / 800)),
    iconName: 'Flame'
  },
  {
    id: 'water_flood_sensor',
    name: 'Dual-Probe Water Leak & Freeze Sensor',
    category: 'life_safety',
    type: 'water_flood',
    price: 35,
    description: 'Detects basement water puddles, burst pipes, and sub-40°F freezing temperatures to prevent catastrophic plumbing flood damage.',
    batteryLife: '5 years',
    range: '1,000m transmission',
    specs: [
      'Gold-plated bottom probes + remote wired probe cord',
      'Ambient temperature monitor with freezing alert',
      'IP68 fully submersible waterproof body',
      'Instant push notification and audible alert'
    ],
    recommendedQty: () => 2,
    iconName: 'Droplets'
  },
  {
    id: 'ai_deterrence_camera',
    name: '4K Active Deterrence AI Perimeter Camera',
    category: 'surveillance',
    type: 'ai_camera',
    price: 149,
    description: 'Ultra HD 4K camera with on-device Human/Vehicle classification, red/blue strobe warning lights, two-way audio speaker, and color night vision.',
    batteryLife: 'PoE hardwired or Solar + Battery Kit',
    range: '4K resolution with 30m night vision',
    specs: [
      'Real-time Video Verification for priority police dispatch',
      'Smart Siren & 600-lumen spotlight on tripwire breach',
      'Local micro-SD storage & encrypted cloud archive',
      'HDR with wide dynamic range'
    ],
    recommendedQty: (_prop, sqft) => (sqft > 2000 ? 3 : 2),
    iconName: 'Camera'
  }
];

export const MONITORING_PLANS: MonitoringPlan[] = [
  {
    id: 'self_monitored',
    name: 'Self-Monitored Smart Hub',
    monthlyPrice: 0,
    annualDiscountPrice: 0,
    tagline: 'Direct mobile app control, instant push alerts, and local siren deterrence with no monthly contracts.',
    popular: false,
    slaResponseTime: 'Instant app notification (User Dispatched)',
    cellularBackup: false,
    twoWayVoice: false,
    policeDispatch: false,
    insuranceDiscountCert: false,
    features: [
      'Unlimited mobile app push notifications & SMS',
      'Full zone control (Arm Away, Stay, Night, Bypass)',
      '115dB Local outdoor/indoor sirens',
      'Event history & activity logs',
      'Home automation integrations (Matter/Z-Wave)',
      'No monthly fees or recurring contracts'
    ]
  },
  {
    id: 'pro_cellular_dispatch',
    name: '24/7 Professional UL Cellular Monitoring',
    monthlyPrice: 24.99,
    annualDiscountPrice: 19.99,
    tagline: 'UL-Certified 5-Diamond Central Station dispatch with dedicated dual-carrier 5G cellular backup and certified police routing.',
    popular: true,
    slaResponseTime: '< 15 Seconds Central Station Response',
    cellularBackup: true,
    twoWayVoice: true,
    policeDispatch: true,
    insuranceDiscountCert: true,
    features: [
      '24/7/365 UL-Listed & 5-Diamond Certified Central Station',
      'Dedicated Dual-Carrier 5G LTE cellular communicator',
      'Instant Police, Fire & Emergency Medical dispatch',
      'Crash & Smash tamper protection',
      'Official Insurance Certificate (Up to 20% home policy discount)',
      'Two-Way voice verification via keypad',
      'Power outage cellular survival guarantee'
    ]
  },
  {
    id: 'pro_video_patrol',
    name: 'Pro Plus: Video Verification & Rapid Patrol',
    monthlyPrice: 44.99,
    annualDiscountPrice: 38.99,
    tagline: 'Highest level of commercial & estate protection with AI video verification to eliminate false alarm fines and trigger Priority 1 police dispatch.',
    popular: false,
    slaResponseTime: '< 8 Seconds AI + Human Visual Verification',
    cellularBackup: true,
    twoWayVoice: true,
    policeDispatch: true,
    insuranceDiscountCert: true,
    features: [
      'All Pro 24/7 Cellular Monitoring capabilities',
      'Live AI Video Verification by certified monitoring agents',
      'Priority 1 Police Dispatch rating (highest municipal priority)',
      'Eliminates municipal false alarm non-response policies',
      'Private security guard patrol drive-by dispatch on alarm',
      '30-Day cloud video retention with AI smart search',
      'Dedicated VIP security technician concierge line'
    ]
  }
];

export const INITIAL_ZONES: ZoneItem[] = [
  {
    id: 'z-01',
    zoneNumber: 1,
    name: 'Front Entryway Door',
    type: 'door_contact',
    room: 'Front Entry',
    x: 20,
    y: 85,
    status: 'normal',
    batteryLevel: 98,
    signalStrength: 95,
    chimeOnOpen: true
  },
  {
    id: 'z-02',
    zoneNumber: 2,
    name: 'Living Room Patio Sliders',
    type: 'door_contact',
    room: 'Living Room',
    x: 82,
    y: 75,
    status: 'normal',
    batteryLevel: 92,
    signalStrength: 88,
    chimeOnOpen: true
  },
  {
    id: 'z-03',
    zoneNumber: 3,
    name: 'Main Hallway Dual-Tech Motion',
    type: 'pir_motion',
    room: 'Hallway',
    x: 48,
    y: 50,
    status: 'normal',
    isPetImmune: true,
    batteryLevel: 96,
    signalStrength: 92,
    chimeOnOpen: false
  },
  {
    id: 'z-04',
    zoneNumber: 4,
    name: 'Living Room Acoustic Glassbreak',
    type: 'glassbreak',
    room: 'Living Room',
    x: 75,
    y: 40,
    status: 'normal',
    batteryLevel: 94,
    signalStrength: 85,
    chimeOnOpen: false
  },
  {
    id: 'z-05',
    zoneNumber: 5,
    name: 'Garage Access Roll-up Door',
    type: 'door_contact',
    room: 'Garage',
    x: 18,
    y: 25,
    status: 'normal',
    batteryLevel: 89,
    signalStrength: 78,
    chimeOnOpen: true
  },
  {
    id: 'z-06',
    zoneNumber: 6,
    name: 'Rear Master Bedroom Window',
    type: 'door_contact',
    room: 'Master Bedroom',
    x: 78,
    y: 18,
    status: 'normal',
    batteryLevel: 100,
    signalStrength: 90,
    chimeOnOpen: false
  },
  {
    id: 'z-07',
    zoneNumber: 7,
    name: 'Exterior Yard High-Decibel Siren',
    type: 'siren_strobe',
    room: 'Exterior Front',
    x: 12,
    y: 92,
    status: 'normal',
    batteryLevel: 100,
    signalStrength: 98,
    chimeOnOpen: false
  }
];

export const RISK_AUDIT_QUESTIONS: RiskQuestion[] = [
  {
    id: 'door_locks',
    title: 'What grade of deadbolts and strike plates protect your exterior doors?',
    category: 'access',
    options: [
      { label: 'Standard builder grade lockset with 3/4" screws in soft pine jamb', scoreWeight: 2, tip: 'Upgrade to ANSI Grade 1 deadbolts with 3-inch hardened steel screws into structural studs.' },
      { label: 'ANSI Grade 2 deadbolt with standard metal strike plate', scoreWeight: 6, tip: 'Consider a reinforced wrap-around door edge shield to prevent kick-in attacks.' },
      { label: 'Heavy-duty ANSI Grade 1 deadbolt with 3" heavy strike box and door jamb reinforcement armor', scoreWeight: 10, tip: 'Excellent physical deterrence! Resists up to 1,500 lbs of blunt force.' }
    ]
  },
  {
    id: 'perimeter_lighting',
    title: 'How well illuminated are your home’s perimeter, side yards, and rear entries at night?',
    category: 'visibility',
    options: [
      { label: 'Pitch black dark spots around rear patio, alleys, and basement walkouts', scoreWeight: 1, tip: 'Intruders exploit shadow cover. Install motion-activated 3000K LED floodlights on all corners.' },
      { label: 'Manual porch lights turned on occasionally', scoreWeight: 5, tip: 'Automate dusk-to-dawn exterior lighting with smart photo-sensors or scheduled relays.' },
      { label: '360° motion-activated floodlights + continuous low ambient perimeter illumination', scoreWeight: 10, tip: 'Prime visibility denies burglars concealment opportunities.' }
    ]
  },
  {
    id: 'sliding_doors_windows',
    title: 'Are ground-floor sliding glass doors or basement egress windows secured?',
    category: 'perimeter',
    options: [
      { label: 'Only the factory latch on sliding doors; no window security locks', scoreWeight: 2, tip: 'Factory slide latches can be jimmied in under 5 seconds. Add a secondary Charley bar or track pin lock.' },
      { label: 'Wooden dowel in slider track; ground windows locked', scoreWeight: 6, tip: 'Add shatter-resistant 8-mil safety security film to delay glass breaches by over 90 seconds.' },
      { label: 'Heavy security track locks + 8-mil security film + monitored acoustic glassbreak detectors', scoreWeight: 10, tip: 'Multilayered glass security severely deters smash-and-grab attempts.' }
    ]
  },
  {
    id: 'system_redundancy',
    title: 'If an intruder cuts power or your home internet wire, how does your alarm communicate?',
    category: 'tech',
    options: [
      { label: 'Wi-Fi only cameras / system with no battery or cellular backup', scoreWeight: 1, tip: 'A simple line cut or $30 Wi-Fi deauther jammer knocks Wi-Fi-only systems offline completely.' },
      { label: 'Battery backup present, but relies solely on home broadband cable', scoreWeight: 5, tip: 'Add a dedicated 5G LTE cellular communicator to safeguard against wire-cutting.' },
      { label: 'Dual-SIM 5G Cellular + Encrypted Sub-GHz Mesh + 24-Hour Battery Backup + Jamming Detection', scoreWeight: 10, tip: 'Bank-grade communication resilience meets UL 1023 security standards.' }
    ]
  },
  {
    id: 'visibility_landscaping',
    title: 'Are front windows or entryways obstructed by overgrown shrubs or tall privacy hedges?',
    category: 'visibility',
    options: [
      { label: 'Dense tall bushes (>4ft) shielding front/side windows from street view', scoreWeight: 2, tip: 'Trim shrubs below 3 feet and tree canopies above 7 feet ("3-7 Rule") to maintain natural surveillance.' },
      { label: 'Moderate shrubbery near windows but front door visible from street', scoreWeight: 6, tip: 'Plant thorny deterrence landscaping (e.g., barberry, pyracantha) beneath ground-level windows.' },
      { label: 'Clear sightlines from street, manicured landscaping adhering to CPTED standards', scoreWeight: 10, tip: 'Adheres to Crime Prevention Through Environmental Design (CPTED) best practices.' }
    ]
  },
  {
    id: 'monitoring_dispatch',
    title: 'Who is notified in the event of an intrusion while you are asleep or traveling?',
    category: 'neighborhood',
    options: [
      { label: 'Only local phone notifications (if phone is in Do Not Disturb, nobody responds)', scoreWeight: 3, tip: 'Self-monitoring leaves homes vulnerable during flights, sleep, or low reception.' },
      { label: 'Friends / neighbors alerted via group chat', scoreWeight: 5, tip: 'Neighbors are not trained emergency responders and may hesitate during real burglaries.' },
      { label: '24/7 UL-Certified Central Station with automatic Police/Fire dispatch and two-way voice', scoreWeight: 10, tip: 'Professional dispatch guarantees rapid first responder action within 15-30 seconds.' }
    ]
  }
];
