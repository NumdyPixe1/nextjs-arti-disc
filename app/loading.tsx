export default function LoadingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <h2 className="text-lg text-cyan-100 font-semibold">กำลังโหลดข้อมูล...</h2>
                <p className="text-sm text-white/60 text-center max-w-xs">กรุณารอสักครู่ ข้อมูลกำลังถูกรับเข้ามา</p>
            </div>
        </div>
    );
}
