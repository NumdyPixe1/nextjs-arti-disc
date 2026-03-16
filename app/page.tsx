"use client"

import { SearchBar } from "./components/searchBar";
import { Artifacts } from "./components/artifacts";
import { useState } from "react";
export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    console.log("query: ", query);
    setLoading(true);
    try {
      // const res = await fetch("/api/gemini-ai", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query }),
      // });
      // //
      // if (!res.ok) {
      //   const errorText = await res.json();
      //   console.error("Server error:", errorText);
      //   return;
      // }
      // //
      // const data = await res.json();
      // if (data.result) {
      //   console.log(data.result);
      //   setResult(data.result);
      // }
    }
    catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <main className=" h-screen  font-sans ">
      {result &&
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-72 lg:w-80">
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-blue-50">
            <div className="max-h-[50vh] overflow-y-auto pr-3">
              <p className=" text-black text-sm leading-relaxed">
                {result}
              </p>
            </div>
          </div>
        </div>
      }

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
        <Artifacts />
      </section>
    </main>
  );
}
