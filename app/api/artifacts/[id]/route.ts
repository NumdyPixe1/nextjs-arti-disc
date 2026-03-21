import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

// http://localhost:3000/api/artifacts/{id}
export const GET = async (req: Request, { params }: { params: { id: number } }) => {
    const { id } = await params;

    try {
        const { data, error } = await supabase.from('Artifacts').select('*').eq('id', id).single();
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}