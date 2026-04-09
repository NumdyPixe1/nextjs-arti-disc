import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { PATHS } from "@/app/utils/paths";

export default function DashBoard() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl gap-6">
                <Sidebar />

                <main className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/20">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Staff dashboard</p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-slate-700">Use the sidebar to navigate staff sections.</p>
                        </div>

                        <Link
                            href={PATHS.MANAGER_ARTIFACTS}
                            className="inline-flex rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700"
                        >
                            View artifacts
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
