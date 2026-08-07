import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sessionwrapper from "@/components/Sessionwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Buy me a Coffee",
  description: "This website is for crowdfunding platform for creators to receive support from their fans and followers. It allows creators to set up a profile, share their work, and receive donations or subscriptions from their audience. The platform provides a way for creators to monetize their content and build a community of supporters who can contribute financially to their projects and endeavors.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Sessionwrapper>
          <Navbar/>
          <div className="min-h-[86.5vh] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_12%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
            {children}
          </div>
          <Footer/>
        </Sessionwrapper>
      </body>
    </html>
  );
}
