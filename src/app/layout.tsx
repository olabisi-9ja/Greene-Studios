import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Greene Studios — Digital Design & Development Agency",
    template: "%s | Greene Studios",
  },
  description:
    "Greene Studios is a premium digital design and development agency. We craft world-class websites, brands, and digital products that move people.",
  keywords: [
    "web design agency",
    "UI/UX design",
    "branding agency",
    "frontend development",
    "design studio",
    "Greene Studios",
  ],
  authors: [{ name: "Greene Studios" }],
  creator: "Greene Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greenestudios.co",
    siteName: "Greene Studios",
    title: "Greene Studios — Digital Design & Development Agency",
    description:
      "Premium digital design and development agency. Websites, brands, and products that move people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greene Studios — Digital Design & Development Agency",
    description: "Premium digital design and development agency.",
    creator: "@greenestudios",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
