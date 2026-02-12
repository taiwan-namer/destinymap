import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DestinyMap",
  description: "紫微斗數與旅遊推薦",
  // Favicon：請將 logo.png 放在 public/，建議尺寸 48x48 以上（Google）、180x180（Apple）
  icons: {
    icon: { url: "/logo.png", type: "image/png", sizes: "48x48" },
    apple: { url: "/logo.png", type: "image/png", sizes: "180x180" },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DestinyMap AI",
  "url": "https://www.destinymapai.com/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
