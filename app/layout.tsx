import type { Metadata } from "next";
import { Source_Serif_4, Noto_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Headlines — Source Serif 4 (display weights)
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// Body copy — Noto Sans
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Pills / tags / mono labels — IBM Plex Mono
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcilla.app"),
  title: "Arcilla",
  description:
    "Join the waitlist and get early access before we open to everyone.",
  openGraph: {
    title: "Arcilla",
    description:
      "Join the waitlist and get early access before we open to everyone.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arcilla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${notoSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
