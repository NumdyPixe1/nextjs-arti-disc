// *** แปลงคำค้นหาเป็น Vector ***
"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import supabase from "@/lib/supabase-client";

export const searchAction = async (query: string) => {
    try {
        if (!query)
            return { error: "กรุณาใส่คำค้นหา" };
        const apiKey = process.env.GOOGLE_GEMINI_API;
        if (!apiKey) {
            throw new Error("Not found Gemini API Key");
        }

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

        // console.log(`มีการใช้ ${model}`);
        return { results: data };
    } catch (error: any) {
        console.error("Search Error:", error);
        return { error: error.message };
    }
}