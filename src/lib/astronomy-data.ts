// Planetary Orbital Dynamics & Astronomical Presets
// Derived from OpenLyceum SolarSystemModels & NASA JPL Horizons Open Data

export interface PlanetData {
  id: string;
  name: string;
  thaiName: string;
  distance: number; // Scaled AU
  radius: number; // Scaled visual radius
  color: string;
  orbitalPeriodDays: number;
  semiMajorAxisAU: number;
  gravityMps2: number;
  description: string;
  thaiDescription: string;
  hasRings?: boolean;
  hasMoon?: boolean;
}

export const SUN_DATA = {
  id: "sun",
  name: "The Sun",
  thaiName: "ดวงอาทิตย์",
  radius: 1.6,
  color: "#FFF5B0",
  emissiveColor: "#FFA500",
  description: "G-type main-sequence star comprising 99.86% of the Solar System's total mass.",
  thaiDescription: "ดาวฤกษ์ชนิด G แถบลำดับหลัก มีมวลคิดเป็น 99.86% ของระบบสุริยะทั้งหมด ขับเคลื่อนด้วยปฏิกิริยานิวเคลียร์ฟิวชัน",
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    thaiName: "ดาวพุธ",
    distance: 2.8,
    radius: 0.22,
    color: "#A3A3A3",
    orbitalPeriodDays: 88.0,
    semiMajorAxisAU: 0.387,
    gravityMps2: 3.7,
    description: "Closest planet to the Sun. Experiences extreme temperature swings (-180°C to 430°C) with no substantial atmosphere.",
    thaiDescription: "ดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์ที่สุด ไม่มีชั้นบรรยากาศหนาแน่น เกิดความแตกต่างของอุณหภูมิสุดขั้ว (-180°C ถึง 430°C)",
  },
  {
    id: "venus",
    name: "Venus",
    thaiName: "ดาวศุกร์",
    distance: 3.8,
    radius: 0.38,
    color: "#E2BA84",
    orbitalPeriodDays: 224.7,
    semiMajorAxisAU: 0.723,
    gravityMps2: 8.87,
    description: "Hottest planet in the Solar System due to runaway greenhouse effect in its dense CO2 atmosphere (465°C).",
    thaiDescription: "ดาวเคราะห์ที่ร้อนที่สุดในระบบสุริยะจากปรากฏการณ์เรือนกระจกยิ่งยวดในบรรยากาศคาร์บอนไดออกไซด์หนาทึบ (465°C)",
  },
  {
    id: "earth",
    name: "Earth",
    thaiName: "โลก",
    distance: 5.0,
    radius: 0.4,
    color: "#2563EB",
    orbitalPeriodDays: 365.25,
    semiMajorAxisAU: 1.0,
    gravityMps2: 9.807,
    description: "Only known celestial body harboring life. Possesses liquid water oceans, protective magnetosphere, and 21% O2.",
    thaiDescription: "ดาวเคราะห์ดวงเดียวที่พบสิ่งมีชีวิต มีมหาสมุทรน้ำเหลว สนามแม่เหล็กปกป้องรังสีสุริยะ และออกซิเจน 21%",
    hasMoon: true,
  },
  {
    id: "mars",
    name: "Mars",
    thaiName: "ดาวอังคาร",
    distance: 6.4,
    radius: 0.3,
    color: "#DC2626",
    orbitalPeriodDays: 687.0,
    semiMajorAxisAU: 1.524,
    gravityMps2: 3.72,
    description: "The Red Planet with iron oxide soil, Olympus Mons volcano, and seasonal polar ice caps of frozen CO2 and water.",
    thaiDescription: "ดาวเคราะห์สีแดงจากแร่เหล็กออกไซด์ มีภูเขาไฟโอลิมปัสที่สูงที่สุดในระบบสุริยะ และมีธารน้ำแข็งขั้วดาว",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    thaiName: "ดาวพฤหัสบดี",
    distance: 8.8,
    radius: 0.85,
    color: "#D97706",
    orbitalPeriodDays: 4332.6,
    semiMajorAxisAU: 5.204,
    gravityMps2: 24.79,
    description: "Largest gas giant with mass 2.5x all other planets combined. Famous for the Great Red Spot anticyclonic storm.",
    thaiDescription: "ดาวเคราะห์แก๊สยักษ์ที่ใหญ่ที่สุด มีมวลมากกว่าดาวเคราะห์อื่นรวมกัน 2.5 เท่า มีพายุจุดแดงใหญ่หมุนวนนับร้อยปี",
  },
  {
    id: "saturn",
    name: "Saturn",
    thaiName: "ดาวเสาร์",
    distance: 11.6,
    radius: 0.72,
    color: "#EAB308",
    orbitalPeriodDays: 10759.2,
    semiMajorAxisAU: 9.582,
    gravityMps2: 10.44,
    description: "Spectacular planetary ring system composed of billions of water ice and rock particles, with density lower than water.",
    thaiDescription: "ระบบวงแหวนอันวิจิตรตระการตาประกอบด้วยอนุภาคน้ำแข็งและเศษหิน มีความหนาแน่นเฉลี่ยต่ำกว่าน้ำ",
    hasRings: true,
  },
  {
    id: "uranus",
    name: "Uranus",
    thaiName: "ดาวยูเรนัส",
    distance: 14.4,
    radius: 0.54,
    color: "#38BDF8",
    orbitalPeriodDays: 30685.4,
    semiMajorAxisAU: 19.22,
    gravityMps2: 8.69,
    description: "Ice giant rotated sideways on its axis by 97.8°, causing 42-year long polar day/night seasonal cycles.",
    thaiDescription: "ดาวยักษ์น้ำแข็งที่มีแกนหมุนเอียงถึง 97.8° ทำให้ขั้วดาวหันเข้าหาดวงอาทิตย์ เกิดฤดูกาลยาวนานข้างละ 42 ปี",
  },
  {
    id: "neptune",
    name: "Neptune",
    thaiName: "ดาวเนปจูน",
    distance: 17.2,
    radius: 0.52,
    color: "#1D4ED8",
    orbitalPeriodDays: 60189.0,
    semiMajorAxisAU: 30.05,
    gravityMps2: 11.15,
    description: "Farthest known planet. Possesses supersonic winds exceeding 2,100 km/h and deep methane-rich blue atmosphere.",
    thaiDescription: "ดาวเคราะห์ที่อยู่ไกลที่สุด มีลมพายุความเร็วเหนือเสียงกว่า 2,100 กม./ชม. และชั้นบรรยากาศมีเทนสีน้ำเงินเข้ม",
  },
];
