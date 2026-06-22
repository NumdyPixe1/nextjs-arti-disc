"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    // คำนวณตัวเลขชิ้นงานที่กำลังแสดงผล
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 px-2">
            {/* ฝั่งซ้าย: ข้อความแสดงสถานะจำนวนชิ้น */}
            <p className="text-xs font-medium text-slate-500">
                แสดงผลชิ้นที่ {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, totalItems)} จากทั้งหมด {totalItems} ชิ้น
            </p>

            {/* ฝั่งขวา: ปุ่มกดเปลี่ยนหน้า */}
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                {/* ปุ่มย้อนกลับ (<) */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    className="cursor-pointer h-8 w-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    &lt;
                </button>

                {/* วนลูปสร้างปุ่มตัวเลข 1 2 3 ... */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`cursor-pointer h-8 px-3 text-xs font-bold rounded-lg transition-all active:scale-95 ${currentPage === pageNumber
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-600 hover:bg-white'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ))}

                {/* ปุ่มถัดไป (>) */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    className="cursor-pointer h-8 w-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}