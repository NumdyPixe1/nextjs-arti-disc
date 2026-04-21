export type Artifact = {
    id: number,
    title: string,
    image_file: string | null;
    description?: string;
    art_style?: string;
    location_found?: string;
    current_location?: string;
    embedding?: number[] | null;
    image_embedding?: number[] | null
    similarity?: number;
    category?: string;
    era?: string;
    lat?: number;
    lng?: number;
}

export type ArtifactsForm = {
    title: string;
    art_style: string;
    current_location: string;
    location_found: string;
    description: string;
    image_file: File | null;
    material: string;
    era: string;
    category: string;
    lat: number;
    lng: number;
}