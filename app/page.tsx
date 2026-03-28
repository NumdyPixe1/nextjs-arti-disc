"use client"

import { Artifacts } from "./components/artifacts";
import { useState } from "react";
import { SearchBar } from "./components/searchBar";
import { searchAction } from "./actions/searchAction";
export default function HomePage() {

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* รับ Callback จาก SearchBar และส่งคำค้นหาไปให้ searchAction 
  เพื่อนำไปปรมวลผล และทำการแสดงข้อมูลที่ค้นหา */
  const handleSearch = async (query: string) => {
    console.log("query: ", query);
    setLoading(true);
    try {
      const response = await searchAction(query);
      if (response.results) {
        setResults(response.results);
        console.log("From page.tsx พบข้อมูลที่ใกล้เคียง:", response.results);
      }
      else {
        console.error("เกิดข้อผิดพลาด:", response.error);
      }
    }
    catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <main className="min-h-screen bg-[#F0EEEB] font-ibm-thai ">
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center ">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Section 1: Visual Search Focus */}
      <section className="h-screen w-full snap-start flex items-center justify-center">
        <div className="flex flex-col ">
          <h1 className="text-[#1A1A1A] mb-60 text-5xl font-bold">ระบบสืบค้นฐานข้อมูลโบราณวัตถุ</h1>
        </div>
      </section>

      {/* Section 2: ผลลัพธ์ (ใช้ Artifacts ตัวเดียวจบ) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-10">
        {/* {hasSearched && results.length > 0 && (
          <h2 className="text-[#1A1A1A] text-2xl font-bold mb-8">พบข้อมูลที่เกี่ยวข้อง</h2>
        )} */}

        {/* ส่ง results เข้าไป ถ้าว่างมันจะโหลดหน้าแรกเอง ถ้ามีมันจะโชว์ผลการค้นหา */}
        <Artifacts query={results.length > 0 ? results : undefined} />
      </section>
    </main>
  );
}
