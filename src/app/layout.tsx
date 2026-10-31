import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://brilian-porto.vercel.app";
const siteDescription =
  "Portfolio of a Full-Stack Developer & UI/UX Designer from UGM.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brilian Fatih Wicaksono — Full-Stack Developer & UI/UX Designer",
  description: siteDescription,
  openGraph: {
    title: "Brilian Fatih Wicaksono — Full-Stack Developer & UI/UX Designer",
    description: siteDescription,
    url: siteUrl,
    siteName: "Brilian Fatih Wicaksono",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brilian Fatih Wicaksono — Full-Stack Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brilian Fatih Wicaksono — Full-Stack Developer & UI/UX Designer",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brilian Fatih Wicaksono",
  url: siteUrl,
  image: `${siteUrl}/foto.jpg`,
  description: siteDescription,
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Gadjah Mada",
  },
  sameAs: ["https://github.com/brilianfatihwicaksono2005-code"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
