export const Footer = () => {
    return (
        <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                            Artifact Discovery
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Discover and explore artifacts from around the world. Search by image or text to find similar treasures in our vast collection.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="p-2 rounded-lg bg-slate-700 hover:bg-blue-600 transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.16v8.56h2.16v-4.21c0-.92.64-1.44 1.68-1.44 1.29 0 1.84.75 1.84 2.2v3.45zM6.88 8.56a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36z" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-700 hover:bg-blue-600 transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-700 hover:bg-blue-600 transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.1" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                                    <circle cx="17.5" cy="6.5" r="1.5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-slate-100">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#artifacts" className="text-slate-400 hover:text-blue-400 transition-colors">Explore Artifacts</a></li>
                            <li><a href="#search" className="text-slate-400 hover:text-blue-400 transition-colors">Search</a></li>
                            <li><a href="#collections" className="text-slate-400 hover:text-blue-400 transition-colors">Collections</a></li>
                            <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-slate-100">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="#help" className="text-slate-400 hover:text-blue-400 transition-colors">Help Center</a></li>
                            <li><a href="#guide" className="text-slate-400 hover:text-blue-400 transition-colors">User Guide</a></li>
                            <li><a href="#api" className="text-slate-400 hover:text-blue-400 transition-colors">API Documentation</a></li>
                            <li><a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-slate-100">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#privacy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#terms" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#cookies" className="text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                            <li><a href="#sitemap" className="text-slate-400 hover:text-blue-400 transition-colors">Sitemap</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-8" />

                {/* Newsletter Signup */}
                {/*  <div className="bg-slate-800 rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-semibold text-lg mb-1">Subscribe to Updates</h4>
                            <p className="text-slate-400 text-sm">Get notified about new artifacts and discoveries</p>
                        </div>
                        <form className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:flex-initial px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 rounded-lg font-medium transition-all"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>*/}

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
                    <p>&copy; 2026 Artifact Discovery. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>v1.0.0</span>
                        <span>•</span>
                        <span>Built with passion</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}