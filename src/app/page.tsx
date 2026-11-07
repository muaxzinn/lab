import type { Metadata } from "next";
import { StudioHub } from "@/components/home/StudioHub";

export const metadata: Metadata = {
  title: "Interactive Learning Platform | แพลตฟอร์มการเรียนรู้และห้องทดลองวิทยาศาสตร์",
  description:
    "Next-generation modular interactive learning platform with 3D WebGL simulations, Keplerian orbital mechanics, IUPAC periodic table, and OpenLyceum-inspired guided inquiry lessons.",
};

export default function Home() {
  return <StudioHub />;
}
