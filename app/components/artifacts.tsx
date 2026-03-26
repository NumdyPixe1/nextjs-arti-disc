// แสดงข้อมูลรายการจาก *ค้นหา* และ *ข้อมูลทั้งหมด* 
"use client"
import { Card } from "./Card";
import { useEffect, useRef, useState } from "react";
import { artifactAction } from "../actions/artifactAction";
import { Loading } from "./Loading";
interface Props {
    // รับคำค้นหา จาก Home page
    query?: any[];
}

export const Artifacts = ({ query }: Props) => {
    const [getArtifacts, setGetArtifacts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    // สร้างตัวอ้างอิงสำหรับจุดล่างสุดของรายการ
    const loaderRef = useRef(null);

    const loadMoreArtifacts = async () => {
        // ถ้ากำลังโหลด หรือ ข้อมูลหมดแล้ว ให้หยุดทำงานทันที
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            console.log("Loading");
            const limit = 10;
            const newData = await artifactAction.getAllArtifacts(page, limit);
            console.log('From Artifacts.tsx:', newData);
            // ดึงข้อมูลหมดแล้ว หรือ ไม่มีข้อมูล
            if (newData.length < limit || !newData) {
                setHasMore(false);
            }
            if (newData.length > 0 || newData) {
                // ต่อข้อมูลใหม่เข้าไป
                setGetArtifacts(prev => {
                    // ป้องกันการโหลดซ้ำ ด้วยการ Filter ID
                    const existingIds = new Set(prev.map(item => item.id));
                    const uniqueNewData = newData.filter((item: any) => !existingIds.has(item.id));
                    return [...prev, ...uniqueNewData];
                })
            }
            setPage(prev => prev + 1);

        } catch (error) {
            console.error('Failed to load:', error);
        } finally {
            setLoading(false);
        }
    };
    // ตั้งค่า Observer เพื่อตรวจจับการ Scroll ถึงท้ายหน้า
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && hasMore && !query) {
                loadMoreArtifacts();
            }
            // ต้องโผล่มาเต็ม 100% ถึงจะทำงาน
        }, { threshold: 1.0 });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [loading, hasMore, query, page])

    // ถ้ามี query และมีข้อมูล ให้แสดงข้อมูลจาก query (:)ถ้าไม่มี null ให้แสดงข้อมูลทั้งหมด
    const displayData = (query && query.length > 0) ? query : getArtifacts;
    displayData.map((item) => (console.log(`From displayData ID: ${item.id} Img: ${item.image_file}`))); return (
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* ดึงข้อมูลใส่ใน Card */}
                {displayData.map((item) => (
                    <Card
                        key={item.id}
                        title={item.title ?? "ไม่ระบุ"}
                        image_file={item.image_file || item.image_url || "ไม่ระบุ"}
                        art={item.art_style ?? "ไม่ระบุ"}
                        location_found={item.location_found ?? "ไม่ระบุ"}
                        href={`/artifacts/${item.id}`}
                    />
                ))}
            </div>
            {/* --- ส่วนจุดตรวจจับ Infinite Scroll (Sentinel) --- */}
            {!query && (
                <div ref={loaderRef} className="py-20 text-center">
                    {loading ? (
                        <Loading />
                    )
                        : !hasMore && getArtifacts.length > 0 ? (<p className="text-slate-400 font-bold">สิ้นสุดการแสดงข้อมูล</p>
                        ) : null}
                </div>
            )}

        </div>
    )
}


