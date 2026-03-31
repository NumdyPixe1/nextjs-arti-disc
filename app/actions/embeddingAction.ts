export const embeddingAction = {
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
        catch (error: any) {
            console.error('Action: Failed to embedding:', error);
        }
    },

    imageEmbeddingAction: async () => {
        try {
            const response = await fetch('/api/image_embedding', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`Action: Failed to fetch image embedding: ${response.status} `);
            }
            const result = await response.json();
            return result;
        }
        catch (error: any) {
            console.error('Action: Failed to image embedding:', error);
        }
    }
}