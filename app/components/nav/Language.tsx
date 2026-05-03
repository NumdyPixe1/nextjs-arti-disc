import { useState } from "react";

export const Language = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("TH");

    const changeLanguage = (lang: string) => {
        setSelectedLang(lang);
        setIsLangOpen(false);
    };
    return (<div className="relative">
        <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
            {selectedLang}
            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        {isLangOpen && (
            <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <button
                    type="button"
                    onClick={() => changeLanguage("TH")}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                    ไทย
                </button>
                <button
                    type="button"
                    onClick={() => changeLanguage("EN")}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                    English
                </button>
            </div>
        )}
    </div>)
}