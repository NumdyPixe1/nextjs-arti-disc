import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { PATHS } from "@/app/utils/paths";
import { getAllStaff } from '@/app/actions/userAction';

export default async function ManagerStaffPage() {
    const staffMembers = await getAllStaff();

    // const pendingEmbeddings = artifacts.filter((item: any) => !item.embedding || item.embedding.length === 0).length;
    // const avgArtifactsPerStaff = totalStaff > 0 ? Math.round(totalArtifacts / totalStaff) : 0;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:ml-72">
            <Sidebar />

            <div className="mx-auto max-w-7xl">
                <main className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/20">
                    <div className="mb-8 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Manager workspace</p>
                            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Staff management</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                                Review team activity, invite new staff, and keep the roster aligned with your artifact workflows.
                            </p>
                        </div>


                    </div>

                    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Team roster</h2>
                                <p className="mt-2 text-sm text-slate-600">A quick view of staff roles, status, and contact information.</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={PATHS.SIGNUP}
                                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700"
                                >
                                    Invite new staff
                                </Link>
                                <Link
                                    href={PATHS.MANAGER_ARTIFACTS}
                                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                    Open artifacts
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/10">
                            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Name</th>
                                        <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Role</th>
                                        <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Email</th>
                                        <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {staffMembers.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-slate-900">{staff.full_name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{staff.role}</td>
                                            {/* <td className="px-6 py-4 text-slate-600">{staff.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${staff.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {staff.status}
                                                </span>
                                            </td> */}
                                            {/* <td className="px-6 py-4">
                                                <Link href={PATHS.MANAGER_ARTIFACTS} className="text-sky-600 transition hover:text-sky-700">
                                                    View assignments
                                                </Link>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    );
}
