import { getArtifactById, editArtifact } from '@/app/actions/artifactAction';
import { ArtifactForm } from './Form';
import { convertToFormData } from '@/app/utils/convertToFormData';
import { ArtifactsForm } from '@/@types/artifact';

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ArtifactEditPage({ params }: PageProps) {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (Number.isNaN(id)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F0EEEB]">
                <p className="text-slate-600 font-medium">Invalid Artifact ID</p>
            </div>
        );
    }

    const mainResult = await getArtifactById(id);
    const artifact = mainResult?.data;

    if (!artifact) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F0EEEB]">
                <p className="text-slate-600 font-medium">Artifact not found</p>
            </div>
        );
    }

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
        image_file: null as any
    };

    // 🟢 สร้างฟังก์ชันรองรับการทำงานเมื่อฟอร์มกด Submit
    const handleFormSubmit = async (data: ArtifactsForm) => {
        "use server"; // ระบุเขตเป็น Server Action
        try {
            const formData = convertToFormData(data);
            await editArtifact(id, formData);
        } catch (error) {
            console.error("Failed to update artifact:", error);
        }
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

                {/* 🟢 ส่ง handleFormSubmit เข้าไปเคลียร์อาการฟ้องของ TypeScript */}
                <ArtifactForm
                    initialData={initialFormData}
                    onSubmit={handleFormSubmit}
                    isLoading={false}
                />
            </div>
        </div>
    );
}