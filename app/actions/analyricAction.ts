// *** วิเคราะห์ข้อมูลในหน้า Full view ของ Artifact นั้น ***
"use server";
import { BASE_INSTRUCTION } from "@/app/utils/analyricPrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API;

export const analyzeArtifact = async (data: any) => {
    try {
        if (!apiKey) {
            throw new Error("Gemini API Key not found");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })
        const prompt = BASE_INSTRUCTION(data);
        console.log("%กำลังใช้ AI วิเคราะห์ ข้อมูลในหน้า Full view", "color: blue");

        // --- ส่งข้อมูลไปให้ Gemini วิเคราะห์ ---
        const result = await model.generateContent([
            prompt,
        ]);
        const response = result.response.text();

        // Cleaning เอาข้อมูลในปีกกาออกมา
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        // ถ้าไม่มีปีกกาให้ใช้ข้อความทั้งหมดแล้วลบ ```json ออก
        const cleanedJson = jsonMatch ? jsonMatch[0] : response.replace(/```json|```/g, "").trim();
        console.log("%เสร็จสิ้นการวิเคราะห์ด้วย AI", "color: green;");
        return JSON.parse(cleanedJson);
    }
    catch (error: any) {
        console.error("%Connection Gemini Failed:", "color: red;", error);
    }
}