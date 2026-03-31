// แปลงข้อมูลในตาราง Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/embedding **
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase-client";
import { pipeline } from "@xenova/transformers";

// export const GET = async () => {
//     try {

//         const model = await pipeline('feature-extraction', 'Xenova/paraphrase-multilingual-MiniLM-L12-v2');

//         // --- Embedding Vector ---
//         let successCount = 0;
//         const { data: artifacts } = await supabase
//             .from('Artifacts')
//             .select('*')
//             .is('embedding', null);
//         if (!artifacts || artifacts.length === 0) {
//             return NextResponse.json({ message: "No artifacts found without embeddings." }
//                 // ไม่มีข้อมูลที่ต้องทำ Embedding
//             );
//         }

//         console.log(`🚀 Starting Text Embeddings for ${artifacts.length} items...`);

//         for (const item of artifacts) {
//             const textToEmbed =
//                 `Art Style: ${item.art_style}
//             Title: ${item.title}
//             Description: ${item.description}`;

//             const output = await model(textToEmbed, {
//                 pooling: 'cls',      // สำคัญ: สำหรับ CLIP Text ต้องใช้ 'cls' เพื่อดึงความหมายรวม
//                 normalize: true,     // สำคัญ: เพื่อให้ได้ Unit Vector สำหรับ Cosine Similarity
//             });

//             // 2. ดึง Data ออกมาเป็น Array
//             // output จะคืนค่าเป็น Tensor { data: Float32Array, dims: [...], ... }
//             const vector = Array.from(output.data);

//             // ตรวจสอบ Dimensions (ต้องได้ 512)
//             console.log(`ID ${item.id} Vector Length: ${vector.length}`);
//             // 3. บันทึกลง Supabase (ส่งเป็น string format [x,y,z...])
//             const { error: updateError } = await supabase
//                 .from('Artifacts')
//                 .update({
//                     /* แปลง Array ให้เป็น string และเอาเครื่องหมาย , มาเชื่อมตัวเลข แล้วครอบด้วยวงเล็บ
//                     Ex. "[0.123,0.456,-0.789]" */
//                     embedding: `[${vector.join(',')}]` as any
//                 })
//                 .eq('id', item.id);

//             if (updateError) {
//                 console.error(`❌ ID ${item.id} Broken:`, updateError.message)
//             } else {
//                 console.log(`✅ ID ${item.id}: Embedded successfully`);
//                 successCount++;
//             }
//         }
//         return NextResponse.json({
//             message: `Embedding created successfully! Updated ${successCount} items.`
//             // สร้าง Embedding สำเร็จ! อัปเดตไป  รายการ
//         });
//     }
//     catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



// แปลงข้อมูลในตาราง Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/embedding **

const apiKey = process.env.GOOGLE_GEMINI_API;

export const GET = async () => {
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
            const textToEmbed =
                `Art Style: ${item.art_style}
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
        return NextResponse.json({
            message: `Embedding created successfully! Updated ${successCount} items.`
            // สร้าง Embedding สำเร็จ! อัปเดตไป  รายการ
        });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
