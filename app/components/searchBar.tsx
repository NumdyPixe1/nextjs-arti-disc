"use client"
import { useScroll, motion, useTransform, useSpring } from "framer-motion";

export const SearchBar = () => {
    const { scrollY } = useScroll();

    // คำนวณระยะการเลื่อน
    // [0, 300] คือระยะ scroll จากบนสุดลงมา 300px
    // [0, -420] คือการดันตัวมันเองขึ้นไป 420px  
    const y = useTransform(scrollY, [0, 300], [0, -320]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

    return (
        <motion.div
            style={{ y: smoothY }}
            className="pointer-events-auto sticky z-50 group max-w-2xl mx-auto w-full px-4"
        >
            <input
                type="text"
                placeholder="ค้นหา..."
                className="w-full h-14 pl-16 pr-6 rounded-xl bg-white text-gray-900 text-xl focus:outline-none transition shadow-2xl border border-gray-100"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

        </motion.div>
    );
};