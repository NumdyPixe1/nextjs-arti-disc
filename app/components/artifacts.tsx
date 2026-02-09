
import { Card } from "./card";
import supabase from "@/libs/supabase-client";


export const Artifacts = async () => {

    // ดึงข้อมูลจากตาราง artifacts
    const { data, error } = await supabase
        .from('Artifacts')
        .select('*');
    console.log("Data:", data);
    console.log("Error:", error);    // 2. จัดการ Error (ถ้าดึงข้อมูลไม่ได้)
    if (error) {
        return <div className="p-10 text-red-500">เกิดข้อผิดพลาด: {error.message}</div>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {data.length > 0 ? (data.map((item) => (
                <Card
                    key={item.id}
                    name={item.name ?? "ไม่ระบุ"}
                    image_url={item.image_url ?? "ไม่ระบุ"}
                    era={item.era ?? "ไม่ระบุ"}
                    location_found={item.location_found ?? "ไม่ระบุ"}
                />
            ))) : (<p className="text-white/20 mb-60  text-5xl font-bold">ไม่พบข้อมูล</p>)}
        </div>)
}


