import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ThemePanel } from "@/components/theme/ThemePanel";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "900"], variable: "--font-poppins", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "mitienda · Tienda online",
    template: "%s · mitienda",
  },
  description:
    "Tienda online con envío gratis a todo el país y hasta 6 cuotas sin interés.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} ${grotesk.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <LocaleProvider>
          <AuthProvider>
            <ThemeProvider>
              <CartProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <ThemePanel />
              </CartProvider>
            </ThemeProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
