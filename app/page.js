"use client";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import SplashCursor from "./utils/SplashCursor.js";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

/* ---------- tiny hand-drawn icons (same style as creator page) ---------- */
const CupIcon = ({ w = 48, h = 48 }) => (
  <svg width={w} height={h} viewBox="0 0 60 60" fill="none" aria-hidden="true">
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
);

const HeartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s-7-4.5-9.5-8.5C.5 9 2.5 5 6 5c2 0 3.5 1.2 4.5 2.5C11.5 6.2 13 5 15 5c3.5 0 5.5 4 3.5 7.5C19 16.5 12 21 12 21z"
      stroke="#c9a66b"
      strokeWidth="1.8"
      fill="rgba(201,166,107,0.12)"
    />
  </svg>
);

const CoinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#c9a66b" strokeWidth="1.8" fill="rgba(201,166,107,0.1)" />
    <path d="M12 7v10M9 9.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5-1.5 1.5-3 1.5-3 .5-3 1.5 1.5 1.5 3 1.5 3-.5 3-1.5" stroke="#f2ede3" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CollabIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="3" stroke="#c9a66b" strokeWidth="1.8" />
    <circle cx="16" cy="8" r="3" stroke="#c9a66b" strokeWidth="1.8" />
    <path d="M3 19c0-2.5 2.5-4.5 5-4.5s5 2 5 4.5M11 19c0-2.5 2.5-4.5 5-4.5s5 2 5 4.5" stroke="#f2ede3" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function Home() {
  return (
    <div className={`${inter.className} w-full bg-[#14201c] min-h-screen relative overflow-hidden`}>
      {/* faint chalk-dust texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(242,237,227,0.8) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* keep the fluid cursor if you like it */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE
        COLOR="#c9a66b"
      />

      {/* ───────── HERO ───────── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c2b25]/40 to-transparent pointer-events-none" />

        {/* steaming cup mark */}
        <div className="mb-6 opacity-90">
          <CupIcon w={72} h={72} />
        </div>

        <h1
          className={`${caveat.className} text-5xl md:text-7xl text-[#f2ede3] text-center leading-tight`}
        >
          Buy Me a Coffee
        </h1>

        <p className="mt-4 max-w-xl text-center text-[#f2ede3]/70 text-base md:text-lg leading-relaxed">
          A quiet little corner of the internet where fans can fuel creators —
          one espresso, latte or cappuccino at a time.
        </p>

        <p
          className={`${mono.className} mt-3 text-[11px] tracking-widest text-[#c9a66b]/80 uppercase`}
        >
          crowdfunding · open source · real support
        </p>

        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <Link
            href="/login"
            className={`${caveat.className} text-xl px-8 py-2.5 rounded-full bg-[#c9a66b] text-[#14201c] hover:bg-[#d9b988] transition-colors`}
          >
            Start Here
          </Link>
          <a
            href="#how"
            className={`${caveat.className} text-xl px-8 py-2.5 rounded-full border border-[#c9a66b]/60 text-[#f2ede3] hover:bg-[#c9a66b]/10 hover:border-[#c9a66b] transition-colors`}
          >
            How it works
          </a>
        </div>
      </section>

      {/* dashed divider */}
      <div className="flex justify-center px-8">
        <div className="w-full max-w-3xl border-t border-dashed border-[#f2ede3]/15" />
      </div>

      {/* ───────── THREE PILLARS ───────── */}
      <section id="how" className="px-4 py-16 md:py-20">
        <h2
          className={`${caveat.className} text-3xl md:text-4xl text-center text-[#f2ede3] mb-12`}
        >
          Your fans can buy you a coffee
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <HeartIcon />,
              title: "Fans want to help",
              body: "They already love what you make. Give them an easy, warm way to show it.",
            },
            {
              icon: <CoinIcon />,
              title: "Fans want to contribute",
              body: "A few rupees for a coffee adds up — and every receipt is a little thank-you note.",
            },
            {
              icon: <CollabIcon />,
              title: "Fans want to collaborate",
              body: "Support opens conversations. Many of the best projects start with a simple coffee.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-[#f2ede3]/10 bg-[#1c2b25] p-6 flex flex-col items-center text-center gap-3 hover:border-[#c9a66b]/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-full border border-dashed border-[#c9a66b]/50 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className={`${caveat.className} text-2xl text-[#f2ede3]`}>
                {card.title}
              </h3>
              <p className="text-sm text-[#f2ede3]/55 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* dashed divider */}
      <div className="flex justify-center px-8">
        <div className="w-full max-w-3xl border-t border-dashed border-[#f2ede3]/15" />
      </div>

      {/* ───────── HOW IT WORKS (steps) ───────── */}
      <section className="px-4 py-16 md:py-20">
        <h2
          className={`${caveat.className} text-3xl md:text-4xl text-center text-[#f2ede3] mb-4`}
        >
          Three simple steps
        </h2>
        <p className={`${mono.className} text-center text-[11px] tracking-widest text-[#c9a66b]/70 uppercase mb-12`}>
          from zero to first coffee in minutes
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              n: "01",
              title: "Create your page",
              body: "Sign up, pick a username, add a short bio and a profile picture. That’s it.",
            },
            {
              n: "02",
              title: "Share the link",
              body: "Drop it in your bio, newsletter, Discord, or anywhere your people hang out.",
            },
            {
              n: "03",
              title: "Receive support",
              body: "Fans choose a size or name their own amount. You get the money — and a nice note.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-5 items-start rounded-lg border border-[#f2ede3]/10 bg-[#1c2b25] p-5"
            >
              <span
                className={`${mono.className} text-[#c9a66b] text-lg shrink-0 mt-0.5`}
              >
                {step.n}
              </span>
              <div>
                <h3 className={`${caveat.className} text-xl text-[#f2ede3]`}>
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-[#f2ede3]/55 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* dashed divider */}
      <div className="flex justify-center px-8">
        <div className="w-full max-w-3xl border-t border-dashed border-[#f2ede3]/15" />
      </div>

      {/* ───────── LEARN MORE / VIDEO ───────── */}
      <section className="px-4 py-16 md:py-20 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <h2 className={`${caveat.className} text-3xl md:text-4xl text-[#f2ede3]`}>
            Learn more about us
          </h2>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/14018/14018778.png"
            alt=""
            width={40}
            height={40}
            className="opacity-80"
          />
        </div>

        <div className="w-full max-w-3xl rounded-lg overflow-hidden border border-[#f2ede3]/10 shadow-lg shadow-black/30">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/C8l-06LZgv4?si=dXAiGtlJLzhAWQ4f"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="px-4 pb-24 pt-8 flex flex-col items-center">
        <div className="w-full max-w-2xl rounded-lg border border-dashed border-[#c9a66b]/40 bg-[#1c2b25] p-8 md:p-10 text-center">
          <CupIcon w={56} h={56} />
          <h2 className={`${caveat.className} text-3xl md:text-4xl text-[#f2ede3] mt-4`}>
            Ready to open your café?
          </h2>
          <p className="mt-3 text-[#f2ede3]/60 text-sm md:text-base max-w-md mx-auto">
            Create a page in under a minute. Share it with the people who already
            care about your work.
          </p>
          <Link
            href="/login"
            className={`${caveat.className} inline-block mt-6 text-xl px-10 py-3 rounded-full bg-[#c9a66b] text-[#14201c] hover:bg-[#d9b988] transition-colors`}
          >
            Get started — it’s free
          </Link>
        </div>
      </section>
    </div>
  );
}