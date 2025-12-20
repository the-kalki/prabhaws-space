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

export const metadata: Metadata = {
  title: "Prabhaw's Space | Creative Personal Hub",
  description: "Welcome to Prabhaw's Space. A centralized digital hub connecting you to my work, social profiles, and creative projects. Explore my digital universe.",
  keywords: ["Prabhaw", "Personal Website", "Portfolio", "Developer", "Digital Hub", "Creative Space", "Social Links"],
  authors: [{ name: "Prabhaw" }],
  openGraph: {
    title: "Prabhaw's Space | Creative Personal Hub",
    description: "Connect with Prabhaw. A centralized hub for my projects and social presence.",
    type: "website",
    locale: "en_US",
    siteName: "Prabhaw's Space",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhaw's Space",
    description: "Connect with Prabhaw. A centralized hub for my projects and social presence.",
    creator: "@prabhaw_kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
