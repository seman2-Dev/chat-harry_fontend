import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

// Applied before hydration so the stored theme never flashes light-first.
// (Kept in sync with STORAGE_KEY in src/context/ThemeContext.jsx.)
const THEME_INIT_SCRIPT = `try{if(window.localStorage.getItem("studiospace-theme") === "dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudioSpace — Peer-to-Peer Creative Workspace Sharing",
  description:
    "Discover, book, and share professional creative studios — photo cyc walls, sound stages, podcast lounges, and music suites — by the hour.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // Theme class is applied pre-hydration by the inline script below.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
