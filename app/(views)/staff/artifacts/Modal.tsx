import { ModalLayout } from "@/app/components/ModalLayout";
import { ArtifactsForm } from "@/@types/artifact";
import { ArtifactForm } from "./Form";

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

    const handleClose = () => {
        onClose();
    };
    return (
        <ModalLayout isOpen={isOpen}
            handleClose={handleClose}
            title="Edit Artifact" context="">
            <ArtifactForm
                initialData={initialData}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
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

export const AddModal = ({ isLoading, isOpen, onClose, onSubmit, initialData }: Props) => {

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;
    return (
        <ModalLayout isOpen={isOpen}
            handleClose={handleClose}
            title="Add New Artifact" context="Fill in the details below to register a new artifact in the collection.">
            <ArtifactForm
                initialData={initialData}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </ModalLayout>)

}