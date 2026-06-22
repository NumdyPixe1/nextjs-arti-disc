'use client';


interface KpiCardProps {
    title?: string;
    value?: string | number;
    icon?: string;
    colorClass: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

export const KpiCard = ({ title, value, icon, colorClass }: KpiCardProps) => {
    const colorMap = {
        blue: { bg: 'bg-blue-50 text-blue-600 border-blue-100' },
        green: { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        orange: { bg: 'bg-amber-50 text-amber-600 border-amber-100' },
        purple: { bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        red: { bg: 'bg-rose-50 text-rose-600 border-rose-100' },
    };

    const selectedColor = colorMap[colorClass] || colorMap.blue;

    return (
        /* 💡 เปลี่ยนเป็น flex-col (บนลงล่าง) และบังคับให้เป็นสี่เหลี่ยมจัตุรัสด้วย aspect-square
          - w-full max-w-[240px] ช่วยจำกัดขนาดให้เป็นบล็อกสี่เหลี่ยมที่สวยงาม ไม่ยืดยาวตามหน้าจอ
        */
        <div className="relative overflow-hidden flex flex-col justify-between aspect-square rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/10 transition-all hover:shadow-md w-full max-w-[220px]">

            {/* แถวบน: กล่องไอคอน */}
            {icon && (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border shrink-0 ${selectedColor.bg}`}>
                    <i className={icon}></i>
                </div>
            )}

            {/* แถวล่าง: กลุ่มข้อมูลข้อความ */}
            <div className="flex flex-col mt-4 min-w-0">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 truncate">
                    {title}
                </div>
                <div className="text-slate-900 text-3xl font-bold tracking-tight mb-1 font-sans">
                    {value}
                </div>

            </div>

        </div>
    );
}