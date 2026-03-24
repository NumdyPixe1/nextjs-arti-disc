"use client";
import { useEffect, useState } from "react";
import { analyzeArtifact } from "../actions/analyricActions";

// หยิบ data จาก props มาแสดงผลในนี้
export const AiDescription = ({ data }: { data: any }) => {
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    if (!data?.id) {
        setError("ไม่มีข้อมูลโบราณวัตถุให้วิเคราะห์");
        setLoading(false);
        return;
    }
    useEffect(() => {
        const autoAnalyze = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await analyzeArtifact(data);
                if (!result || !result.description) {
                    setError("AI ไม่สามารถสร้างคำอธิบายได้ โปรดลองอีกครั้ง");
                } else {
                    setAiAnalysis(result);
                }
            } catch (e) {
                console.error("AI analysis failed:", e);
                setError("เกิดข้อผิดพลาดในการวิเคราะห์ AI โปรดลองใหม่อีกครั้ง");
            } finally {
                setLoading(false);
            }
        };

        autoAnalyze();
    }, [data?.id, aiAnalysis]); // รันใหม่เฉพาะเมื่อ ID เปลี่ยน และถ้า data ไม่มี id ก็จะไม่รัน

    // ลองวิเคราะห์ใหม่ เมื่อเกิด error
    const retry = () => {
        setAiAnalysis(null);
        setError(null);
        setLoading(true);
        analyzeArtifact(data)
            .then((result) => {
                if (result?.description) {
                    setAiAnalysis(result);
                } else {
                    setError("AI ไม่สามารถสร้างคำอธิบายได้ โปรดลองอีกครั้ง");
                }
            })
            .catch((e) => {
                console.error("AI analysis failed:", e);
                setError("เกิดข้อผิดพลาดในการวิเคราะห์ AI โปรดลองใหม่อีกครั้ง");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">คำอธิบายจาก AI</h3>

            {loading ? (
                <div className="flex flex-col items-center justify-center p-8 bg-slate-800/40 rounded-2xl animate-pulse border border-white/10">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-cyan-200 font-medium">Analyric AI กำลังวิเคราะห์ข้อมูลและรูปภาพ...</p>
                </div>
            ) : error ? (
                <div className="bg-rose-900/30 border border-rose-400/30 p-6 rounded-2xl text-center">
                    <p className="text-rose-100 mb-3">{error}</p>
                    <button
                        onClick={retry}
                        className="cursor-pointer inline-flex items-center justify-center px-5 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-medium transition"
                    >
                        ลองวิเคราะห์อีกครั้ง
                    </button>
                </div>
            ) : aiAnalysis ? (
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-cyan-300/30 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 rounded-full bg-cyan-500/20 text-cyan-200">AI</span>
                        <h4 className="text-lg font-bold text-white">{aiAnalysis.title || "คำอธิบายโบราณวัตถุ"}</h4>
                    </div>

                    <p className="text-slate-100 leading-relaxed text-base md:text-lg whitespace-pre-line">
                        {aiAnalysis.description}
                    </p>

                    {/* {aiAnalysis.keypoints && Array.isArray(aiAnalysis.keypoints) && (
                        <div className="mt-5">
                            <h5 className="text-sm text-cyan-200 font-medium mb-2">จุดเด่นที่พบ:</h5>
                            <ul className="space-y-2">
                                {aiAnalysis.keypoints.map((point: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-slate-100 text-sm">
                                        <span className="inline-flex w-2 h-2 mt-1 rounded-full bg-cyan-300" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}

                    <p className="mt-4 text-xs text-white/40">*ข้อมูลจาก AI อาจไม่ถูกต้อง 100% ควรตรวจสอบร่วมกับผู้เชี่ยวชาญ</p>
                </div>
            ) : (
                <div className="p-6 rounded-2xl bg-slate-800/50 text-slate-100 text-sm text-center">
                    ไม่พบผลลัพธ์ AI
                </div>
            )}
        </div>
    );
}