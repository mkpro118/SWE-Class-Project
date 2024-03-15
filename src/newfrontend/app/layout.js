import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import SideNav from "@/components/sidenav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import PageWrapper from "@/components/page-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex bg-indigo-300">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header/>
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}