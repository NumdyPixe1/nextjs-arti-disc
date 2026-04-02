"use client"

import { ArtifactsList } from "./components/ArtifactsList";
import { useState } from "react";
import { SearchBar } from "./components/searchBar";
import { NavBar } from "./components/NavBar";
export default function HomePage() {

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  return (
    <main className="min-h-screen bg-[#F0EEEB] font-ibm-thai " >

      <NavBar />

      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center ">
        <SearchBar
          onResults={(data) => { setResults(data) }}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      {/* Section 1: Visual Search Focus */}
      <section className="h-screen w-full snap-start flex items-center  justify-center">
        <div className="flex flex-col ">
          <h1 className="text-[#1A1A1A] mb-60 text-5xl font-bold">ระบบสืบค้นฐานข้อมูลโบราณวัตถุ</h1>
        </div>
      </section>

      {/* Section 2: ผลลัพธ์ (ใช้ Artifacts ตัวเดียวจบ) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-10">
        {results.length > 0 ? (<h1 className="text-[#1A1A1A] mb-6 text-2xl font-bold">ผลลัพธ์การค้นหา: {results.length} รายการ</h1>) : null}
        {/* ส่ง results เข้าไป ถ้าว่างมันจะโหลดหน้าแรกเอง ถ้ามีมันจะโชว์ผลการค้นหา */}
        <ArtifactsList query={results.length > 0 ? results : undefined} />
      </section>
    </main>
  );
}
