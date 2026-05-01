import { handleImageUpload } from "@/app/utils/ImageUpload";
import React, { useEffect, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    placeholder?: string;
    type?: string;
    id?: string;
    isTextArea?: boolean;
    isImageField?: boolean;
}

export const InputField = React.forwardRef<any, Props>(
    ({ label, placeholder, type = "text", id, isTextArea, isImageField, className, onChange, ...props }, ref) => {
        const inputClass = "rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 w-full";
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);
        const [imageFileName, setImageFileName] = useState<string>("");

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // 1. เรียกใช้ Utility ที่คุณเขียนไว้
            handleImageUpload(e, (file, url) => {
                if (file && url) {
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(url);
                    setImageFileName(file.name ?? "");
                }
            });

            // 2. สำคัญมาก: ส่ง event ไปให้ react-hook-form (onChange ที่รับมาจาก props)
            if (onChange) {
                onChange(e);
            }
        };

        // Cleanup memory เมื่อปิดหน้าจอ
        useEffect(() => {
            return () => {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
            };
        }, [previewUrl]);

        const renderInput = () => {
            if (isTextArea) {
                return (
                    <textarea
                        ref={ref}
                        className={inputClass}
                        id={id}
                        placeholder={placeholder}
                        rows={3}
                        {...(props as any)}
                        onChange={onChange}
                    />
                );
            }

            if (isImageField) {
                return (
                    <div >
                        <input
                            ref={ref}
                            type="file"
                            accept="image/*"
                            id={id} // ใช้ id จาก props
                            className="hidden" // ซ่อน input
                            {...(props as any)}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="artifactImage" className="mt-4 p-8  block cursor-pointer rounded-xl border border-dashed border-gray-300  text-center  hover:bg-gray-50 transition-colors">
                            {previewUrl ? (
                                <div className="space-y-3">
                                    <img src={previewUrl} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-2xl" />
                                    <span className="mt-2 block text-sm font-medium text-gray-900">{imageFileName}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-slate-500">
                                    <svg className="h-10 w-10 text-slate-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="font-medium text-slate-700">No image selected</p>
                                </div>

                            )}
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                        </label>
                    </div>
                );
            }

            return (
                <input
                    ref={ref}
                    className={inputClass}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...(props as any)}
                    onChange={onChange}
                />
            );
        };

        return (
            <div className="grid gap-2">
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                    {label}
                </label>
                {renderInput()}
            </div>
        );
    }
);