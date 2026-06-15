// แปลงข้อมูลในตาราง Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/embedding **
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabaseClient";
const apiKey = process.env.GOOGLE_GEMINI_API;
const supabase = await createClient();

export const POST = async () => {
    try {
        if (!apiKey) {
            throw new Error("Gemini API Key not found");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        // --- Embedding Vector ---
        let successCount = 0;
        const { data: artifacts } = await supabase
            .from('Artifacts')
            .select('*')
            .is('embedding', null);

        if (artifacts && artifacts.length > 0) {
            console.log(`Processing Gemini Embeddings ${artifacts.length} items...`);
            for (const item of artifacts) {
                const textToEmbed =
                    `
                Era: ${item.era}               
                Category: ${item.category}
                Art Style: ${item.art_style}
                Title: ${item.title}
                Description: ${item.description}`;
                // 2. สร้าง Vector ด้วย Gemini
                const result = await embedModel.embedContent(textToEmbed);
                const vector = result.embedding.values;

                // 3. บันทึกลง Supabase (ส่งเป็น string format [x,y,z...])
                const { error: updateError } = await supabase
                    .from('Artifacts')
                    .update({
                        /* แปลง Array ให้เป็น string และเอาเครื่องหมาย , มาเชื่อมตัวเลข แล้วครอบด้วยวงเล็บ
                        Ex. "[0.123,0.456,-0.789]" */
                        embedding: `[${vector.join(',')}]` as any
                    })
                    .eq('id', item.id);

                if (updateError) {
                    console.error(`ID ${item.id} Broken:`, updateError.message)
                } else {
                    console.log(`✅ ID ${item.id}: Embedded successfully`);
                    successCount++;
                }
            }

        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

/*
import { AutoTokenizer, CLIPTextModelWithProjection } from '@xenova/transformers';

// 🌟 วางฟังก์ชัน L2Normalize ไว้ด้านบนสุดของไฟล์ (นอก export)
function L2Normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (norm === 0) return vector;
    return vector.map(val => val / norm);
}

export const POST = async () => {
    try {
        // เปลี่ยนมาใช้โมเดล Multilingual เพื่อความแม่นยำภาษาไทย
        const model_id = 'Xenova/clip-vit-base-patch32';
        const tokenizer = await AutoTokenizer.from_pretrained(model_id);
        const text_model = await CLIPTextModelWithProjection.from_pretrained(model_id);

        const { data: artifacts } = await supabase
            .from('Artifacts')
            .select('*')
            .is('embedding', null);

        if (artifacts && artifacts.length > 0) {
            for (const item of artifacts) {
                const textToEmbed = `Era: ${item.era} Category: ${item.category} Art Style: ${item.art_style} Title: ${item.title} Description: ${item.description}`.trim();

                const text_inputs = await tokenizer(textToEmbed, { padding: true, truncation: true });
                const { text_embeds } = await text_model(text_inputs);

                // 🌟 จุดที่นำมาใช้: ฟอกค่าเวกเตอร์ของข้อมูลโบราณวัตถุแต่ละชิ้น
                const rawVector = Array.from(text_embeds.data) as number[];
                const vectorArray = L2Normalize(rawVector); // <--- เรียกใช้ตรงนี้

                // 4. บันทึกลง Supabase
                await supabase
                    .from('Artifacts')
                    .update({
                        // นำเวกเตอร์ที่ถูก Normalize เรียบร้อยแล้วไปแปลงเป็นสตริงอัปเดตลงตาราง
                        embedding: `[${vectorArray.join(',')}]` as any
                    })
                    .eq('id', item.id);
            }
        }
        return NextResponse.json({ message: "Embedded successfully." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
*/