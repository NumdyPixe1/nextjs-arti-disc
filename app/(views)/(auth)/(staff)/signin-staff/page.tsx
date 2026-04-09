import Link from "next/link";
import { SignInStaffForm } from "./SignInStaffForm";
import { PATHS } from "@/app/utils/paths";

export default function SignInStaffPage() {
    return (
        <main className=" min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4 py-16 text-slate-900">
            <section className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Staff Portal</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-950">เจ้าหน้าที่เข้าสู่ระบบ</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        เข้าถึงแดชบอร์ดและเครื่องมือจัดการข้อมูลโบราณวัตถุสำหรับเจ้าหน้าที่
                    </p>
                </div>

                <div className="space-y-6">
                    <SignInStaffForm />

                    <div className="pt-4 text-center text-sm text-slate-500">
                        <Link href={PATHS.HOME} className="font-medium text-sky-600 hover:text-sky-700">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}



{/* <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        <p>
                            หากยังไม่มีบัญชีเจ้าหน้าที่
                            <Link href="/signup" className="ml-1 font-medium text-sky-600 hover:text-sky-700">
                                สมัครสมาชิก
                            </Link>
                        </p>
                    </div> */}