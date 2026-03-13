"use client"
import { Card } from "./card";
import supabase from "@/libs/supabase-client";
import { useEffect, useState } from "react";

export const Artifacts = () => {
    const [data, setData] = useState<any[]>([]);
    // const [error, setError] = useState(false);

    // ดึงข้อมูลจากตาราง artifacts
    useEffect(() => {
        const fetchData = async () => {
            const { data: artifacts } = await supabase.from('Artifacts').select('*');
            if (artifacts) {
                setData(artifacts);
            }
            // else {
            //     setError(true);
            //     return <div className="p-10 text-red-500"></div>;
            // }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {data.length > 0 ? (data.map((item) => (
                <Card
                    key={item.id}
                    title={item.title ?? "ไม่ระบุ"}
                    image_url={item.image_url ?? "ไม่ระบุ"}
                    art={item.art_style ?? "ไม่ระบุ"}
                    location_found={item.location_found ?? "ไม่ระบุ"}
                />
            ))) : (<p className="text-white/20 mb-60  text-5xl font-bold">ไม่พบข้อมูล</p>)}
        </div>)
}


