"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const providers = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FBBC05" d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604A23.704 23.704 0 0 0 .214 24c0 3.737.867 7.261 2.407 10.388l7.905-6.051A14.31 14.31 0 0 1 9.827 24" />
        <path fill="#EB4335" d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.91 6.04C12.355 14.112 17.549 10.133 23.714 10.133" />
        <path fill="#34A853" d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.51l-7.909 6.038C6.445 42.156 14.427 47.467 23.714 47.467c5.732 0 11.204-2.035 15.311-5.849l-7.507-5.803c-2.118 1.334-4.786 2.052-7.804 2.052" />
        <path fill="#4285F4" d="M46.145 24c0-1.387-.214-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = "Login – Buy Me a Coffee";
    if (!session) return;
    if (session?.user?.profileUpdated) {
      router.push(`/${session.user.username}`);
    } else {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div
      className={`${inter.className} min-h-[calc(100vh-4rem)] bg-[#14201c] relative overflow-hidden flex flex-col items-center justify-center px-4 py-16`}
    >
      {/* chalk dust */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(242,237,227,0.8) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-dashed border-[#c9a66b]/50 mb-5">
            <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
              <path
                d="M12 20h30v20a15 15 0 0 1-15 15 15 15 0 0 1-15-15V20Z"
                stroke="#f2ede3"
                strokeWidth="2.5"
                fill="rgba(242,237,227,0.06)"
              />
              <path d="M42 24h5a7 7 0 0 1 0 14h-5" stroke="#f2ede3" strokeWidth="2.5" />
              <path
                d="M17 12c1 3-2 3-1 6M27 12c1 3-2 3-1 6M37 12c1 3-2 3-1 6"
                stroke="#c9a66b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className={`${caveat.className} text-4xl md:text-5xl text-[#f2ede3]`}>
            Welcome back
          </h1>
          <p className="mt-2 text-[#f2ede3]/55 text-sm">
            Sign in so your fans can buy you a coffee
          </p>
        </div>

        {/* card */}
        <div className="rounded-xl border border-[#f2ede3]/10 bg-[#1c2b25] p-6 md:p-8 space-y-3">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() =>
                signIn(p.id)
              }
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-[#f2ede3]/15 bg-[#14201c] px-5 py-3 text-sm text-[#f2ede3] hover:border-[#c9a66b]/50 hover:bg-[#c9a66b]/5 transition-colors cursor-pointer"
            >
              {p.icon}
              <span className="font-medium">{p.label}</span>
            </button>
          ))}

          <p
            className={`${mono.className} text-center text-[10px] tracking-wide text-[#f2ede3]/30 pt-3`}
          >
            by signing in you agree to keep the coffee flowing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;