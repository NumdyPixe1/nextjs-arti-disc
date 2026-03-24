"use client"

import { Artifacts } from "./components/Artifacts";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { Loading } from "./components/Loading";
import { searchAction } from "./actions/searchAction";
export default function HomePage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    console.log("query: ", query);
    setLoading(true);
    try {
      const response = await searchAction(query);
      if (response.results) {
        setResults(response.results);
        console.log("พบข้อมูลที่ใกล้เคียง:", response.results);
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
    <main className=" h-screen  font-sans ">
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center ">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Section 1: Visual Search Focus */}
      <section className="h-screen w-full snap-start bg-[#FDF8F1] flex items-center justify-center">
        <div className="flex flex-col ">
          <h1 className="text-[#1A1A1A] mb-60  text-5xl font-bold">ระบบสืบค้นฐานข้อมูลโบราณวัตถุ</h1>
        </div>
      </section>

      {/* Section 2: Data Listing Grid */}
      <section className="h-screen w-full snap-start bg-[#FDF8F1] flex items-center justify-center">
        {/* ถ้าไม่มีผลลัพธ์และไม่ได้โหลด ให้แสดง Artifacts ทั้งหมด */}
        {results.length === 0 && !loading && <Artifacts />}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <Loading />
          </div>
        )}

        {/* Search result status */}
        {/* {!loading && results.length === 0 && (
          <h2 className="text-white text-2xl font-bold mb-8">ไม่พบข้อมูลที่เกี่ยวข้อง</h2>
        )} */}

        {!loading && results.length > 0 && (
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-white text-2xl font-bold mb-8">พบข้อมูลที่เกี่ยวข้อง</h2>
            <Artifacts search_data={results} />
          </div>
        )}
      </section>
    </main>
  );
}
