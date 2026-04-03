"use client"

import { ArtifactsList } from "./components/artifactsList";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/searchBar";
import { NavBar } from "./components/NavBar";
import { useRef } from "react";
export default function HomePage() {

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const resultsSectionRef = useRef<HTMLDivElement>(null);

  // 2. ฟังก์ชันสำหรับสั่งให้เลื่อนหน้าจอ
  const scrollToResults = () => {
    resultsSectionRef.current?.scrollIntoView({
      behavior: "smooth", // เลื่อนแบบนุ่มนวล
      block: "start"      // ให้ขยับมาเริ่มที่ขอบบนของ section
    });
  };
  useEffect(() => {
    // เช็คว่ามีผลลัพธ์ และไม่ได้กำลังโหลดอยู่
    if (results.length > 0 && !loading) {
      // หน่วงเวลาเล็กน้อยเพื่อให้ React Render Card/List ให้เสร็จก่อนเลื่อน
      const timer = setTimeout(() => {
        scrollToResults();
      }, 300); // ปรับเพิ่มเป็น 300-500ms เพื่อความชัวร์

      return () => clearTimeout(timer);
    }
  }, [results, loading]);

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
      <section className="w-full max-w-7xl mx-auto px-4 py-10" ref={resultsSectionRef}>
        {/* {results.length > 0 ? (<h1 className="text-[#1A1A1A] mb-6 text-2xl font-bold">ผลลัพธ์การค้นหา: {results.length} รายการ</h1>) : null} */}
        {/* ส่ง results เข้าไป ถ้าว่างมันจะโหลดหน้าแรกเอง ถ้ามีมันจะโชว์ผลการค้นหา */}
        <ArtifactsList query={results.length > 0 ? results : undefined} />
      </section>
    </main>
  );
}
