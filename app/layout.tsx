import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07070f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anla.my.id"),
  title: {
    template: "%s | Anla Harpanda",
    default: "Anla Harpanda — Full Stack Developer & UI/UX Designer",
  },
  description:
    "Full Stack Web Developer & UI/UX Designer specializing in Next.js, Express.js, Laravel, Vue.js, and React. Based in Padang, Indonesia.",
  authors: [{ name: "Anla Harpanda" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://anla.my.id",
    siteName: "Anla Harpanda",
    title: "Anla Harpanda — Full Stack Developer & UI/UX Designer",
    description:
      "Building scalable web applications and user-centered experiences — from infrastructure to interface.",
  },
  icons: {
    icon: [{ url: "/itsanla-logo.webp", type: "image/webp" }],
    apple: [{ url: "/itsanla-logo.webp", sizes: "180x180", type: "image/webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
