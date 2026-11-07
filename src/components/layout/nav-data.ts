import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Languages,
  BookOpen,
} from "lucide-react";

export interface NavRoute {
  readonly path: string;
  readonly label: string;
  readonly thaiLabel: string;
  readonly icon: LucideIcon;
  readonly badge?: string;
  readonly description: string;
  readonly thaiDescription: string;
  readonly category: "Core Sciences" | "Linguistics & Humanities" | "Assessment";
  readonly keywords: readonly string[];
}

export const NAV_ROUTES: readonly NavRoute[] = [
  {
    path: "/",
    label: "Platform Portal",
    thaiLabel: "แดชบอร์ดและศูนย์ควบคุม",
    icon: Compass,
    description: "System overview, active subject tracks, metrics, and laboratory launcher.",
    thaiDescription: "ภาพรวมสถาปัตยกรรม สถิติระบบ และจุดเชื่อมต่อไปยังทุกห้องทดลอง",
    category: "Core Sciences",
    keywords: ["home", "portal", "dashboard", "overview", "ศูนย์ควบคุม", "ภาพรวม"],
  },
  {
    path: "/math",
    label: "Mathematics",
    thaiLabel: "คณิตศาสตร์และสมการ",
    icon: Calculator,
    badge: "Mafs 2D",
    description: "Dynamic 2D function graphing, KaTeX typesetter, and sandboxed Math.js AST evaluation.",
    thaiDescription: "กราฟฟังก์ชัน 2 มิติแบบโต้ตอบ การแสดงผลสมการ KaTeX และประเมินค่าตัวแปร",
    category: "Core Sciences",
    keywords: ["math", "mathematics", "formula", "katex", "mafs", "graph", "คณิตศาสตร์", "สมการ", "กราฟ"],
  },
  {
    path: "/physics",
    label: "Physics Laboratory",
    thaiLabel: "ห้องปฏิบัติการฟิสิกส์",
    icon: Atom,
    badge: "Verlet",
    description: "Symplectic orbital mechanics, Hamiltonian energy gauge, and planetary kinematics.",
    thaiDescription: "แบบจำลองวงโคจรของเคปเลอร์ อัลกอริทึม Velocity Verlet และเกจอนุรักษ์พลังงาน",
    category: "Core Sciences",
    keywords: ["physics", "simulation", "verlet", "euler", "orbit", "gravity", "ฟิสิกส์", "แรงโน้มถ่วง", "วงโคจร"],
  },
  {
    path: "/chemistry",
    label: "Chemistry Workstation",
    thaiLabel: "เคมีและตารางธาตุ",
    icon: FlaskConical,
    badge: "IUPAC 118",
    description: "Complete 118-element periodic table, Bohr electron shell orbitals, and electronegativity.",
    thaiDescription: "ตารางธาตุสากล 118 ธาตุ แบบจำลองวงโคจรอิเล็กตรอนของบอห์ร และแนวโน้มเคมี",
    category: "Core Sciences",
    keywords: ["chemistry", "periodic table", "elements", "bohr", "iupac", "เคมี", "ตารางธาตุ", "ธาตุ", "อิเล็กตรอน"],
  },
  {
    path: "/biology",
    label: "Cytology & Biology",
    thaiLabel: "ชีววิทยาและเซลล์",
    icon: Dna,
    badge: "12 Organelles",
    description: "Eukaryotic plant/animal cytology, cross-section mode, and examination notes.",
    thaiDescription: "แบบจำลองเซลล์พืชและเซลล์สัตว์พร้อม 12 ออร์แกเนลล์สำคัญและโหมดผ่าครึ่งเซลล์",
    category: "Core Sciences",
    keywords: ["biology", "cell", "organelle", "nucleus", "mitochondria", "ชีววิทยา", "เซลล์", "ออร์แกเนลล์"],
  },
  {
    path: "/thai",
    label: "Thai Phonology Studio",
    thaiLabel: "สัทศาสตร์ภาษาไทย",
    icon: Languages,
    badge: "Triyang",
    description: "3-byte UTF-8 safe syllable deconstruction, 8 spelling sections, and pitch contours.",
    thaiDescription: "ระบบแยกพยางค์ อักษร 3 หมู่ มาตราตัวสะกด 8 แม่ และเส้นเสียงวรรณยุกต์ 5 เสียง",
    category: "Linguistics & Humanities",
    keywords: ["thai", "phonology", "triyang", "tone", "syllable", "ภาษาไทย", "ไตรยางศ์", "วรรณยุกต์", "พยางค์"],
  },
  {
    path: "/practice",
    label: "Practice Engine",
    thaiLabel: "แบบฝึกหัดและการประเมิน",
    icon: BookOpen,
    badge: "FEAT-21",
    description: "Universal multi-subject question bank with instant grading and step breakdowns.",
    thaiDescription: "คลังข้อสอบและแบบฝึกหัด 5 หมวดวิชา ตรวจคำตอบอัตโนมัติพร้อมเฉลยละเอียด",
    category: "Assessment",
    keywords: ["practice", "quiz", "exercise", "exam", "assessment", "แบบฝึกหัด", "ข้อสอบ", "การวัดผล"],
  },
];

export interface BreadcrumbItem {
  readonly label: string;
  readonly thaiLabel: string;
  readonly path: string;
  readonly isCurrent: boolean;
}

export function getNavRouteByPath(pathname: string): NavRoute | undefined {
  const normalized = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return NAV_ROUTES.find((r) => r.path === normalized);
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const normalized = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const homeRoute = NAV_ROUTES[0];

  if (normalized === "/" || normalized === "") {
    return [
      {
        label: homeRoute.label,
        thaiLabel: homeRoute.thaiLabel,
        path: "/",
        isCurrent: true,
      },
    ];
  }

  const currentRoute = getNavRouteByPath(normalized);

  return [
    {
      label: homeRoute.label,
      thaiLabel: homeRoute.thaiLabel,
      path: "/",
      isCurrent: false,
    },
    {
      label: currentRoute ? currentRoute.label : normalized.replace("/", ""),
      thaiLabel: currentRoute ? currentRoute.thaiLabel : normalized.replace("/", ""),
      path: normalized,
      isCurrent: true,
    },
  ];
}

export function searchNavRoutes(query: string): NavRoute[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [...NAV_ROUTES];

  return NAV_ROUTES.filter((route) => {
    return (
      route.label.toLowerCase().includes(clean) ||
      route.thaiLabel.toLowerCase().includes(clean) ||
      route.description.toLowerCase().includes(clean) ||
      route.thaiDescription.toLowerCase().includes(clean) ||
      route.keywords.some((k) => k.toLowerCase().includes(clean))
    );
  });
}
