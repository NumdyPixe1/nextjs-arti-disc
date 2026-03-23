import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="text-center px-6">
                {/* Icon
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                        <svg className="w-24 h-24 text-blue-400 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.88-6.08-2.33M12 9v3m0 3h.01" />
                        </svg>
                    </div>
                </div> */}

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">404</h1>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white/80 mb-3">ไม่พบโบราณวัตถุ</h2>
                <p className="text-lg text-white/50 mb-8 max-w-md mx-auto">
                    ขออภัย โบราณวัตถุที่คุณกำลังมองหาอาจถูกลบหรือไม่มีอยู่ในระบบแล้ว
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer">
                            กลับไปหน้าแรก
                        </button>
                    </Link>
                    {/* <Link href="/#artifacts">
                        <button className="px-8 py-3 border border-white/30 hover:border-white/60 text-white/70 hover:text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer">
                            ดูโบราณวัตถุทั้งหมด
                        </button>
                    </Link> */}
                </div>

                {/* Decorative element */}
                {/* <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-white/40 text-sm">
                        รหัส: 404 | ไม่พบเนื้อหา
                    </p>
                </div> */}
            </div>
        </div>
    );
}