// แปลงรูปภาพ Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/image-embedding **
import { pipeline, RawImage } from "@xenova/transformers";
import supabase from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // 1. ดึงข้อมูลที่ยังไม่มี image_embedding
        const { data: artifacts, error: dbError } = await supabase
            .from('Artifacts')
            .select('id, image_file')
            .is('image_embedding', null);

        if (dbError) throw dbError;
        if (!artifacts || artifacts.length === 0) {
            return NextResponse.json({ message: "No artifacts found without image embeddings." });
        }

        // 2. โหลด Model ครั้งเดียว (ใช้นอก Loop)
        const visionModel = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
        console.log(`🚀 Starting Image Embeddings for ${artifacts.length} items...`);

        const results = { success: 0, failed: 0, errors: [] as string[] };

        for (const item of artifacts) {
            try {
                if (!item.image_file) {
                    console.warn(`⚠️ ID ${item.id}: No image_file path`);
                    continue;
                }

                // 3. จัดการ URL ให้ปลอดภัย
                const bucketUrl = "https://zfcjarjlreqtvbtwzzyp.supabase.co/storage/v1/object/public/artifact-images/";


                let imageUrl = item.image_file.startsWith('http')  // ตัดช่องว่าง และ Encode เฉพาะส่วนชื่อไฟล์ถ้าจำเป็น หรือ Encode ทั้งหมดอย่างระมัดระวัง
                    ? item.image_file
                    : `${bucketUrl}${item.image_file.trim()}`;

                const cleanUrl = encodeURI(imageUrl);
                console.log("cleanUrl", cleanUrl);

                // 4. Fetch รูปภาพ
                const response = await fetch(cleanUrl, { method: 'GET', cache: 'no-store' });

                if (!response.ok) {
                    throw new Error(`Fetch failed (${response.status})`);
                }

                const imageBlob = await response.blob();
                const image = await RawImage.fromBlob(imageBlob);
                // 5. ประมวลผล Vector
                const output = await visionModel(image as any);
                const vector = Array.from(output.data);

                // 6. อัปเดตกลับไปที่ Supabase
                const { error: updateError } = await supabase
                    .from('Artifacts')
                    .update({
                        image_embedding: `[${vector.join(',')}]` as any
                    })
                    .eq('id', item.id);

                if (updateError) throw updateError;
                console.log(`✅ ID ${item.id}: Embedded successfully.  
                    File:${item.image_file}`);
                results.success++;

            } catch (error: any) {
                console.error(`❌ ID ${item.id} // ถ้าตัวนึงพัง ให้บันทึกความผิดพลาดแล้วไปทำตัวถัดไป
                    File:${item.image_file}
                    Failed:`, error.message);
                results.failed++;
                results.errors.push(`ID ${item.id}: ${error.message}`);
            }
        }

        return NextResponse.json({
            message: "Processing completed",
            summary: results
        });

    } catch (error: any) {
        console.error("Critical API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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