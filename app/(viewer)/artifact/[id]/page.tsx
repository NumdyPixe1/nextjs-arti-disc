
import { getArtifact } from "@/lib/artifacts";
import Image from "next/image";

import NotFoundPage from "./not-found";
import { AiDescription } from "@/app/components/AiDescription";

export default async function ArtifactDetailsPage({ params }: { params: { id: number } }) {
    const { id } = await params;
    // ดึงข้อมูล
    const { data: item, error } = await getArtifact({ id: Number(id) });

    if (error || !item) {
        return <NotFoundPage />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* ส่วนบน: ข้อมูลหลัก */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    {/* Image */}
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                        <Image
                            className="object-contain p-4"
                            fill
                            sizes="(max-w-768px) 100vw, 800px"
                            src={item.image_url ?? "/img/no-photos.png"}
                            alt={item.title ?? "โบราณวัตถุ"}
                            priority
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{item.title}</h2>
                            <p className="text-white/50">{item.location_found}</p>
                        </div>

                        <div className="border-t border-white/10 pt-6 pb-6">
                            <h3 className="text-lg font-semibold text-white mb-3">ข้อมูลโบราณวัตถุ</h3>
                            <div className="space-y-2 text-white/70">
                                <div className="flex justify-between">
                                    <span>ประเภท:</span>
                                    <span className="font-medium text-white">{item.art_style ?? "ไม่ระบุ"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>สถานที่ค้นพบ:</span>
                                    <span className="font-medium text-white">{item.location_found ?? "ไม่ระบุ"}</span>
                                </div>
                            </div>
                        </div>
                        <AiDescription data={item} />
                    </div>
                </div>

                {/* ส่วนล่าง: Similar Items */}
                <div className="border-t border-white/10 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-8">🔎 โบราณวัตถุที่มีลักษณะใกล้เคียง</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <p className="text-white/50 col-span-full text-center py-8">
                            ระบบค้นหา Vector ยังอยู่ระหว่างการพัฒนา
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

