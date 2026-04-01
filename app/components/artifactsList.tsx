

// แสดงข้อมูลรายการจาก *ค้นหา* และ *ข้อมูลทั้งหมด*
"use client"
import { Card } from "./card";
import { useEffect, useCallback, useRef, useState } from "react";
import { artifactAction } from "../actions/artifactAction";
import { Loading } from "./loading";
interface Props {
    // รับคำค้นหา จาก Home page
    query?: any[];
}

export const ArtifactsList = ({ query }: Props) => {
    const [getArtifacts, setGetArtifacts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef(false);

    const loadMoreArtifacts = useCallback(async () => {
        if (isFetchingRef.current || !hasMore || (query && query.length > 0)) return;

        isFetchingRef.current = true; // ล็อคทันที
        setLoading(true);

        try {
            const limit = 10;
            // ใช้ page-1 ถ้า Backend ของคุณนับ offset เริ่มจาก 0
            // แต่ถ้าดูจาก Log ของคุณ offset=2, 3... แสดงว่า page ของคุณคือ offset โดยตรง
            const newData = await artifactAction.getAllArtifacts(page, limit);

            if (!newData || newData.length === 0) {
                setHasMore(false);
                return;
            }

            setGetArtifacts((prev) => {
                const existingIds = new Set(prev.map(item => item.id));
                const unique = newData.filter((item: any) => !existingIds.has(item.id));
                return [...prev, ...unique];
            });

            if (newData.length < limit) {
                setHasMore(false);
            } else {
                // ✅ เลื่อนหน้าเฉพาะเมื่อมั่นใจว่าข้อมูลมาครบ limit เท่านั้น
                setPage(prev => prev + 1);
            }
        } catch (err) {
            setHasMore(false); // ถ้า Error ให้หยุดโหลดก่อนกัน Loop
        } finally {
            setLoading(false);
            // 🔓 ปลดล็อคช้าลงนิดนึงเพื่อให้ State อัปเดตทัน
            setTimeout(() => { isFetchingRef.current = false; }, 100);
        }
    }, [page, hasMore, query]);

    // ค่าเริ่มต้น/อัปเดตเมื่อมีการค้นหา
    useEffect(() => {
        if (query && query.length > 0) {
            setGetArtifacts(query);
            setHasMore(false);
            setPage(1);
        } else {
            setGetArtifacts([]);
            setPage(1);
            setHasMore(true);
        }
    }, [query]);

    useEffect(() => {
        if (query && query.length > 0) return;
        loadMoreArtifacts();
    }, [loadMoreArtifacts, query]);

    useEffect(() => {
        if (query && query.length > 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && !loading && hasMore) {
                    loadMoreArtifacts();
                }
            },
            { rootMargin: "200px", threshold: 0.1 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            observer.disconnect();
        };
    }, [loadMoreArtifacts, loading, hasMore, query]);

    const displayData = query && query.length > 0 ? query : getArtifacts;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {displayData.map((item) => (
                    <Card key={item.id} data={item ?? "ไม่ระบุ"} href={`/artifacts/${item.id}`} />
                ))}
            </div>

            {error && (
                <div className="py-4 text-red-600 font-medium">{error}</div>
            )}

            {!(query && query.length > 0) && (
                <div ref={loaderRef} className="py-20 text-center">
                    {loading ? (
                        <Loading />
                    ) : hasMore ? (
                        <p className="text-slate-500">เลื่อนลงเพื่อโหลดข้อมูลเพิ่มเติม...</p>
                    ) : getArtifacts.length > 0 ? (
                        <p className="text-slate-400 font-bold">สิ้นสุดการแสดงข้อมูล</p>
                    ) : (
                        <p className="text-slate-500">ไม่พบข้อมูล</p>
                    )}
                </div>
            )}
        </div>
    );
}


