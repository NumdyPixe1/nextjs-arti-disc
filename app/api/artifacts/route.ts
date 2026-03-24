import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

// http://localhost:3000/api/artifacts
export const GET = async (req: Request) => {
    try {
        const { data, error } = await supabase
            .from('Artifacts')
            .select('*')
            .order("created_at", { ascending: false });
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// Add
export const POST = async (req: Request) => {
    try {
        // 1. JSON ไม่รองรับไฟล์ดิบ (Binary) ต้องใช้ .formData แทน .json
        const formData = await req.formData();
        const imageFile = formData.get("image_file") as File;
        let finalImageUrl = "";

        // ดึงข้อมูลข้อความ
        const title = formData.get("title") as string;
        const art_style = formData.get("art_style") as string;
        const material = formData.get("material") as string;
        const location_found = formData.get("location_found") as string;
        const location = formData.get("location") as string;
        const description = formData.get("description") as string;
        // 2. ตรวจสอบชื่อว่าเป็นค่าว่างไหม
        if (!title || title.trim() === "") {
            return NextResponse.json(
                { error: "Please enter the name of New artifact" },
                { status: 400 }
            );
        }
        // 3. จัดการอัปโหลดรูปไปที่ Supabase Storage
        if (imageFile) {
            // 1. แยกนามสกุลไฟล์ (ระวังจุดใน split)
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            // 2. อัปโหลด
            const { data, error } = await supabase.storage
                .from('artifact-images') // ตัวพิมพ์เล็กทั้งหมดตามรูป
                .upload(fileName, imageFile, {
                    contentType: imageFile.type,
                    upsert: false
                });

            if (error) {
                // ให้ดู Error นี้ใน Terminal ของ VS Code นะครับ
                console.error("Supabase Upload Error:", error.message);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            // 3. ดึง URL (ชื่อ bucket ต้องตรงกัน)
            const { data: { publicUrl } } = supabase.storage
                .from('artifact-images')
                .getPublicUrl(fileName);

            finalImageUrl = publicUrl;
        }

        // 4. บันทึกลงข้อมูลลงใน Supabase
        const { data, error } = await supabase
            .from('Artifacts')
            .insert({
                title, art_style, material, location_found,
                location, description, image_file: finalImageUrl
            })
            .select();
        // Check Error จาก Supabase
        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Add artifact successfully", data }, { status: 201 });
    }
    catch (error: any) {
        console.error("Supabase Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}