export type Artifact = {
    id: number,
    title: string,
    image_file: string | null;
    description?: string;
    art_style?: string;
    location_found?: string;
    location?: string;
    embedding?: number[] | null;
    image_embedding?: number[] | null
    similarity?: number;
}