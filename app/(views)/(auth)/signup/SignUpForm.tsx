"use client";

import { signUpAction } from "@/app/actions/signUpAction";
import { FormEvent, useState } from "react";

export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // agreeTerms: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (event.currentTarget as HTMLInputElement).checked
                    : value,
        }
        ));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validation
            if (
                !formData.fullName ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword
            ) {
                throw new Error("กรุณากรอกข้อมูลให้ครบทั้งหมด");
            }

            if (formData.password.length < 8) {
                throw new Error("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
            }

            if (formData.password !== formData.confirmPassword) {
                throw new Error("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
            }

            // if (!formData.agreeTerms) {
            //     throw new Error("กรุณายอมรับเงื่อนไขการใช้บริการ");
            // }

            const formDataObj = new FormData();
            formDataObj.append("email", formData.email);
            formDataObj.append("password", formData.password);
            formDataObj.append("full_name", formData.fullName);

            const result = await signUpAction(formDataObj);

            // TODO: Connect to staff registration API or action
            setSuccess(true);
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                // agreeTerms: false,
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="mb-3 flex justify-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                        <svg
                            className="h-6 w-6 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-emerald-900">
                    การลงทะเบียนสำเร็จ
                </h3>
                <p className="mt-2 text-sm text-emerald-700">
                    บัญชีของคุณได้รับการสร้างเรียบร้อยแล้ว
                    กรุณารอการอนุมัติจากผู้ดูแลระบบ
                </p>
                <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                    ลงทะเบียนอีกครั้ง
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                    ชื่อ-นามสกุล
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="เช่น นาย สมชาย ใจดี"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    อีเมล
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="staff@example.com"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    รหัสผ่าน
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
                <p className="mt-1 text-xs text-slate-500">
                    อย่างน้อย 8 ตัวอักษร ควรมีตัวอักษร ตัวเลข และสัญลักษณ์
                </p>
            </div>

            <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                    ยืนยันรหัสผ่าน
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
            </div>

            {/* <label className="flex items-start gap-3">
                <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs leading-5 text-slate-600">
                    ฉันยอมรับ{" "}
                    <button type="button" className="font-medium text-sky-600 hover:text-sky-700">
                        เงื่อนไขการใช้บริการ
                    </button>{" "}
                    และ{" "}
                    <button type="button" className="font-medium text-sky-600 hover:text-sky-700">
                        นโยบายความเป็นส่วนตัว
                    </button>
                </span>
            </label> */}

            {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {loading ? "กำลังลงทะเบียน..." : "สร้างบัญชี"}
            </button>
        </form>
    );
};
