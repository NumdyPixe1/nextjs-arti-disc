"use client";
import { PATHS } from "@/app/utils/paths";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className=" top-0 z-40 w-full border-b border-slate-200 bg-[#f8f4e8] backdrop-blur-lg backdrop-saturate-150">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand */}
                    {/* <Link href={PATHS.HOME} className="flex items-center gap-3 group">
                        <div className="relative h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-sky-500 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent hidden sm:block">
                                Artifact
                            </span>
                            <span className="text-xs text-slate-500 hidden sm:block">Discovery</span>
                        </div>
                    </Link> */}

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href={PATHS.HOME} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                            Explore
                        </Link>

                        <Link href={PATHS.About} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                            About
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* <Language /> */}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {/* {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-slate-200 pt-4">
                        <Link
                            href="#artifacts"
                            className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Explore
                        </Link>
                        <Link
                            href="#search"
                            className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Search
                        </Link>
                        <Link
                            href="#collections"
                            className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Collections
                        </Link>
                        <Link
                            href="#about"
                            className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/admin/artifacts"
                            className="block px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium transition-colors mt-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin Panel
                        </Link>
                    </div>
                )} */}
            </div>
        </nav>
    );
}
