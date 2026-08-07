import React from "react";
import Link from "next/link";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  return (
    <footer
      className={`${inter.className} w-full bg-[#0f1815] border-t border-[#f2ede3]/10`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className={`${caveat.className} text-xl text-[#f2ede3]`}>
            Buy Me a Coffee
          </span>
          <p className={`${mono.className} text-[11px] text-[#f2ede3]/40 tracking-wide`}>
            fuel creators · one cup at a time
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-[#f2ede3]/50">
          <Link href="/" className="hover:text-[#c9a66b] transition-colors">
            Home
          </Link>
          <Link href="/login" className="hover:text-[#c9a66b] transition-colors">
            Login
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c9a66b] transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Copyright */}
        <p className={`${mono.className} text-[11px] text-[#f2ede3]/35`}>
          © {new Date().getFullYear()} Buy Me a Coffee · All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;