import Link from "next/link";
import { PATHS } from "../utils/paths";

export const Sidebar = () => {
    return (
        <aside className="hidden xl:block fixed left-0 top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white/95 p-6 shadow-sm shadow-slate-200/40">
            <div className="space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Staff panel</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">Dashboard</h2>
                    <p className="mt-2 text-sm text-slate-600">Quick links to staff tools and artifact management.</p>
                </div>

                <nav className="space-y-2">
                    <Link
                        href={PATHS.DASHBOARD}
                        className="block rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                    >
                        Overview
                    </Link>
                    {/* <Link
                        href={ }
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                        Artifacts
                    </Link> */}
                    <Link
                        href={PATHS.MANAGER_ARTIFACTS}
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                        Manage artifacts
                    </Link>
                    <Link
                        href="/"
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                        Site home
                    </Link>
                </nav>
            </div>
        </aside>
    );
};
