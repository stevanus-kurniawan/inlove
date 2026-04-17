import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Dalam kenangan penuh kasih",
  description:
    "Ruang yang tenang untuk mengenang dan berbagi ucapan hangat.",
  manifest: "/faveicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/faveicon/favicon.ico", sizes: "any" },
      {
        url: "/faveicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/faveicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/faveicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/faveicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/faveicon/apple-touch-icon.png",
  },
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
