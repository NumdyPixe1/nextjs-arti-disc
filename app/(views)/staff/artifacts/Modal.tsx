import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { InputField } from "@/app/components/InputField";
import { ModalLayout } from "@/app/components/ModalLayout";
import { ArtifactsForm } from "@/@types/artifact";

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    // 
    onSubmit: (data: ArtifactsForm) => void;
    onConfirm?: () => void;
    itemName?: string;
    isLoading?: boolean;
    // 
    initialData?: ArtifactsForm
}

export const EditModal = ({ initialData, isLoading, isOpen, onClose, onSubmit,
}: Props) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm({ defaultValues: initialData });

    // อัปเดตข้อมูลในฟอร์มทุกครั้งที่เปิด Modal ชิ้นใหม่
    useEffect(() => {
        if (isOpen && initialData) {
            reset(initialData);
            console.log("Resetting form with:", initialData);
        }
    }, [initialData, isOpen, reset])

    const handleClose = () => {
        reset();
        onClose();
        setPreviewUrl(null);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e, (file, url) => {
            setPreviewUrl(url);
            setValue("image_file", file);
        });
    }

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    if (!isOpen) return null;
    return (
        <ModalLayout isOpen={isOpen} handleClose={handleClose} title="Edit Artifact">
            {isLoading ? <LoadingSpinner /> : (
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* ใช้ InputField ที่เราสร้างไว้ก่อนหน้า */}
                    <InputField
                        {...register("title")}
                        label="Title"
                        placeholder="e.g., Golden Buddha Statue"
                        type="text"
                        id="title" />
                    <InputField label="Art Style" {...register("art_style")} placeholder="e.g., Impressionism" id="artStyle" />
                    <InputField label="Location" {...register("current_location")} />
                    <InputField label="Location Found" {...register("location_found")} />
                    <InputField label="Era" {...register("era")} />
                    <InputField label="Category" {...register("category")} id="category" />

                    {/* พิกัดภูมิศาสตร์ */}
                    <InputField label="Lat" type="number" step="any" {...register("lat")} />
                    <InputField label="Lng" type="number" step="any" {...register("lng")} />

                    {/* การจัดการรูปภาพ */}
                    <div className="grid gap-2">
                        <InputField
                            label="Image"
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />

                    </div>

                    <InputField label="Material" {...register("material")} />

                    <div className="md:col-span-2">
                        <InputField label="Description" isTextArea {...register("description")} />
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}
        </ModalLayout>)

}

export const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }: Props) => {
    const handleClose = () => {
        onClose();
    };
    if (!isOpen) return null;

    return (
        <ModalLayout isOpen={isOpen} handleClose={handleClose}>
            <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Item</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-slate-900">"{itemName}"</span>?
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer flex-1 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer flex-1 rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Delete
                    </button>
                </div>
            </div>

        </ModalLayout>
    );
}

export const AddModal = ({ isLoading, isOpen, onClose, onSubmit }: Props) => {
    const { register, handleSubmit, reset, setValue } = useForm<ArtifactsForm>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClose = () => {
        reset();
        onClose();
        setPreviewUrl(null);
    };
    const internalSubmit = (data: ArtifactsForm) => {
        // ส่งข้อมูลกลับไปให้ตัวแม่ (Parent)
        onSubmit(data);
    }

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

    if (!isOpen) return null;
    return (
        <ModalLayout isOpen={isOpen} handleClose={handleClose} title="Add New Artifact" context="Fill in the details below to register a new artifact in the collection.">
            <form onSubmit={handleSubmit(internalSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    {...register("lat")}
                    label="Lat"
                    placeholder="e.g., 123.45"
                    type="text"
                    id="lat"
                />
                <InputField
                    {...register("lng")}
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
                        {isLoading ? 'Submitting...' : 'Submit Artifact'}
                    </button>
                </div>
            </form>

        </ModalLayout>)

}