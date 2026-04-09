import Link from "next/link";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4 py-16 text-slate-900">
            <section className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <h1 className="mt-3 text-3xl font-semibold text-slate-950">
                        สมัครสมาชิก
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {/* สร้างบัญชีใหม่เพื่อเข้าถึงระบบจัดการข้อมูลโบราณวัตถุ */}
                    </p>
                </div>

                <div className="space-y-6">
                    <SignUpForm />

                    {/* <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        <p>
                            หลังจากลงทะเบียน
                            บัญชีของคุณจะอยู่ระหว่างการรอการยืนยันจากผู้ดูแลระบบ
                        </p>
                    </div> */}

                    {/* <div className="pt-4 text-center text-sm text-slate-500">
                        <span>มีบัญชีอยู่แล้วหรือ? </span>
                        <Link
                            href="/signin-staff"
                            className="font-medium text-sky-600 hover:text-sky-700"
                        >
                            เข้าสู่ระบบ
                        </Link>
                    </div> */}

                    <div className="text-center text-sm text-slate-500">
                        <Link href="/" className="font-medium text-sky-600 hover:text-sky-700">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
