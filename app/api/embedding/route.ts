// แปลงข้อมูลในตาราง Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/embedding **
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase-client";

const apiKey = process.env.GOOGLE_GEMINI_API;

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
        if (!artifacts || artifacts.length === 0) {
            return NextResponse.json({ message: "No artifacts found without embeddings." }
                // ไม่มีข้อมูลที่ต้องทำ Embedding
            );
        }

        console.log(`Processing Gemini Embeddings ${artifacts.length} items...`);

        for (const item of artifacts) {
            const textToEmbed = `Art Style: ${item.art_style} Title: ${item.title} Description: ${item.description}`;

            // 2. สร้าง Vector ด้วย Gemini
            const result = await embedModel.embedContent({
                content: {
                    role: "user", // บางเวอร์ชันต้องการ role
                    parts: [{ text: textToEmbed }]
                },
                taskType: "RETRIEVAL_DOCUMENT", // หรือ "RETRIEVAL_QUERY"
                outputDimensionality: 512,
            } as any);
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
        return NextResponse.json({
            message: `Embedding created successfully! Updated ${successCount} items.`
            // สร้าง Embedding สำเร็จ! อัปเดตไป  รายการ
        });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
