// แปลงรูปภาพ Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/image_embedding **

import { pipeline, RawImage } from "@xenova/transformers";
import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {

        const { data: artifacts } = await supabase
            .from('Artifacts')
            .select('id, image_file')
            .is('image_embedding', null);
        if (!artifacts || artifacts.length === 0) {
            return NextResponse.json({ message: "No artifacts found without image embeddings." }
                // ไม่มีข้อมูลที่ต้องทำ Embedding
            );
        }

        const visionModel = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');

        for (const item of artifacts) {
            // A. โหลดรูปจาก URL (image_file ต้องเป็น public URL)
            if (!item.image_file) {
                console.warn(`ID ${item.id} has no image URL, skipping...`);
                continue; // ข้ามถ้าไม่มีรูปภาพ
            }
            const image = await RawImage.fromURL(item.image_file);

            // B. แปลงเป็น Vector 512
            const output = await visionModel(image);
            const vector = Array.from(output.data);

            // C. บันทึกลงคอลัมน์ image_embedding
            await supabase
                .from('Artifacts')
                .update({ image_embedding: `[${vector.join(',')}]` as any })
                .eq('id', item.id);
        }
        return NextResponse.json({ message: "Update success!" });
    }
    catch (error: any) {
        console.error("Image Search Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}



// const formData = await req.formData();
// const imageFile = formData.get("image_file") as Blob;
// console.log("Received file:", imageFile);
// if (!imageFile) {
//     throw new Error("No image file provided");
// }

// const image = await RawImage.fromBlob(imageFile);
// // ส่งภาพเข้า Model เพื่อแปลงเป็น Vector
// const output = await visionModel(image as any);
// // เรียก Model
// const imageVector = Array.from(output.data);