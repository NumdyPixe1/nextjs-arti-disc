import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const apiKey = process.env.GOOGLE_GEMINI_API;
        if (!apiKey) {
            return NextResponse.json({ error: "ไม่พบ Gemini API Key ในระบบ" }, { status: 500 });
        }
        //
        const body = await req.json();
        const prompt = body.query || body.prompt;
        if (!prompt) {
            return NextResponse.json({ error: "กรุณาส่งข้อความค้นหา" }, { status: 400 });
        }
        //
        const genAI = new GoogleGenerativeAI(apiKey);
        // --- Prompt ---
        /*  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }) 
        const results = await model.generateContent(prompt);
          const responseText = results.response.text();
          return NextResponse.json({ results: responseText }); //คำตอบ AI
        */
    }
    catch (error: any) {
        console.error("Gemini Error:", error.message);
        return NextResponse.json({ error: 'Connection Gemini Failed' }, { status: 500 });
    }
}
