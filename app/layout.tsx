import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const ibmPlexThaiLooped = IBM_Plex_Sans_Thai_Looped({
  weight: ['300', '400', '500', '600', '700'], // เลือก Weight ที่ต้องการ
  subsets: ['thai', 'latin'],
  variable: '--font-ibm-thai', // กำหนดชื่อ CSS Variable
});

export const metadata: Metadata = {
  title: "Artifact Digital Collection and Retrieval System",
  description: "Development of an Artifact Digital Collection and Retrieval System Based on Vector Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexThaiLooped.variable} `}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
