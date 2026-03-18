import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import supabase from "@/libs/supabase-client";

export const POST = async (req: Request) => {
    try {
        const { query } = await req.json(); // รับคำค้นหาจากผู้ใช้
        const apiKey = process.env.GOOGLE_GEMINI_API;
        if (!apiKey) {
            return NextResponse.json({ error: "Not found Gemini API Key ในระบบ" }, { status: 500 });
        }

        if (!query) return NextResponse.json({ error: "กรุณาใส่คำค้นหา" }, { status: 400 });

        const genAI = new GoogleGenerativeAI(apiKey!);
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        // 1. แปลงคำค้นหาเป็น Vector
        const result = await model.embedContent(query);
        const vector = result.embedding.values;

        // 2. เรียกใช้ RPC Function ที่เราสร้างไว้ใน SQL
        const { data, error } = await (supabase as any).rpc('match_artifacts', {
            query_embedding: vector,
            match_threshold: 0.2, // ค่าความคล้าย (0-1) ยิ่งน้อยยิ่งเจอเยอะ
            match_count: 5        // จำนวนรายการที่ต้องการ
        });

        if (error) throw error;

        return NextResponse.json({ results: data });

    } catch (error: any) {
        console.error("Search Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}