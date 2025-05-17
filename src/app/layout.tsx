import BackToTop from "@/components/button/BackToTop";
import DynamicBreadcrumb from "@/components/navigation/dynamic-breadcrumb";
import Footer from "@/components/navigation/Footer";
import { Providers } from "@/context/providers";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex flex-col min-h-screen">
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
