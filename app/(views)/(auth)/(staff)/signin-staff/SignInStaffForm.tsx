"use client";

import { FormEvent, useState } from "react";

import { signInAction } from "@/app/actions/signInAction";
export const SignInStaffForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const result = await signInAction(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false); // หยุดโหลดเพื่อให้ผู้ใช้แก้ข้อมูลใหม่ได้
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
            setLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
                <label htmlFor="staffEmail" className="block text-sm font-medium text-slate-700">
                    อีเมลเจ้าหน้าที่
                </label>
                <input
                    id="staffEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="staff@domain.com"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="staffPassword" className="block text-sm font-medium text-slate-700">
                    รหัสผ่าน
                </label>
                <input
                    id="staffPassword"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    required
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    จำฉันไว้ในระบบ
                </label>
                <button type="button" className="text-sky-600 hover:text-sky-700">
                    ลืมรหัสผ่าน?
                </button>
            </div>

            {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบเจ้าหน้าที่"}
            </button>
        </form>
    );
}; 