// *** แปลงคำค้นหาเป็น Vector ***
"use server"
import { pipeline, RawImage } from "@xenova/transformers";
import supabase from "@/lib/supabase-client";


export const searchAction = async (query: string) => {
    try {
        // 1. โหลดโมเดล MiniLM (384 มิติ) - ตัวเดียวกับที่ใช้ทำ Indexing
        const extractor = await pipeline(
            'feature-extraction',
            'Xenova/paraphrase-multilingual-MiniLM-L12-v2'
        );

        // 2. สร้าง Vector จากข้อความค้นหา (Query)
        const output = await extractor(query, {
            pooling: 'mean', // MiniLM มักใช้ mean pooling
            normalize: true
        });

        // แปลงเป็น Array ปกติ (จะมี 384 ตัวเลข)
        const vectorArray = Array.from(output.data);
        const vectorString = `[${vectorArray.join(',')}]`;
        // 3. เรียกใช้ RPC Function 'match_artifacts' ใน Supabase
        const { data, error } = await supabase.rpc('match_artifacts', {
            query_embedding: vectorString,      // ส่ง 384 dims ไป
            match_threshold: 0.25,        // ปรับความแม่นยำ (0.2 - 0.4 กำลังดี)
            match_count: 10,              // จำนวนผลลัพธ์ที่ต้องการ
            current_id: -1,               // ถ้าไม่มี ID ที่ต้องยกเว้นให้ส่ง -1
            search_type: 'text'           // ✅ ระบุว่าเป็น 'text' เพื่อให้ SQL ไปดูที่คอลัมน์ 384
        });

        if (error) throw error;

        return { results: data };

    } catch (error: any) {
        console.error("Text Search Error:", error.message);
        return { success: false, error: error.message };
    }
};

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

        // 4. ค้นหาใน Supabase
        const { data, error } = await (supabase as any).rpc('match_artifacts', {
            query_embedding: imageVector,
            match_threshold: 0.05,
            match_count: 10,
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

// export const searchAction = async (query: string) => {
//     try {
//         if (!query) return { error: "กรุณาใส่คำค้นหา" };
//         const apiKey = process.env.GOOGLE_GEMINI_API;
//         if (!apiKey) {
//             throw new Error("Not found Gemini API Key");
//         }

//         const genAI = new GoogleGenerativeAI(apiKey!);
//         const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

//         // 1. แปลงคำค้นหาเป็น Vector
//         const result = await model.embedContent(query);
//         const vector = result.embedding.values;

//         // 2. เรียกใช้ RPC Function ที่เราสร้างไว้ใน SQL
//         const { data, error } = await (supabase as any).rpc('match_artifacts', {
//             query_embedding: vector,
//             match_threshold: 0.1, // ค่าความคล้าย (0-1) ยิ่งน้อยยิ่งเจอเยอะ
//             match_count: 5,        // จำนวนรายการที่ต้องการ
//             current_id: null,
//             search_type: 'text'
//         });
//         console.log("SearchAction", data, error);
//         if (error) throw error;
//         return { results: data };
//     } catch (error: any) {
//         console.error("Search Error:", error);
//         return { error: error.message };
//     }
// }
