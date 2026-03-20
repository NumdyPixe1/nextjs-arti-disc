"use client";
import { useEffect, useState } from "react";
import { AnalyzeArtifact } from "../actions/analyric";
// หยิบ data จาก props มาแสดงผลในนี้
export const AiDescription = ({ data }: { data: any }) => {
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const autoAnalyze = async () => {
            setLoading(true);
            try {
                const result = await AnalyzeArtifact(data);
                setAiAnalysis(result);
            }
            catch (error) {
                console.error("AI analysis failed:", error);
            } finally {
                setLoading(false);
            }
        };
        autoAnalyze();

    }, [data?.id])// รันใหม่เฉพาะเมื่อ ID เปลี่ยน
    return (<div className="mt-8 border-t pt-6">
        {loading ? (
            // แสดงสถานะกำลังโหลดแบบเนียนๆ
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl animate-pulse">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-purple-600 font-medium">Analyric AI กำลังวิเคราะห์ข้อมูลและรูปภาพ...</p>
            </div>
        ) : aiAnalysis ? (
            // แสดงผลลัพธ์จาก AI
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-bold text-purple-800 tracking-tight">{aiAnalysis.title}</h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">
                    "{aiAnalysis.description}"
                </p>


            </div>
        ) : (
            <div className="text-center p-6 text-gray-400">
                ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้
            </div>
        )}
    </div>)
}