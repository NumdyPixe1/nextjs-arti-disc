import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="font-ibm-thai flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="text-center px-6">
                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">404</h1>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white/80 mb-3">ไม่พบหน้านี้</h2>
                <p className="text-lg text-white/50 mb-8 max-w-md mx-auto">
                    ขออภัย หน้าที่คุณกำลังมองหาอาจถูกลบหรือไม่มีอยู่ในระบบแล้ว
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
            </div>
        </div>
    );
}