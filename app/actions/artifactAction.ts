import { Artifact } from "@/@types/artifact";
import { createClient } from "@/lib/supabase/supabaseClient";

// แยกการสถาปนาเปิดตัว Supabase Client ไว้ใช้กับฟังก์ชันภายในไฟล์
const getSupabase = async () => await createClient();

// 1. เพิ่มโบราณวัตถุ
export async function addArtifact(formData: FormData) {
    try {
        const response = await fetch('/api/artifacts', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Failed to create artifact: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to create artifact:', error);
        return null;
    }
}

// 2. ดึงข้อมูลโบราณวัตถุแบบแบ่งหน้า (Pagination)
export async function getAllArtifacts(page: number, limit: number) {
    try {
        const response = await fetch(`/api/artifacts?offset=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch artifacts: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch artifacts:', error);
        return []; // 🟢 คืนค่าอาเรย์ว่างเพื่อป้องกันหน้าบ้านแครช .length
    }
}

// 3. ดึงข้อมูลโบราณวัตถุทีละชิ้นด้วย ID
export async function getArtifactById(id: number): Promise<{ data: Artifact | null, error: any }> {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('Artifacts')
            .select('*')
            .eq('id', id)
            .single();
        return { data: data as Artifact, error };
    } catch (error: any) {
        console.error('Failed to fetch artifact:', error);
        return { data: null, error: error.message };
    }
}

export async function getAllArtifactsStaff() {
    try {
        const supabase = await createClient(); // มั่นใจว่าเป็น Server Client นะครับ
        const { data, error } = await supabase
            .from('Artifacts')
            .select('id, title, era, material, location_found, current_location, updated_at');

        if (error) {
            throw new Error(error.message);
        }

        return data || []; // คืนค่าข้อมูลจาก DB กลับไปตรงๆ
    } catch (error) {
        console.error('Failed to fetch artifacts for staff:', error);
        return [];
    }
}

// 5. ค้นหาชิ้นที่เกี่ยวข้องกันโดยใช้ RPC (Vector Similarity)
export async function getRelatedArtifacts(id: number, limit: number = 4): Promise<{ data: Artifact[] | null, error: any }> {
    try {
        const supabase = await getSupabase();
        const { data: currentData, error: currentError } = await supabase
            .from('Artifacts')
            .select('embedding')
            .eq('id', id)
            .single();

        if (currentError || !currentData?.embedding) {
            console.error("This data has not yet been embedded");
            return { data: [], error: currentError };
        }

        const { data: related, error: rpcError } = await supabase.rpc('match_artifacts', {
            query_embedding: currentData.embedding,
            match_threshold: 0.1,
            match_count: limit,
            current_id: id,
        });

        return { data: related as Artifact[], error: rpcError };
    } catch (error: any) {
        console.error("RPC Error:", error);
        return { data: [], error };
    }
}

// 6. แก้ไขข้อมูลโบราณวัตถุ
export async function editArtifact(id: number, formData: FormData) {
    try {
        const response = await fetch(`/api/artifacts/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to update artifact: ${response.status}`);
        }
        return await response.json();
    } catch (error: any) {
        console.error('Failed to update artifact:', error);
        return null;
    }
}

// 7. ลบข้อมูลโบราณวัตถุ
export async function deleteArtifact(id: number) {
    try {
        const response = await fetch(`/api/artifacts/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete artifact: ${response.status}`);
        }
        return await response.json();
    } catch (error: any) {
        console.error('Failed to delete artifact:', error);
        return null;
    }
}