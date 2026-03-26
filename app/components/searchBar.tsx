// UI Search Bar & Call back คำค้นหา
"use client"
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

interface Props {
    //รับ param 1 ตัว ชื่อ query เท่านั้น และ รับค่าเข้าโดยไม่ต้องส่งค่าออก
    onSearch: (query: string) => void
    loading?: boolean;
}

// รับคำค้นหา
export const SearchBar = ({ onSearch, loading }: Props) => {
    const [query, setQuery] = useState("");

    // กดค้นหา
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ไม่มีคำค้นหา ให้ return
        if (!query.trim()) return;
        // Callback คำค้นหา ไป Home page
        onSearch(query);
    }

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, -320]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

    return (
        <motion.div
            style={{ y: smoothY }}
            className="pointer-events-auto sticky z-50 group max-w-2xl mx-auto w-full px-4"
        >
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    placeholder="ค้นหา..."
                    className="flex-1 h-14 pl-16 pr-6 rounded-xl bg-white text-gray-900 text-xl focus:outline-none transition shadow-2xl border border-gray-100"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {/*  */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl ml-2 h-14 font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
                    disabled={loading}>
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            กำลังคิด...
                        </>
                    ) : (
                        <>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            ส่ง
                        </>
                    )}
                </button>
            </form>
        </motion.div >
    );
};

// คำนวณระยะการเลื่อน
// [0, 300] คือระยะ scroll จากบนสุดลงมา 300px
// [0, -420] คือการดันตัวมันเองขึ้นไป 420px