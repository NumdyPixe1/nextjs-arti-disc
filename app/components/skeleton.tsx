import { motion } from "framer-motion";

export const Skeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1, 0.98] }}
            transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 h-72 bg-gray-200 rounded-2xl flex flex-col relative overflow-hidden"
        >
            {/* ส่วนจำลองรูปภาพ */}
            <div className="w-full h-full bg-gray-300" />

            {/* ส่วนจำลองข้อความ Overlay ด้านล่าง */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="h-4 bg-gray-400 rounded w-3/4" />
                <div className="h-3 bg-gray-400 rounded w-1/2" />
            </div>

            {/* shimmer */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
            </div>
        </motion.div>
    );
};

{/* Hidden Title that appears on Hover  */ }