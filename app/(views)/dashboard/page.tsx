import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { PATHS } from "@/app/utils/paths";
import { getAllStaff, getCurrentUser } from '@/app/actions/userAction';
import { KpiCard } from "@/app/components/KpiCard";
import { getAllArtifactsStaff } from '@/app/actions/artifactAction';
import { getAllUsers } from '@/app/actions/userAction';

export default async function DashBoard() {
    const { data: user, error } = await getCurrentUser();
    const users = await getAllUsers();
    const artifacts = (await getAllArtifactsStaff()) || [];
    const staffMembers = await getAllStaff();

    const totalUsers = users.length;

    const totalStaff = staffMembers.length;
    const totalArtifacts = artifacts.length;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:ml-72">
            <Sidebar />

            <div className="mx-auto max-w-7xl">
                <main className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/20">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Staff dashboard</p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back {user?.full_name} </h1>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                                <KpiCard title="Total Artifacts" value={totalArtifacts} colorClass="blue" />
                                <KpiCard title="Total Staff" value={totalStaff} colorClass="blue" />
                                <KpiCard title="Total Users" value={totalUsers} colorClass="blue" />

                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
