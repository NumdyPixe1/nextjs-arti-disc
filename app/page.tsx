
import { SearchBar } from "./components/searchBar";
import { Artifacts } from "./components/artifacts";
export default function Home() {

  return (
    <main className=" h-screen  font-sans ">
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center ">

        <SearchBar />
      </div>

      {/* Section 1: Visual Search Focus */}
      <section className="h-screen w-full snap-start bg-blue-500 flex items-center justify-center">
        <div className="flex flex-col ">
          <h1 className="text-white mb-60  text-5xl font-bold">ระบบสืบค้นฐานข้อมูลโบราณวัตถุ</h1>
        </div>
      </section>

      {/* Section 2: Data Listing Grid */}
      <section className="h-screen w-full snap-start bg-amber-400 flex items-center justify-center">
        <Artifacts />
      </section>
    </main>
  );
}
