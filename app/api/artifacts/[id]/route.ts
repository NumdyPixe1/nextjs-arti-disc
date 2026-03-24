import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

// http://localhost:3000/api/artifacts/{id}
export const GET = async (req: Request, { params }: { params: { id: number } }) => {
    const { id } = await params;
    try {
        const { data, error } = await supabase
            .from('Artifacts')
            .select('*')
            .eq('id', id)
            .single(); // .single() เพื่อให้ได้ข้อมูลแค่แถวเดียว
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
    const { id } = await params;
    try {
        const body = await req.json();
        const { data, error } = await supabase
            .from('Artifacts')
            .update(body) // ส่งก้อน JSON ที่ต้องการแก้เข้าไปเลย
            .eq('id', id)
            .select(); // .select() เพื่อให้ได้ข้อมูลแถวที่อัปเดตกลับมา
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Update artifact successfully", data }, { status: 200 });
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: number } }) => {
    try {
        const { id } = await params;
        // สั่งลบใน Supabase โดยระบุเงื่อนไข .eq('id', id)
        const { error } = await supabase
            .from('Artifacts')
            .delete()
            .eq('id', id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: `Delete artifact ID ${id} successfully` }, { status: 200 });

    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}