import { ChangeEvent, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { createPortal } from "react-dom";
interface Props {
    isOpen?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    itemName?: string;
    isLodading?: boolean;
}
interface DataProps extends Props {
    // message?: string;
    // messageType?: string;
    title: string;
    locationFound: string;
    artStyle: string;
    location: string;
    description: string;
    imageFile: File | null;
    material: string;

    setTitle: (value: string) => void;
    setLocationFound: (value: string) => void;
    setArtStyle: (value: string) => void;
    setLocation: (value: string) => void;
    setDescription: (value: string) => void;
    setImageFile: (file: File | null) => void;
    setMaterial: (value: string) => void;
}
interface ImageSearchProps extends Props {
    // imageFile: File | null;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
}

export const EditModal = ({ isLodading, isOpen, onClose, onConfirm,
    title, locationFound, artStyle, location, description, imageFile, material,
    setTitle, setLocationFound, setArtStyle, setLocation, setDescription, setImageFile, setMaterial
}: DataProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">Edit Artifact</h1>
                    <p className="mt-2 text-sm text-slate-600">Update the details of the artifact below.</p>
                </header>

                {isLodading ? <LoadingSpinner /> : (<form onSubmit={(e) => {
                    e.preventDefault();
                    onConfirm?.();
                }}
                    className=" grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Ayutthaya"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="artStyle" className="text-sm font-medium text-slate-700">Art Style</label>
                        <input
                            type="text"
                            id="artStyle"
                            value={artStyle}
                            onChange={(e) => setArtStyle(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Ayutthaya"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium text-slate-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Museum"
                        />
                    </div>


                    <div className="grid gap-2">
                        <label htmlFor="locationFound" className="text-sm font-medium text-slate-700">Location Found</label>
                        <input
                            type="text"
                            id="locationFound"
                            value={locationFound}
                            onChange={(e) => setLocationFound(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bangkok, Thailand"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="imageFile" className="text-sm font-medium text-slate-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageFile"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                    setImageFile(file);
                            }
                            }
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="material" className="text-sm font-medium text-slate-700">Material</label>
                        <input
                            type="text"
                            id="material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bronze"
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 resize-none"
                            placeholder="Enter a description..."
                            rows={3}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 md:col-span-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer flex-1 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer flex-1 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </form>)}

            </div>
        </div >);
}

export const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Modal Content */}
            <div className="relative w-full max-w-md transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
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
            </div>
        </div>
    );
}

export const AddModal = ({ isLodading, isOpen, onClose, onConfirm,
    title, locationFound, artStyle, location, description, imageFile, material,
    setTitle, setLocationFound, setArtStyle, setLocation, setDescription, setImageFile, setMaterial
}: DataProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>


                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">Add New Artifact</h1>
                    <p className="mt-2 text-sm text-slate-600">Fill in the details below to register a new artifact in the collection.</p>
                </header>

                <form onSubmit={onConfirm} className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Golden Buddha Statue"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="artStyle" className="text-sm font-medium text-slate-700">Art Style</label>
                        <input
                            type="text"
                            id="artStyle"
                            value={artStyle}
                            onChange={(e) => setArtStyle(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Impressionism"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium text-slate-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bangkok National Museum"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="locationFound" className="text-sm font-medium text-slate-700">Location Found</label>
                        <input
                            type="text"
                            id="locationFound"
                            value={locationFound}
                            onChange={(e) => setLocationFound(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Ayutthaya"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="image" className="text-sm font-medium text-slate-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageFile"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                    setImageFile(file);
                            }
                            }
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="material" className="text-sm font-medium text-slate-700">Material</label>
                        <input
                            type="text"
                            id="material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="e.g., Bronze, Wood, Stone"
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-black outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            placeholder="Describe the artifact..."
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={isLodading}
                            className="cursor-pointer rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {isLodading ? 'Submitting...' : 'Submit Artifact'}
                        </button>
                        {/* {message && (
                            <p className={`text-sm ${messageType === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                                {message}
                            </p>
                        )} */}
                    </div>
                </form>
            </div>
        </div>)
}

export const ImageSearchModal = ({ isOpen, onClose, onFileChange, previewUrl, itemName, onConfirm }: ImageSearchProps) => {
    if (!isOpen) return null;

    const [mounted, setMounted] = useState(false);

    // เช็คว่า Component โหลดที่ Browser หรือยัง
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute  inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                <button
                    onClick={onClose}
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
                            <span className="mt-2 block text-sm font-medium text-gray-900">{itemName || "Upload an image"}</span>
                        </label>
                        <input
                            accept="image/*"
                            className="sr-only"
                            type="file"
                            id="imageFile"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    onFileChange(e);
                                }
                            }}
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
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

