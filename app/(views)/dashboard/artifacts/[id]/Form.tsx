"use client";

import { useForm } from "react-hook-form";
import { InputField } from "@/app/(views)/dashboard/artifacts/[id]/InputField";
import { ArtifactsForm } from "@/@types/artifact";

interface Props {
    initialData?: ArtifactsForm | null;
    onSubmit: (data: ArtifactsForm) => void;
    isLoading?: boolean;
}

export const ArtifactForm = ({ isLoading, initialData, onSubmit }: Props) => {
    const { register, handleSubmit } = useForm<ArtifactsForm>({
        defaultValues: initialData || {},
        // 🟢 สำคัญมากสำหรับการย้ายมาเป็นหน้าใหม่: 
        // บังคับให้อัปเดตข้อมูลลงช่อง Input ทันทีเมื่อข้อมูล Async จากเซิร์ฟเวอร์โหลดเสร็จ
        values: initialData || undefined
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
                {...register("title")}
                label="Title"
                placeholder="e.g., Golden Buddha Statue"
                type="text"
                id="title"
            />
            <InputField
                {...register("art_style")}
                label="Art Style"
                placeholder="e.g., Impressionism"
                type="text"
                id="artStyle"
            />
            <InputField
                {...register("current_location")}
                label="Location"
                placeholder="e.g., Bangkok National Museum"
                type="text"
                id="currentLocation"
            />
            <InputField
                {...register("location_found")}
                label="Location Found"
                placeholder="e.g., Ayutthaya"
                type="text"
                id="locationFound"
            />
            <InputField
                {...register("era")}
                label="Era"
                placeholder="e.g., Ayutthaya"
                type="text"
                id="era"
            />
            <InputField
                {...register("category")}
                label="Category"
                placeholder="e.g., Ayutthaya"
                type="text"
                id="category"
            />
            <InputField
                {...register("lat", { valueAsNumber: true })}
                label="Lat"
                placeholder="e.g., 123.45"
                type="text"
                id="lat"
            />
            <InputField
                {...register("lng", { valueAsNumber: true })}
                label="Lng"
                placeholder="e.g., 123.45"
                type="text"
                id="lng"
            />
            <InputField
                {...register("material")}
                label="Material"
                placeholder="e.g., Bronze, Wood, Stone"
                type="text"
                id="material"
            />

            {/* Image Upload Field */}
            <div className="md:col-span-2">
                <InputField
                    {...register("image_file")}
                    label="Image"
                    id="artifactImage"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    isImageField={true}
                />
            </div>

            {/* Description TextArea */}
            <div className="grid gap-2 md:col-span-2">
                <InputField
                    isTextArea
                    {...register("description")}
                    label="Description"
                    placeholder="Describe the artifact..."
                    id="description"
                />
            </div>

            {/* 🟢 ปุ่ม Action ด้านล่าง (ปรับให้กางเต็มแผง Grid และดันปุ่มไปทางขวาตามสไตล์สากล) */}
            <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-5 md:col-span-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-98 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            {/* SVG Loading icon จิ๋ว */}
                            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {initialData ? 'Saving Changes...' : 'Submitting...'}
                        </span>
                    ) : (
                        initialData ? 'Save Changes' : 'Submit Artifact'
                    )}
                </button>
            </div>
        </form>
    );
};