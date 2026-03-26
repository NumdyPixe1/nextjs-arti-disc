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
            return response.json();
        }
        catch (error) {
            console.error('Failed to create artifact:', error);
        }
    },

    getAllArtifacts: async (page: number, limit: number = 10) => {
        const offset = page * limit
        try {//                           
            const response = await fetch(`/api/artifacts?offset=${offset}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch artifacts: ${response.status} `);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch artifacts:', error);
        }
    },

    getArtifactById: async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('Artifacts')
                .select('*')
                .eq('id', id)
                .single();
            return { data, error };
        } catch (error: any) {
            console.error('Failed to fetch artifact:', error);
            return { data: null, error: error.message }
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
        catch (error) {
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
        } catch (error) {
            console.error('Failed to delete artifact:', error);
        }
    },

    embeddingAction: async () => {
        try {
            const response = await fetch('/api/embedding', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`Action: Failed to fetch embedding: ${response.status} `);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Action: Failed to embedding:', error);
        }
    }







}