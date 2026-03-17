"use client"

import { SearchBar } from "./components/searchBar";
import { Artifacts } from "./components/artifacts";
import { useState } from "react";
export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    console.log("query: ", query);
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
        console.log("พบข้อมูลที่ใกล้เคียง:", data.results);
      } else {
        console.error("เกิดข้อผิดพลาด:", data.error);
      }
      // --- Chat Gemini --- 
      /* const res = await fetch("/api/gemini-ai", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ query }),
       });
       //
       if (!res.ok) {
         const errorText = await res.json();
         console.error("Server error:", errorText);
         return;
       }
       //
       const data = await res.json();
       if (data.result) {
         console.log(data.result);
         setResult(data.result);
     }*/
    }
    catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <main className=" h-screen  font-sans ">
      {/* --- Chat Gemini --- 
      {results &&
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-72 lg:w-80">
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-blue-50">
            <div className="max-h-[50vh] overflow-y-auto pr-3">
              <p className=" text-black text-sm leading-relaxed">
                {results}
              </p>
            </div>
          </div>
        </div>
      } */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center ">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Section 1: Visual Search Focus */}
      <section className="h-screen w-full snap-start bg-blue-500 flex items-center justify-center">
        <div className="flex flex-col ">
          <h1 className="text-white mb-60  text-5xl font-bold">ระบบสืบค้นฐานข้อมูลโบราณวัตถุ</h1>
        </div>
      </section>

      {/* Section 2: Data Listing Grid */}
      <section className="h-screen w-full snap-start bg-blue-500 flex items-center justify-center">
        {results.length === 0 && !loading && (<Artifacts />)}

        {/* Loading */}
        {loading && (<div className="text-center py-20">
          <div className="animate-bounce text-blue-500 text-6xl">🔍</div>
          <p className="mt-4 text-gray-500">AI กำลังวิเคราะห์ความหมาย...</p>
        </div>)}

        {/* Found Results */}
        {results.length > 0 && !loading && (
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-white text-2xl font-bold mb-8">พบข้อมูลที่เกี่ยวข้อง</h2>

            {/* ส่ง results เข้าไปทีเดียวเลย Artifacts จะไป map ข้างในเอง */}
            <Artifacts search_data={results} />

            {/* <button
              onClick={() => setResults([])}
              className="mt-10 text-white/50 hover:text-white underline transition-colors"
            >
              กลับไปหน้าเริ่มต้น
            </button> */}
          </div>
        )}
      </section>
    </main>
  );
}
