import { getArtifactById } from '@/app/actions/artifactAction';
import EditArtifactFormPage from './Form';
interface PageProps {
    params: Promise<{ id: string }>
}

// 🟢 ตัด Parameter ตัวที่สองออกไปเลย เพราะ Next.js Page รับได้แค่ params เท่านั้น
export default async function ArtifactEditPage({ params }: PageProps) {
    // 1. await params แกะเอา id ออกมา
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (Number.isNaN(id)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F0EEEB]">
                <p className="text-slate-600 font-medium">Invalid Artifact ID</p>
            </div>
        );
    }

    // ดึงข้อมูลโบราณวัตถุผ่าน Server Action
    const mainResult = await getArtifactById(id);
    const artifact = mainResult?.data;

    if (!artifact) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F0EEEB]">
                <p className="text-slate-600 font-medium">Artifact not found</p>
            </div>
        );
    }

    // 2. จัดแจงข้อมูลตั้งต้นที่จะเอาไปแสดงในฟอร์มกรอกข้อมูล
    const initialFormData = {
        title: artifact.title || '',
        art_style: artifact.art_style || '',
        current_location: artifact.current_location || '',
        location_found: artifact.location_found || '',
        description: artifact.description || '',
        material: artifact.material || '',
        era: artifact.era || '',
        category: artifact.category || '',
        lng: artifact.lng || 0,
        lat: artifact.lat || 0,
        image_file: null
    };

    return (
        <div className="min-h-screen bg-[#F0EEEB] text-[#13181B]">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/20">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Artifact editor</p>
                        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Edit artifact details</h1>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-mono font-semibold text-slate-600">
                        ID: #{artifact.id}
                    </div>
                </div>

                {/* 🟢 เรียกใช้คอมโพเนนต์หน้าฟอร์ม (Form.tsx) แล้วส่งค่าที่เราคิวรีได้จากในนี้ลงไปโดยตรง */}
                <EditArtifactFormPage
                    artifact={artifact}
                    initialData={initialFormData}
                />
            </div>
        </div>
    );
}