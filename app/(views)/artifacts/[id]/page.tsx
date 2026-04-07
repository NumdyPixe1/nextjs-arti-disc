
// Main Page
import Image from "next/image";
import { artifactAction } from '@/app/actions/artifactAction';
import NotFoundPage from "../../not-found";
import { AiDescription } from "@/app/components/AiDescription";
import { Card } from "@/app/components/Card";
import Link from "next/link";
import MapWrapper from "@/app/components/map/Map";

export default async function ArtifactDetailsPage({ params }: { params: { id: number } }) {
    const { id } = await params;
    // ดึงข้อมูลขนานกันทั้งข้อมูลหลักและข้อมูลที่เกี่ยวข้อง
    const [mainResult, relatedResult] = await Promise.all([
        artifactAction.getArtifactById(id),
        artifactAction.getRelatedArtifacts(id, 4)
    ]);

    const mainData = mainResult.data;
    const relatedData = relatedResult.data;


    if (!mainData) {
        return <NotFoundPage />;
    }

    return (
        <div className="min-h-screen bg-[#F0EEEB] text-[#13181B]">
            <div className="p-4 flex items-center justify-start">
                <Link href="/#artifacts" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    ย้อนกลับ
                </Link>
            </div>
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* ส่วนบน: ข้อมูลหลัก */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    {/* Left: Image + map */}
                    <div className="space-y-6">
                        <div className="relative h-96 md:h-125 rounded-2xl overflow-hidden bg-[#CCD5DA] border border-white/10">
                            <Image
                                className="object-contain p-4"
                                fill
                                sizes="(max-w-768px) 100vw, 800px"
                                src={mainData.image_file ?? "/img/no-photos.png"}
                                alt={mainData.title ?? "โบราณวัตถุ"}
                                priority
                            />
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                            <h3 className="text-base font-semibold mb-2">แผนที่ตำแหน่ง</h3>
                            <div className="h-64 rounded-xl overflow-hidden">
                                <MapWrapper lat={mainData.lat ?? 0} lng={mainData.lng ?? 0} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">{mainData.title}</h2>
                        </div>

                        <div className="border-t border-[#CCD5DA] pt-6 pb-6">
                            <h3 className="text-lg font-semibold mb-3">ข้อมูลโบราณวัตถุ</h3>
                            <div className="space-y-2 text-[#13181B]">

                                <div className="flex justify-between">
                                    <span>สมัย:</span>
                                    <span className="font-medium text-[#13181B]">{mainData.era ?? "ไม่ระบุ"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>สถานที่ค้นพบ:</span>
                                    <span className="font-medium text-[#13181B] text-right wrap-break-word max-w-[60%]">
                                        {mainData.location_found ?? "ไม่ระบุ"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>จัดแสดงที่:</span>
                                    <span className="font-medium text-[#13181B] text-right wrap-break-word max-w-[60%]">
                                        {mainData.current_location ?? "ไม่ระบุ"}</span>
                                </div>

                            </div>
                        </div>
                        <AiDescription data={mainData} />
                    </div>

                </div>
                {/* ส่วนล่าง: Similar Items */}
                <div className="border-t border-[#CCD5DA] pt-12">
                    <h2 className="text-2xl font-bold text-[#13181B] mb-8">🔎 โบราณวัตถุที่มีลักษณะใกล้เคียง</h2>
                    <div className="snap-x-mandatory flex gap-6 overflow-x-auto py-4">
                        {
                            relatedData ? relatedData.map((item) => (
                                <Card key={item.id} data={item} href={`/artifacts/${item.id}`} />
                            )) : <p>Error</p>}
                    </div>
                </div>
            </div >
        </div>
    )
}

