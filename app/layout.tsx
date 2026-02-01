import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import ChatWidget from "./components/chat/ChatWidget";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Anla Harpanda - Full Stack Web Developer",
    default: "Anla Harpanda | Full Stack Web Developer & UI/UX Designer",
  },
  description: "Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, Vue.js, and React. Building scalable web applications with AWS cloud expertise. Based in Padang, Indonesia.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "React Developer",
    "Vue.js Developer",
    "Laravel Developer",
    "Express.js",
    "TypeScript",
    "Cloud Computing",
    "AWS",
    "Docker",
    "Anla Harpanda",
    "Indonesia Developer",
    "Padang",
    "Vector Illustrator"
  ],
  authors: [{ name: "Anla Harpanda", url: "https://www.linkedin.com/in/anlaharpanda" }],
  creator: "Anla Harpanda",
  publisher: "Anla Harpanda",
  metadataBase: new URL('https://anla.my.id'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://anla.my.id",
    title: "Anla Harpanda | Full Stack Web Developer & UI/UX Designer",
    description: "Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, Vue.js, and React. Based in Padang, Indonesia.",
    siteName: "Anla Harpanda - Web Developer Portfolio",
    images: [
      {
        url: "/pfp.webp",
        width: 1200,
        height: 630,
        alt: "Anla Harpanda - Full Stack Web Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anla Harpanda | Full Stack Web Developer",
    description: "Full Stack Web Developer & UI/UX Designer. Building scalable web applications with modern technologies. AWS Certified.",
    images: ["/pfp.webp"],
    creator: "@anlaharpanda",
  },
  icons: {
    icon: [
      { url: "/itsanla-logo.webp", type: "image/webp" },
      { url: "/itsanla-logo.webp", sizes: "32x32", type: "image/webp" },
      { url: "/itsanla-logo.webp", sizes: "16x16", type: "image/webp" },
    ],
    apple: [
      { url: "/itsanla-logo.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NLQ7D3LQ');
            `,
          }}
        />

        {/* Structured Data (JSON-LD) for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anla Harpanda",
              alternateName: ["Anla", "itsanla", "anla.id"],
              url: "https://anla.my.id",
              image: "https://anla.my.id/pfp.webp",
              jobTitle: "Full Stack Web Developer & UI/UX Designer",
              description: "Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, Vue.js, and React. Based in Padang, Indonesia.",
              sameAs: [
                "https://www.linkedin.com/in/anlaharpanda",
                "https://github.com/itsanla"
              ],
              knowsAbout: [
                "Full Stack Development",
                "UI/UX Design",
                "Express.js",
                "Next.js",
                "Laravel",
                "Vue.js",
                "React",
                "Cloud Computing",
                "Docker",
                "AWS"
              ],
              email: "anlaharpanda@gmail.com",
              worksFor: {
                "@type": "Organization",
                name: "Politeknik Negeri Padang"
              }
            })
          }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="icon" href="/itsanla-logo.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/itsanla-logo.webp" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />


      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.className}  antialiased min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLQ7D3LQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
