"use server";
import { baseInstruction } from "@/lib/analyric-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API;

async function getImageData(url: string) {
    // ลอง LOG ดูใน Terminal ว่า URL หน้าตาเป็นยังไง
    console.log("Checking Image URL:", url);

    if (!url || url === "") {
        throw new Error("ไม่พบ URL ของรูปภาพ");
    }

    const response = await fetch(url, { headers: { "User-Agent": "AnalyricArtifactBot/1.0 (numdao.ratcha@gmail.com)" } });

    // เช็คว่า fetch สำเร็จไหม (ถ้าไม่สำเร็จมักจะได้ HTML Error กลับมา)
    if (!response.ok) {
        throw new Error(`โหลดรูปไม่สำเร็จ: ${response.statusText}`);
    }

    // ดึงประเภทไฟล์จริงจาก Header (เช่น 'image/png' หรือ 'image/jpeg')
    const contentType = response.headers.get("content-type");
    // เช็คว่าสิ่งที่ได้กลับมาใช่ Image จริงๆ หรือเปล่า
    if (!contentType?.startsWith("image/")) {
        throw new Error(`ไฟล์ที่ได้รับไม่ใช่รูปภาพ (ได้รับ: ${contentType})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
        base64,
        mimeType: contentType || "image/jpeg" // ถ้าหาไม่เจอให้ Default เป็น jpeg กันเหนียว
    };
}

export const analyzeArtifact = async (dbData: any) => {
    try {
        if (!apiKey) {
            throw new Error("Gemini API Key not found");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

        // ดึงข้อมูลใน DB และแปลงรูปภาพเป็น Base64
        const { base64, mimeType } = await getImageData(dbData.image_url);
        const prompt = baseInstruction(dbData);

        // ส่งข้อมูลไปให้ Gemini วิเคราะห์
        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64, mimeType: mimeType } }
        ]);
        const response = result.response.text();

        // Cleaning เอาข้อมูลในปีกกาออกมา
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        // ถ้าไม่มีปีกกาให้ใช้ข้อความทั้งหมดแล้วลบ ```json ออก
        const cleanedJson = jsonMatch ? jsonMatch[0] : response.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedJson);

    }
    catch (e: any) {
        console.error("Connection Gemini Failed:", e);
        // if (e.status === 429) {
        //     throw new Error("AI กำลังยุ่งอยู่ (Quota Exceeded) กรุณารอสักครู่แล้วลองใหม่ครับ");
        // }
        throw e;
    }
}
