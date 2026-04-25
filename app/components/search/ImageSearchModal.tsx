import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { ArtifactsForm } from "@/@types/artifact";
import { handleImageUpload } from '@/app/utils/ImageUpload';


interface Props {
    // onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: (data: ArtifactsForm) => void;
}
export const ImageSearchModal = ({ isOpen, onClose, onSubmit }: Props) => {
    const { handleSubmit, reset, setValue } = useForm<ArtifactsForm>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // เช็คว่า Component โหลดที่ Browser หรือยัง
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = () => {
        if (previewUrl) {
            // Memory Cleanup
            URL.revokeObjectURL(previewUrl);
        }

        reset();
        onClose();
        setPreviewUrl(null);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e, (file, url) => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(url);
            // อัปเดตค่าใน react-hook-form เพื่อเตรียมส่งไป API
            setValue("image_file", file);
            console.log("Image File", file);
        });
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute  inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            <div className="relative w-full max-w-2xl transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">Search by Image</h1>
                    <p className="mt-2 text-sm text-slate-600">Upload an image to find similar artifacts in the collection.</p>
                </header>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg mb-4" />
                    ) : <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>}

                    <div className="mt-4">
                        <label htmlFor="imageFile" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">{onFileChange.name || "Upload an image"}</span>
                        </label>
                        <input
                            accept="image/*"
                            className="sr-only"
                            type="file"
                            id="imageFile"
                            onChange={onFileChange}
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit(onSubmit)}
                        type="button"
                        className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        , document.body
    );

}
