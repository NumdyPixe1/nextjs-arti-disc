// UI Search Bar & Call back คำค้นหา
"use client"
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import { searchAction, searchByImageAction } from "../actions/searchAction";
import { Button } from "./Button";
import { ImageSearchModal } from "./Modal";
import { Artifact } from "@/@types/artifact";


interface Props {
    //รับ param 1 ตัว ชื่อ query เท่านั้น และ รับค่าเข้าโดยไม่ต้องส่งค่าออก
    onResults: (results: Artifact[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

// รับคำค้นหา
export const SearchBar = ({ onResults, setLoading, loading }: Props) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, -320]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
    // 
    const [word, setWord] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [itemName, setItemName] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const clearForm = () => {
        setPreviewUrl(null);
        setItemName("");
        setWord("");
        setIsModalOpen(false);
        setSelectedFile(null);
    }
    // ค้นหาด้วยข้อความ
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim()) return;
        console.log("Searching for:", word);
        handleSearch(word);
    }
    // ค้นหาด้วยขรูปภาพ
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        // 2. สร้าง URL ชั่วคราวเพื่อแสดงรูป
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setSelectedFile(file);
        setItemName(file.name);
        e.target.value = "";
    }

    const confrimSearchByImage = () => {
        if (!selectedFile) return;
        handleSearch(selectedFile);

        clearForm();
    }

    const handleSearch = async (query: string | File) => {
        setLoading(true);
        try {
            let response;
            if (typeof query === 'string') {
                response = await searchAction(query);
                console.log("Text Response:", response);
            } else {
                // ห่อ File ลงใน FormData ก่อนส่ง
                const formData = new FormData();
                formData.append('image_file', query);
                response = await searchByImageAction(formData);
                console.log("Image Response:", response);
            }
            if (response && response.results) {
                onResults(response.results || []); // ส่งผลลัพธ์กลับไปที่ Parent Component
            }
            else {
                console.error("Search returned no data:", response);
            }
        }
        catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            <motion.div
                style={{ y: smoothY }}
                className="pointer-events-auto sticky group max-w-2xl mx-auto w-full px-4 flex gap-2 items-center justify-center "
            >
                <form onSubmit={handleSubmit} className="flex flex-1">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหา..."
                        className="flex-1 h-14 pl-16 pr-6 rounded-xl bg-white text-gray-900 text-xl focus:outline-none transition shadow-2xl border border-gray-100"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        style="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600
                     hover:to-blue-700 text-white px-6 py-2 rounded-xl ml-2 h-14 font-medium 
                     transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
                        children={loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                โหลด...
                            </>
                        ) : (
                            <>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                ส่ง
                            </>
                        )}
                    />
                </form>
                <Button
                    type="button"
                    disabled={loading}
                    onClick={() => setIsModalOpen(true)}
                    style="cursor-pointer bg-gradient-to-r from-green-500 
                to-green-600 hover:from-green-600 hover:to-green-700 text-white
                 px-4 py-2 rounded-xl ml-2 h-14 font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center"
                    children={loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            โหลด...
                        </>
                    ) : (
                        <>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </>
                    )}
                />
            </motion.div >
            <ImageSearchModal
                isOpen={isModalOpen}
                previewUrl={previewUrl}
                onClose={() => { setIsModalOpen(false); clearForm(); }}
                onFileChange={handleFileChange}
                itemName={itemName}
                onConfirm={confrimSearchByImage}
            />
        </>
    );
};

// คำนวณระยะการเลื่อน
// [0, 300] คือระยะ scroll จากบนสุดลงมา 300px
// [0, -420] คือการดันตัวมันเองขึ้นไป 420px
