import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
        <div className="inline-flex p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-cyan-400">
          <Compass className="h-8 w-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
            404 NOT FOUND
          </span>
          <h1 className="text-2xl font-heading font-semibold text-neutral-100">
            Laboratory Route Not Found
          </h1>
          <p className="text-xs font-sans text-neutral-400">
            ไม่พบห้องปฏิบัติการหรือหน้าที่ระบุ กรุณาตรวจสอบเส้นทางหรือกลับสู่แดชบอร์ดหลัก
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Platform Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
