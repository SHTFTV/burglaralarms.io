export interface ComparisonRow {
  feature: string;
  hardwired: string;
  wirelessModern: string;
  legacyWifi: string;
}

export const HARDWARE_COMPARISON: ComparisonRow[] = [
  {
    feature: 'Communication Reliability',
    hardwired: '100% immune to wireless RF jamming; physical copper loop.',
    wirelessModern: 'Encrypted Sub-GHz (868/915 MHz) with Multi-Channel Frequency Hopping.',
    legacyWifi: 'Vulnerable to cheap 2.4GHz deauth jammers and packet flooding.'
  },
  {
    feature: 'Installation Complexity',
    hardwired: 'Requires drilling drywall, attic crawlspace runs, and conduit piping ($$$).',
    wirelessModern: 'Peel-and-stick 3M VHB or 2-screw mounting; 15-minute setup per room.',
    legacyWifi: 'Easy DIY, but requires strong Wi-Fi access point coverage near all sensors.'
  },
  {
    feature: 'Power & Battery Life',
    hardwired: 'Central transformer with 12V 7Ah SLA lead-acid battery backup.',
    wirelessModern: 'Ultra-low-power microcontrollers; 4-7 years on standard CR123A/CR2032.',
    legacyWifi: 'High Wi-Fi power draw; requires battery recharging every 3-6 months.'
  },
  {
    feature: 'Tamper Protection',
    hardwired: 'End-of-Line (EOL) resistors detect line cuts or short circuits.',
    wirelessModern: 'Accelerometer tilt sensors, back-plate tamper switches, RF supervision every 12s.',
    legacyWifi: 'Basic ping timeouts (often taking 10-30 mins to report offline state).'
  },
  {
    feature: 'Transmission Range',
    hardwired: 'Up to 300 meters of 22/4 AWG unshielded copper wire.',
    wirelessModern: 'Up to 2,000 meters in open space; penetrates concrete and brick easily.',
    legacyWifi: '15-25 meters through residential drywall; struggles with masonry/stucco.'
  }
];

export const FALSE_ALARM_PREVENTION_TIPS = [
  {
    title: 'SIA CP-01 Standard Exit & Entry Delays',
    desc: 'Ensure your entry delay is at least 30-45 seconds and exit delay is 60 seconds. Rushing through the doorway accounts for 42% of accidental home alarm trips.',
    icon: 'Timer'
  },
  {
    title: 'Pet Immunity Placement Geometry',
    desc: 'Mount PIR motion detectors at exactly 7.5 to 8.0 feet (2.3m). Never point a PIR detector at staircases, sofas, or cat climbing towers where pets can enter the upper thermal beam zone.',
    icon: 'PawPrint'
  },
  {
    title: 'Seasonal HVAC & Draft Mitigation',
    desc: 'Keep motion detectors at least 4 feet away from high-output heating vents, air conditioners, ceiling fans, or flapping window curtains.',
    icon: 'Wind'
  },
  {
    title: 'Two-Way Voice Verification Dispatch',
    desc: 'Modern UL-listed central stations open a live hands-free intercom through your keypad before calling 911 dispatch, allowing you to give your safe verbal password if you tripped it.',
    icon: 'Radio'
  },
  {
    title: 'Scheduled System Walk-Through Testing',
    desc: 'Conduct a monthly "Chime Walk Test" to verify that all magnetic door switches, glassbreak acoustic modules, and PIR sensors register clean signals with healthy battery voltage.',
    icon: 'CheckCircle2'
  }
];

export const MUNICIPAL_PERMIT_GUIDE = [
  {
    topic: 'Do I Need an Alarm Permit?',
    answer: 'Most municipalities and local police departments require homeowners and business owners to register their monitored burglar alarm system and pay a small annual fee ($15 - $50). This registers your emergency keyholder contact info in the 911 CAD dispatch system.'
  },
  {
    topic: 'False Alarm Fine Structures',
    answer: 'Cities generally grant 1 to 2 free false alarms per calendar year. Subsequent false dispatches without visual or audio verification can incur escalating fines ranging from $75 to $350 per police response.'
  },
  {
    topic: 'How BurglarAlarms.io Prevents Fines',
    answer: 'All our systems utilize SIA CP-01 false-alarm reduction standards, dual-knock cross-zoning, and instant Cancel Alarm mobile confirmation to ensure 99.4% false dispatch prevention.'
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    q: 'What happens if an intruder smashes the control panel immediately upon entering?',
    a: 'Our systems feature patented "Crash & Smash" protection. The moment an entry door contact opens, the cloud server expects a valid disarm code within the entry delay period. If the panel is destroyed or disconnected during the countdown, the cloud server automatically treats it as an alarm in progress and dispatches police.'
  },
  {
    q: 'Will my alarm still work during an electrical power blackout or cut internet wire?',
    a: 'Yes. The Aegis Hub contains an onboard 24-hour lithium-ion emergency backup battery and dual-SIM 5G LTE-M cellular communicators that bypass your home electrical grid and fiber/cable internet entirely.'
  },
  {
    q: 'How much can I save on my Homeowners Insurance policy?',
    a: 'Insurance carriers typically offer a 10% to 20% discount on annual homeowner premiums for homes protected by a UL-Certified 24/7 Monitored Burglar & Fire Alarm System. We provide an official digital Certificate of Monitoring for your insurance agent immediately upon activation.'
  },
  {
    q: 'Can large dogs or climbing cats trigger the motion sensors?',
    a: 'Our Dual-Tech PIR + Microwave sensors utilize volumetric pet-immune optical lenses that ignore thermal signatures below 50 lbs (22 kg) moving across the floor. For multiple large dogs or agile climbers, we recommend acoustic glassbreak sensors and perimeter door/window contacts so pets can roam freely with armed perimeter protection.'
  },
  {
    q: 'What is the difference between a Silent Duress Code and standard Disarm PIN?',
    a: 'A standard PIN disarms the alarm normally. A Duress Code (e.g. your PIN + 1 or a preset secondary PIN) appears to disarm the keypad normally to any assailant coercing you, but silently transmits a Priority 1 Hostage/Duress emergency panic signal directly to 911 police dispatch with zero audible indication.'
  }
];
