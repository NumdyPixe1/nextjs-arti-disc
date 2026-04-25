interface Props {
    handleClose: () => void;
    isOpen?: boolean;
    title?: string;
    context?: string;
    children: React.ReactNode;
}

export const ModalLayout = ({ handleClose, title, context, children }: Props) => {
    return (
        < div className="fixed inset-0 z-50 flex items-center justify-center p-4" >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl transform rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
                <button onClick={handleClose}
                    className="cursor-pointer absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                    <p className="mt-2 text-sm text-slate-600">{context}</p>
                </header>
                {/* Content */}
                <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )
}