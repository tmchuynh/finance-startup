import BackToTop from "@/components/button/BackToTop";
import DynamicBreadcrumb from "@/components/navigation/dynamic-breadcrumb";
import Footer from "@/components/navigation/Footer";
import NavBar from "@/components/navigation/NavBar";
import { Providers } from "@/context/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex flex-col min-h-screen">
        <SpeedInsights />
        <Analytics />
        <Providers>
          <main className="flex-grow pb-24 md:pb-0">
            <NavBar />
            <DynamicBreadcrumb />
            {children}
            <BackToTop />
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
