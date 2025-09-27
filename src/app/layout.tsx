import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confirme.AI",
  description: "Sistema de Gestão de Solicitações de Verificação",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Confirme.AI",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" />
          </NextThemesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
