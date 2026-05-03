export default function About() {
    return (
        <main className="min-h-screen bg-[#f4f1ec] text-[#111827]">
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 py-20 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.2),_transparent_20%)] pointer-events-none" />
                <div className="relative mx-auto max-w-6xl">
                    <div className="max-w-3xl space-y-6">
                        <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.28em] text-sky-200">
                            About Artifact Discovery
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                            ค้นหาโบราณวัตถุใกล้เคียง ด้วยภาพเดียว
                        </h1>
                        <p className="text-base sm:text-lg leading-8 text-slate-200/90">
                            แอปพลิเคชันนี้ช่วยให้คุณค้นหาและเปรียบเทียบโบราณวัตถุจากฐานข้อมูลด้วยภาพ พร้อมดูข้อมูลตำแหน่ง สมัย และความใกล้เคียงเชิงวิเคราะห์ได้อย่างรวดเร็ว
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-10 lg:grid-cols-3">
                    <article className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">พันธกิจ</h2>
                        <p className="text-slate-600 leading-7">
                            เราต้องการทำให้การเข้าถึงข้อมูลโบราณวัตถุเป็นเรื่องง่ายและเข้าใจได้ ด้วยการใช้เทคโนโลยีภาพและโมเดลการค้นหาความคล้ายคลึง เพื่อนำเสนอข้อมูลเชิงลึกอย่างรวดเร็ว
                        </p>
                    </article>
                    <article className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">วิธีใช้งาน</h2>
                        <p className="text-slate-600 leading-7">
                            อัปโหลดรูปภาพโบราณวัตถุหรือพิมพ์คำค้นหาเพื่อดูรายการที่ใกล้เคียงที่สุด พร้อมข้อมูลสถานที่ค้นพบ สมัย และความน่าเชื่อถือของการค้นหา
                        </p>
                    </article>
                    <article className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg shadow-slate-200/50">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">คุณสมบัติเด่น</h2>
                        <p className="text-slate-600 leading-7">
                            ระบบรองรับการค้นหาด้วยภาพ, แสดงผลแบบการ์ด, รองรับการเลื่อนโหลดข้อมูลอัตโนมัติ และมีแผนที่ตำแหน่งเพื่อช่วยให้เข้าใจบริบทของโบราณวัตถุ
                        </p>
                    </article>
                </div>
            </section>

            <section className="bg-slate-950 px-6 py-16 text-white">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                                How it works
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                ภาพของคุณคือกุญแจสู่การค้นพบ
                            </h2>
                            <p className="max-w-xl text-slate-300 leading-8">
                                อัปโหลดภาพโบราณวัตถุ จากนั้นระบบจะวิเคราะห์ลักษณะและค้นหาผลลัพธ์ที่มีความใกล้เคียงในฐานข้อมูล เพื่อให้คุณเห็นข้อมูลที่เกี่ยวข้องได้ทันที
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "ค้นหาด้วยภาพ", description: "ใช้ภาพโบราณวัตถุเป็นคำค้นหา เพื่อให้ได้ผลลัพธ์ที่ตรงกว่า" },
                                { title: "เปรียบเทียบคุณสมบัติ", description: "ดูสมัยและสถานที่ค้นพบของวัตถุที่ใกล้เคียง" },
                                { title: "แผนที่ตำแหน่ง", description: "แสดงตำแหน่งทางภูมิศาสตร์ของโบราณวัตถุ" },
                                { title: "ประสบการณ์ทันสมัย", description: "อินเตอร์เฟซใช้งานง่ายบนมือถือและเดสก์ท็อป" },
                            ].map((item) => (
                                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
