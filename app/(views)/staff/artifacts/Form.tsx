import { useForm } from "react-hook-form";
import { InputField } from "@/app/(views)/staff/artifacts/InputField";
import { ArtifactsForm } from "@/@types/artifact";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { handleImageUpload } from '@/app/utils/ImageUpload';

interface Props {
    initialData?: ArtifactsForm | null;
    onSubmit: (data: ArtifactsForm) => void;
    isLoading?: boolean;
}

export const ArtifactForm = ({ isLoading, initialData, onSubmit }: Props) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { register, handleSubmit, setValue } = useForm<ArtifactsForm>({ defaultValues: initialData || {} });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e, (file, url) => {
            setPreviewUrl(url);
            setValue("image_file", file);
        });
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                // Memory Cleanup
                URL.revokeObjectURL(previewUrl);
                console.log("Cleaned up proxy URL");
            }
        }
    }, [previewUrl]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
                {...register("title")}
                label="Title"
                placeholder="e.g., Golden Buddha Statue"
                type="text"
                id="title" />
            <InputField
                {...register("art_style")}
                label="Art Style"
                placeholder="e.g., Impressionism"
                type="text"
                id="artStyle" />
            <InputField
                {...register("current_location")}
                label="Location"
                placeholder="e.g., Bangkok National Museum"
                type="text"
                id="currentLocation" />
            <InputField
                {...register("location_found")}
                label="Location Found"
                placeholder="e.g., Ayutthaya"
                type="text"
                id="locationFound" />
            <InputField
                {...register("era")}
                label="Era"
                placeholder="e.g., Ayutthaya"
                type="text"
                id="era" />
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
            <InputField
                {...register("image_file")}
                label="Image"
                type="file"
                id="image"
                accept="image/*"
                onChange={onFileChange}
            />

            <div className="grid gap-2 md:col-span-2">
                <InputField
                    isTextArea
                    {...register("description")}
                    label="Description"
                    placeholder="Describe the artifact..."
                    id="description"
                />
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    {isLoading
                        ? (initialData ? 'Saving...' : 'Submitting...')
                        : (initialData ? 'Save Changes' : 'Submit')}
                </button>
            </div>
        </form>
    )
}