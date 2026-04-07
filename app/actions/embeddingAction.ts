export const embeddingAction = {
    textEmbeddingAction: async () => {
        try {
            const response = await fetch('/api/embedding', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`Error Action: Failed to fetch embedding: ${response.status}`);
            }
            const results = await response.json();
            return results;
        }
        catch (error: any) {
            console.error('Error Action: Failed to embedding:', error);
        }
    },

    imageEmbeddingAction: async () => {
        try {
            const response = await fetch('/api/image-embedding', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`Error Action: Failed to fetch image embedding: ${response.status} `);
            }
            const results = await response.json();
            return results;
        }
        catch (error: any) {
            console.error('Error Action: Failed to image embedding:', error);
        }
    }
}