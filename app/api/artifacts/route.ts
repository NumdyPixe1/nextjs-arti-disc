import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

// http://localhost:3000/api/artifacts
export const GET = async (req: Request) => {
    try {
        const { data, error } = await supabase.from('Artifacts').select('*').order("created_at", { ascending: false });
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export const POST = async (req: Request) => {
    try {
        // 1. รับข้อมูล JSON จาก Body ของ Postman
        const body = await req.json();
        const { title, art_style, material, location_found, location, description, image_url } = body; 0
        // 2. ตรวจสอบข้อมูลเบื้องต้น
        if (!title || title.trim() === "") {
            return NextResponse.json(
                { error: "กรุณาระบุชื่อวัตถุ" },
                { status: 400 }
            );
        }
        // 3. บันทึกลง Supabase
        const { data, error } = await supabase
            .from('Artifacts')
            .insert({ title, art_style, material, location_found, location, description, image_url })
            .select();
        // Check Error จาก Supabase
        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Add artifact successfully", data }, { status: 201 });

    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}