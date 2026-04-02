import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

// กำหนด Type ของ context ให้ถูกต้องตามมาตรฐาน Next.js 15
type RouteContext = {
    params: Promise<{ id: string }>;
};

// http://localhost:3000/api/artifacts/{id}
export const GET = async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    try {
        const { data, error } = await supabase
            .from('Artifacts')
            .select('*')
            .eq('id', parseInt(id))
            .single(); // .single() เพื่อให้ได้ข้อมูลแค่แถวเดียว
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data, error });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const PUT = async (req: Request, { params }: RouteContext) => {
    const { id } = await params;
    try {
        const formData = await req.formData();

        // 1. ดึงข้อมูลพื้นฐาน
        const updateData: any = {
            title: formData.get("title"),
            art_style: formData.get("art_style"),
            material: formData.get("material"),
            location_found: formData.get("location_found"),
            current_location: formData.get("current_location"),
            description: formData.get("description"),
            era: formData.get("era"),
            category: formData.get("category"),
        };
        // 2. จัดการรูปภาพ (ถ้ามีการส่งไฟล์ใหม่มา)
        const imageFile = formData.get("image_file") as File;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            // อัปโหลดขึ้น Storage 'artifact-images'
            const { error: uploadError } = await supabase.storage
                .from('artifact-images')
                .upload(fileName, imageFile);

            if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

            // ดึง URL ใหม่มาใช้
            const { data: { publicUrl } } = supabase.storage
                .from('artifact-images')
                .getPublicUrl(fileName);

            updateData.image_file = publicUrl; // เก็บ URL ใหม่ลงใน Object ที่จะอัปเดต
        }

        const { data, error } = await supabase
            .from('Artifacts')
            .update(updateData) // ส่งก้อน JSON ที่ต้องการแก้เข้าไปเลย
            .eq('id', parseInt(id))
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


export const DELETE = async (req: Request, { params }: RouteContext) => {
    try {
        const { id } = await params;
        // สั่งลบใน Supabase โดยระบุเงื่อนไข .eq('id', id)
        const { error } = await supabase
            .from('Artifacts')
            .delete()
            .eq('id', parseInt(id));
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: `Delete artifact ID ${id} successfully` }, { status: 200 });

    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}