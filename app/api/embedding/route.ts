// แปลงข้อมูลในตาราง Artifacts ที่ยังไม่มี embedding
// ** http://localhost:3000/api/embedding **
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase-client";

const apiKey = process.env.GOOGLE_GEMINI_API;

export const GET = async () => {
    try {
        if (!apiKey) {
            throw new Error("Gemini API Key not found");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        // --- Embedding Vector ---
        const { data: artifacts, error: fetchError } = await supabase
            .from('Artifacts')
            .select('*');
        //.is('embedding', null)
        if (!artifacts || artifacts.length === 0) {
            return NextResponse.json({ message: "No artifacts found without embeddings." }, { status: 404 });
        }
        console.log(`Processing Gemini Embeddings ${artifacts.length} Items...`);

        for (const item of artifacts) {
            const textToEmbed = `Art Style: ${item.art_style} Title: ${item.title} Description: ${item.description}`;

            // 2. สร้าง Vector ด้วย Gemini
            const result = await embedModel.embedContent(textToEmbed);
            const vector = result.embedding.values;

            // 3. บันทึกลง Supabase (ส่งเป็น string format [x,y,z...])
            const { error: updateError } = await supabase
                .from('Artifacts')
                .update({
                    // Array เชื่อมกับคอมม่าและล้อมด้วยวงเล็บเหลี่ยมเพื่อให้ตรงกับรูปแบบที่เก็บในฐานข้อมูล
                    embedding: `[${vector.join(',')}]`
                })
                .eq('id', item.id);

            // Error
            if (updateError) console.error(`ID ${item.id} Broken:`, updateError.message);
        }

        return NextResponse.json({ message: "Gemini embedding completed!" });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
