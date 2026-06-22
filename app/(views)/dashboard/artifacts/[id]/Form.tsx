"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArtifactForm } from "../Form";
import { editArtifact as editArtifactAction } from "@/app/actions/artifactAction";
import { convertToFormData } from "@/app/utils/convertToFormData";
import { Artifact, ArtifactsForm } from "@/@types/artifact";
import { PATHS } from "@/app/utils/paths";

interface Props {
    artifact: Artifact;
    initialData?: ArtifactsForm
}

export default function EditArtifactFormPage({ artifact, initialData }: Props) { // 💡 เปลี่ยนชื่อ Component ให้ชัดเจน ไม่ซ้ำกับ HTML tag "Form"
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info');

    const handleSubmit = async (data: ArtifactsForm) => {
        setIsSaving(true);
        setStatusMessage(null);
        try {
            const formData = convertToFormData(data);
            // 🟢 เรียกใช้ผ่านชื่อที่เราตั้ง alias ไว้ มั่นใจได้ว่าไม่พังแน่นอน
            const result = await editArtifactAction(artifact.id, formData);

            if (result) {
                setStatusType('success');
                setStatusMessage('Artifact updated successfully.');

                // ให้ระบบดึงข้อมูลล่าสุดจากเซิร์ฟเวอร์มาอัปเดตหน้าจอพรีวิวซ้ายมือทันที
                router.refresh();
            } else {
                setStatusType('error');
                setStatusMessage('Unable to update the artifact. Please try again.');
            }
        } catch (error) {
            setStatusType('error');
            setStatusMessage('Save failed. Please check the form and try again.');
            console.error('Edit artifact failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/10">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Edit artifact</p>
                        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Update artifact record</h3>
                    </div>

                </div>

                {statusMessage ? (
                    <div className={`mb-6 rounded-2xl border p-4 text-sm transition-all ${statusType === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                        {statusMessage}
                    </div>
                ) : null}

                <ArtifactForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </section>
        </div>
    );
}