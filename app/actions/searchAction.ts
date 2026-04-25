// *** แปลงคำค้นหาเป็น Vector (512)***
"use server"
import { pipeline, RawImage } from "@xenova/transformers";
import { createClient } from "@/lib/supabase/supabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
const supabase = await createClient();

export const searchByImageAction = async (formData: FormData) => {
    try {
        // 1. ดึงไฟล์ออกมาจาก FormData (ชื่อต้องตรงกับ 'image_file')
        const file = formData.get('image_file') as File;
        if (!file || file.size === 0) throw new Error("No file uploaded");

        // 2. โหลด Model (แนะนำให้ประกาศไว้ข้างนอกหรือใช้ Singleton ถ้าทำได้)
        const visionModel = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');

        // 3. แปลงภาพเป็น Vector
        const buffer = Buffer.from(await file.arrayBuffer());
        const image = await RawImage.fromBlob(new Blob([buffer]));
        const output = await visionModel(image);
        const imageVector = Array.from(output.data);
        // console.log("Vector Length:", imageVector.length);

        // 4. ค้นหาใน Supabase
        const { data, error } = await (supabase as any).rpc('match_artifacts', {
            query_embedding: imageVector,
            match_threshold: 0.1,
            match_count: 5,
            current_id: -1,
            search_type: 'image' // ✅ อย่าลืมส่ง flag นี้ไปที่ RPC
        });

        if (error) throw error;

        // 5. ส่งกลับในรูปแบบที่ Client คาดหวัง
        return { results: data || [] };

    } catch (error: any) {
        console.error("Search Action Error:", error);
        return { results: [], error: error.message };
    }
}

//
export const searchAction = async (query: string) => {
    try {
        if (!query) return { error: "กรุณาใส่คำค้นหา" };
        const apiKey = process.env.GOOGLE_GEMINI_API;
        if (!apiKey) {
            throw new Error("Not found Gemini API Key");
        }
        console.log(query);
        const genAI = new GoogleGenerativeAI(apiKey!);
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        // 1. แปลงคำค้นหาเป็น Vector
        const result = await model.embedContent(query);
        const vector = result.embedding.values;

        // 2. เรียกใช้ RPC Function ที่เราสร้างไว้ใน SQL
        const { data, error } = await (supabase as any).rpc('match_artifacts', {
            query_embedding: vector,
            match_threshold: 0.1, // ค่าความคล้าย (0-1) ยิ่งน้อยยิ่งเจอเยอะ
            match_count: 5,        // จำนวนรายการที่ต้องการ
            current_id: 0,
            search_type: 'text'
        });
        console.log("SearchAction", data);
        console.error("SearchAction Error", error);
        return { results: data };
    } catch (error: any) {
        console.error("Search Error:", error);
        return { error: error.message };
    }
}
