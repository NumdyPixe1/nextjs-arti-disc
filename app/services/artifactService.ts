export const artifactService = {

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

    getAllArtifacts: async () => {
        try {
            const response = await fetch('/api/artifacts');
            if (!response.ok) {
                throw new Error(`Failed to fetch artifacts: ${response.status} `);
            }
            return response.json();
        } catch (error) {
            console.error('Failed to fetch artifacts:', error);
        }
    },

    getArtifactById: async (id: number) => {
        try {
            const response = await fetch(`/api/artifacts/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch artifacts: ${response.status} `);
            }
            return response.json();
        } catch (error) {
            console.error('Failed to fetch artifact:', error);
        }
    },

    editArtifact: async (id: number, data: any) => {
        try {
            const response = await fetch(`/api/artifacts/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
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
    }

}