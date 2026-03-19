// ดึงข้อมูลมาใส่ใน Card 
"use client"
import { Card } from "./Card";
import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";

interface Props {
    search_data?: any[];
}

export const Artifacts = ({ search_data }: Props) => {
    const [data, setData] = useState<any[]>([]);

    // ดึงข้อมูลทั้งหมดจากตาราง artifacts
    useEffect(() => {
        if (!search_data || search_data.length === 0) {
            const fetchData = async () => {
                const { data: artifacts } = await supabase.from('Artifacts').select('*');
                if (artifacts) {
                    setData(artifacts);
                }
            }
            fetchData();
        };
        // เมื่อ search_data เปลี่ยน ให้เช็คใหม่
    }, [search_data]);

    const displayData = (search_data && search_data.length > 0) ? search_data : data;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {displayData.length > 0 ? (displayData.map((item) => (
                <Card
                    key={item.id}
                    title={item.title ?? "ไม่ระบุ"}
                    image_url={item.image_url ?? "ไม่ระบุ"}
                    art={item.art_style ?? "ไม่ระบุ"}
                    location_found={item.location_found ?? "ไม่ระบุ"}
                    href={`/artifact/${item.id}`}
                />
            ))) : (<p className="text-white/20 mb-60  text-5xl font-bold">ไม่พบข้อมูล</p>)}
        </div>)
}


