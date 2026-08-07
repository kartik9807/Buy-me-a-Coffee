"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showdown, setShowdown] = useState(false);
  const [username, setUsername] = useState("");
  const [suggestion, setSuggestion] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    router.push(`/${username.trim()}`);
    setTimeout(() => setUsername(""), 500);
  };
  useEffect(() => {

    const timer = setTimeout(async () => {

        if(username===""){
            setSuggestion([]);
            return;
        }

        const res = await fetch(`/api/search?q=${username}`);

        const data = await res.json();

        setSuggestion(data);

    },300);

    return ()=>clearTimeout(timer);

},[username]);
  return (
    <nav
      className={`${inter.className} sticky top-0 z-50 w-full bg-[#14201c]/95 backdrop-blur-sm border-b border-[#f2ede3]/10`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="https://play-lh.googleusercontent.com/aMb_Qiolzkq8OxtQZ3Af2j8Zsp-ZZcNetR9O4xSjxH94gMA5c5gpRVbpg-3f_0L7vlo"
            width={34}
            height={34}
            alt="logo"
            className="rounded-full border border-[#c9a66b]/40 group-hover:border-[#c9a66b] transition-colors"
          />
          <span
            className={`${caveat.className} hidden sm:block text-2xl text-[#f2ede3] group-hover:text-[#c9a66b] transition-colors`}
          >
            Buy Me a Coffee
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowdown(!showdown)}
                onBlur={() => setTimeout(() => setShowdown(false), 250)}
                className={`${caveat.className} flex items-center gap-1.5 text-lg px-4 py-1.5 rounded-full border border-[#c9a66b]/50 text-[#f2ede3] hover:bg-[#c9a66b]/10 hover:border-[#c9a66b] transition-colors cursor-pointer`}
              >
                {session.user.name?.split(" ")[0] || "You"}
                <svg
                  className={`w-4 h-4 transition-transform ${showdown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {showdown && (
                <div className="absolute right-0 top-11 w-44 rounded-lg border border-[#f2ede3]/15 bg-[#1c2b25] shadow-xl overflow-hidden z-50">
                  <ul className="py-1 text-sm text-[#f2ede3]/80">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2.5 hover:bg-[#c9a66b]/10 hover:text-[#c9a66b] transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${session.user.username}`}
                        className="block px-4 py-2.5 hover:bg-[#c9a66b]/10 hover:text-[#c9a66b] transition-colors"
                      >
                        Your Page
                      </Link>
                    </li>
                    <li className="border-t border-[#f2ede3]/10">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#c9a66b]/10 hover:text-[#c9a66b] transition-colors cursor-pointer"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="hidden sm:block">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="find a creator…"
                  className={`${mono.className} bg-[#0f1815] border border-[#f2ede3]/15 text-[#f2ede3] placeholder:text-[#f2ede3]/30 text-sm rounded-full px-4 py-1.5 w-40 md:w-48 focus:outline-none focus:border-[#c9a66b]/60 transition-colors`}
                />
              </form>
              {
                suggestion.length > 0 &&(
                    <div className="absolute w-80 text-white bg-slate-800 rounded-lg mt-40">
                    {
                      suggestion.map((user)=>(
                          <Link href={`/${user.username}`} onClick={()=>{setTimeout(() => setUsername(""), 500)}} key={user.username}>
                          <div className="flex items-center gap-3 p-3 hover:bg-slate-700">
                              <Image
                                  src={user?.profilepic || "https://play-lh.googleusercontent.com/aMb_Qiolzkq8OxtQZ3Af2j8Zsp-ZZcNetR9O4xSjxH94gMA5c5gpRVbpg-3f_0L7vlo"}
                                  width={40}
                                  height={40}
                                  alt=""
                                  className="rounded-full"
                              />
                            <div>
                              <h1>{user?.username || "username"}</h1>
                              <p>{user?.name || "User"}</p>
                            </div>  

                          </div>
                          </Link>
                      ))
                      }
                  </div>
                  )
              } 
              <Link
                href="/login"
                className={`${caveat.className} text-lg px-5 py-1.5 rounded-full bg-[#c9a66b] text-[#14201c] hover:bg-[#d9b988] transition-colors`}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;