
import { EB_Garamond } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper"
import Head from "next/head";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Store App",
  description: "A modern Blog - Store e-commerce web application with blog, e-commerce, and video features",
 icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <body className={ebGaramond.className} cz-shortcut-listen="true">
        <SessionWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              {/* <Header /> */}
              <main className="flex-1">{children}</main>
              <Toaster />
              {/* <Footer /> */}
            </div>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}