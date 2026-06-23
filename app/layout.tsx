import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import CookieBanner from "./components/CookieBanner";
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
  title: "Pro Loco Pescina",
  description: "Sito ufficiale Pro Loco Pescina",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={styles.html}
      suppressHydrationWarning
    >
      <body style={styles.body}>
        <Header />
        <main style={styles.main}>{children}</main>
        <CookieBanner />
      </body>
    </html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  html: {
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    color: "#3a352d",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    paddingTop: 90, 
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    flexGrow: 1,
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    boxShadow: "0 0 50px rgba(45, 74, 62, 0.03)",
  },
};