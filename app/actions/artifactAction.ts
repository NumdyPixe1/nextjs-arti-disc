import { Artifact } from "@/@types/artifact";
import supabase from "@/lib/supabase-client";

export const artifactAction = {
    addArtifact: async (formData: FormData) => {
        try {
            const response = await fetch('/api/artifacts',
                {
                    method: 'POST',
                    body: formData
                });
            if (!response.ok) {
                throw new Error(`Failed to create artifact: ${response.status}`);
            }
            const results = await response.json();
            return results;
        }
        catch (error) {
            console.error('Failed to create artifact:', error);
        }
    },

    getAllArtifacts: async (page: number, limit: number) => {
        try {//                           
            const response = await fetch(`/api/artifacts?offset=${page}&limit=${limit}`);

            if (!response.ok) {
                console.error('Failed to fetch artifacts');
                throw new Error(`Failed to fetch artifacts: ${response.status} `);
            }
            const results = await response.json();
            return results;
        } catch (error) {
            console.error('Failed to fetch artifacts:', error);
        }
    },

    getArtifactById: async (id: number): Promise<{ data: Artifact | null, error: any }> => {
        try {
            const { data, error } = await supabase
                .from('Artifacts')
                .select('*')
                .eq('id', id)
                .single();
            return { data: data as Artifact, error };
        } catch (error: any) {
            console.error('Failed to fetch artifact:', error);
            return { data: null, error: error.message }
        }
    },

    // หาชิ้นที่เกี่ยวข้องกันโดยใช้ RPC ที่เราสร้างไว้ใน Supabase
    getRelatedArtifacts: async (id: number, limit: number = 4): Promise<{ data: Artifact[] | null, error: any }> => {
        try {
            const { data: currentData, error: currentError } = await supabase
                .from('Artifacts')
                .select('embedding')
                .eq('id', id)
                .single();
            if (currentError || !currentData?.embedding) {
                console.error("This data has not yet been embedded");
                return { data: [], error: currentError };
            }
            // 2. เรียกใช้ RPC เพื่อหาชิ้นที่ใกล้เคียง
            const { data: related, error: rpcError } = await supabase.rpc('match_artifacts', {
                query_embedding: currentData.embedding,
                match_threshold: 0.1, // ค่าความคล้าย (0-1) ยิ่งน้อยยิ่งเจอเยอะ
                match_count: limit,
                current_id: id,
            });
            return { data: related as Artifact[], error: rpcError };
        } catch (error: any) {
            console.error("RPC Error:", error);
            return { data: [], error };
        }
    },

    editArtifact: async (id: number, formData: FormData) => {
        try {
            const response = await fetch(`/api/artifacts/${id}`,
                {
                    method: 'PUT',
                    body: formData
                }
            );
            if (!response.ok) {
                throw new Error(`Failed to update artifact: ${response.status}`);
            }
            return response.json();
        }
        catch (error: any) {
            console.error('Failed to update artifact:', error);
        }
    },

    deleteArtifact: async (id: number) => {
        try {
            const response = await fetch(`/api/artifacts/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Failed to delete artifact: ${response.status}`);
            }
            return response.json();
        } catch (error: any) {
            console.error('Failed to delete artifact:', error);
        }
    }









}