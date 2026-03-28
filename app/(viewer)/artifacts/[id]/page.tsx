
// Main Page
import Image from "next/image";
import { artifactAction } from '@/app/actions/artifactAction';
import NotFoundPage from "./not-found";
import { AiDescription } from "@/app/components/AiDescription";

export default async function ArtifactDetailsPage({ params }: { params: { id: number } }) {
    const { id } = await params;
    // ดึงข้อมูล
    const { data, error } = await artifactAction.getArtifactById(id);
    console.log(data);
    if (error || !data) {
        return <NotFoundPage />;
    }

    return (
        <div className="font-ibm-thai min-h-screen bg-[#F0EEEB] text-[#13181B]">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* ส่วนบน: ข้อมูลหลัก */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    {/* Image */}
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-[#CCD5DA] border border-white/10">
                        <Image
                            className="object-contain p-4"
                            fill
                            sizes="(max-w-768px) 100vw, 800px"
                            src={data.image_file ?? "/img/no-photos.png"}
                            alt={data.title ?? "โบราณวัตถุ"}
                            priority
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">{data.title}</h2>
                        </div>

                        <div className="border-t border-[#CCD5DA] pt-6 pb-6">
                            <h3 className="text-lg font-semibold mb-3">ข้อมูลโบราณวัตถุ</h3>
                            <div className="space-y-2 text-[#13181B]">

                                {/*  */}
                                <div className="flex justify-between">
                                    <span>สมัย:</span>
                                    <span className="font-medium text-[#13181B]">{data.art_style ?? "ไม่ระบุ"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>สถานที่ค้นพบ:</span>
                                    <span className="font-medium text-[#13181B] text-right break-words max-w-[60%]">
                                        {data.location_found ?? "ไม่ระบุ"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>จัดแสดงที่:</span>
                                    <span className="font-medium text-[#13181B] text-right break-words max-w-[60%]">
                                        {data.location ?? "ไม่ระบุ"}</span>
                                </div>


                            </div>
                        </div>
                        <AiDescription data={data} />
                    </div>
                </div>

                {/* ส่วนล่าง: Similar Items */}
                <div className="border-t border-[#CCD5DA] pt-12">
                    <h2 className="text-2xl font-bold text-[#13181B] mb-8">🔎 โบราณวัตถุที่มีลักษณะใกล้เคียง</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <p className="text-[#13181B] col-span-full text-center py-8">
                            ระบบค้นหา Vector ยังอยู่ระหว่างการพัฒนา
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

