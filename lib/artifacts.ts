import supabase from "@/lib/supabase-client";

export const getArtifact = async ({ id }: { id: number }) => {

    const { data, error } = await supabase
        .from('Artifacts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching artifact:", error.message);
    }
    return { data, error };
}