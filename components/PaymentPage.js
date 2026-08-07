"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import { initiate, getPaymentMessage } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const MIN_AMOUNT = 10;
// Set to a real fundraising target whenever you have one — purely visual.
const GOAL_AMOUNT = 10000;
const SUPPORTERS_PAGE_SIZE = 5;

const SIZES = [
  { key: "espresso", label: "Espresso", amount: 99, cupWidth: 34, cupHeight: 30 },
  { key: "latte", label: "Latte", amount: 199, cupWidth: 44, cupHeight: 42 },
  { key: "cappuccino", label: "Cappuccino", amount: 499, cupWidth: 54, cupHeight: 54 },
];

const random = ()=>{
  return Math.random();
}

// ---- tiny hand-drawn icon set (no icon library) ----
const CupIcon = ({ w, h }) => (
  <svg width={w} height={h} viewBox="0 0 60 60" fill="none" aria-hidden="true">
    <path
      d="M12 20h30v20a15 15 0 0 1-15 15 15 15 0 0 1-15-15V20Z"
      stroke="#f2ede3"
      strokeWidth="2.5"
      fill="rgba(242,237,227,0.06)"
    />
    <path d="M42 24h5a7 7 0 0 1 0 14h-5" stroke="#f2ede3" strokeWidth="2.5" />
    <path d="M17 12c1 3-2 3-1 6M27 12c1 3-2 3-1 6M37 12c1 3-2 3-1 6" stroke="#c9a66b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M4 16V5a1 1 0 0 1 1-1h11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MonogramBadge = ({ label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${caveat.className} w-9 h-9 rounded-full border border-dashed border-[#c9a66b]/60 flex items-center justify-center text-[15px] text-[#f2ede3] hover:bg-[#c9a66b]/10 hover:border-[#c9a66b] transition-colors`}
  >
    {label}
  </a>
);

const PaymentPage = ({ user }) => {
  const router = useRouter();
  const a = useParams();
  const searchParams = useSearchParams();

  const [followers, setFollowers] = useState(9719);
  const [follow, setfollow] = useState(false);
  const [message, setMessage] = useState([]);
  const [paymentform, setPaymentform] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(SUPPORTERS_PAGE_SIZE);
  const [showConfetti, setShowConfetti] = useState(false);

  const ref = useRef();
  const MESSAGE_MAX_LEN = 140;

  useEffect(() => {
    async function fetchData() {
      let a = await getPaymentMessage(user.username);
      return JSON.parse(a);
    }
    fetchData().then((b) => setMessage(b));
  }, []);

  useEffect(() => {
    async function paymentDone(){
        if (searchParams.get("paymentDone") == "true") {
          toast.success("Payment done! ☕", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2200);
          router.push(`/${decodeURIComponent(user.username)}`);
      }
    }
    paymentDone();
  }, [searchParams]);

  const totalRaised = useMemo(
    () => message.reduce((sum, m) => sum + (Number(m.amount) || 0), 0),
    [message]
  );
  const supporterCount = message.length;
  const avgSupport = supporterCount ? Math.round(totalRaised / supporterCount) : 0;
  const goalPct = Math.min(100, Math.round((totalRaised / GOAL_AMOUNT) * 100));

  const topSupporter = useMemo(() => {
    if (!message.length) return null;
    return message.reduce((top, m) =>
      Number(m.amount) > Number(top.amount) ? m : top
    , message[0]);
  }, [message]);

  const visibleSupporters = message.slice(0, visibleCount);
  const hasMoreSupporters = visibleCount < message.length;

  const handleSize = (size) => {
    ref.current.value = `${size.amount}`;
    setSelectedSize(size.key);
    setPaymentform({ ...paymentform, amount: String(size.amount) });
  };

  const handleChange = (e) => {
    if (e.target.name === "amount") setSelectedSize(null);
    if (e.target.name === "message" && e.target.value.length > MESSAGE_MAX_LEN) return;
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const amountTooLow =
    paymentform.amount !== undefined &&
    paymentform.amount !== "" &&
    Number(paymentform.amount) < MIN_AMOUNT;

  const pay = async (amount) => {
    try {
      setIsPaying(true);
      let b = await initiate(amount, a.username, paymentform);
      let orderId = b.id;
      var options = {
        key: user.razorpay_creator_id,
        amount: amount,
        currency: "INR",
        name: "Buy me a Coffee",
        description: "Test Transaction",
        image:
          "https://play-lh.googleusercontent.com/aMb_Qiolzkq8OxtQZ3Af2j8Zsp-ZZcNetR9O4xSjxH94gMA5c5gpRVbpg-3f_0L7vlo",
        order_id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "+919876543210",
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
        modal: { ondismiss: () => setIsPaying(false) },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", () => setIsPaying(false));
      rzp1.open();
    } catch (err) {
      setIsPaying(false);
      toast.error("Couldn't start the payment. Try again.");
    }
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support @${user.username}`,
          text: `Buy @${user.username} a coffee!`,
          url: pageUrl,
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className={`${inter.className} w-full bg-[#14201c] min-h-screen relative overflow-hidden`}>
        {/* faint chalk dust texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(242,237,227,0.8) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {showConfetti && (
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="bean"
                style={{
                  left: `${random() * 100}%`,
                  animationDelay: `${random() * 0.6}s`,
                  animationDuration: `${1.6 + random() * 0.8}s`,
                }}
              >
                ☕
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <Image
            loading="eager"
            src={user.coverpic || "/batmobile.jpeg"}
            className="object-cover w-full md:h-[380px] h-[200px] opacity-30"
            alt="img"
            width={400}
            height={350}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14201c]" />
        </div>

        <div className="flex flex-col gap-1 justify-center items-center px-4">
          <div className="relative -mt-10 z-10">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#c9a66b]/70 -m-1.5" />
            <Image
              loading="eager"
              src={user.profilepic || "/profile.png"}
              alt=""
              width={80}
              height={80}
              className="bg-black rounded-full"
            />
          </div>
          <h1 className={`${caveat.className} text-3xl text-[#f2ede3] mt-2`}>
            @{decodeURIComponent(user.username)}
          </h1>
          <p className="text-center text-[#f2ede3]/50 text-sm">
            {followers.toLocaleString()} followers ⋅ 1234 following ⋅ 5678 posts
          </p>

          {/* chalk placard bio */}
          <div className="w-[90%] md:w-[60%] mt-4 border border-[#f2ede3]/15 rounded-lg p-5 bg-[#1c2b25]">
            <p className="text-center text-[#f2ede3]/70 leading-relaxed">
              Hi, I&apos;m{" "}
              <span className={`${caveat.className} text-xl text-[#c9a66b]`}>
                {decodeURIComponent(user.name).toUpperCase()}
              </span>
              , a developer who loves building useful things, exploring new
              tech, and sharing what I learn. Every coffee buys me a bit more
              time for open-source and side projects.
            </p>
          </div>

          <div className="flex gap-3 mt-4 mb-1">
            <MonogramBadge label="gh" href="https://github.com/kartik9807/" />
            <MonogramBadge label="x" href="https://twitter.com/" />
            <MonogramBadge label="in" href="https://linkedin.com/" />
            <MonogramBadge label="ig" href="https://instagram.com/" />
          </div>

          <div className="flex gap-3 m-3 justify-center items-center flex-wrap">
            <button
              className={`${caveat.className} text-lg p-2 px-6 rounded-full border border-[#c9a66b] text-[#f2ede3] hover:bg-[#c9a66b]/10 transition-colors cursor-pointer`}
              onClick={() => {
                if (!follow) {
                  setfollow(true);
                  setFollowers(followers + 1);
                } else {
                  setfollow(false);
                  setFollowers(followers - 1);
                }
              }}
            >
              {follow ? "Unfollow" : "Follow"} me
            </button>
            <button
              onClick={copyLink}
              className="p-2 px-4 rounded-full border border-[#f2ede3]/20 text-[#f2ede3]/80 hover:border-[#f2ede3]/50 transition-colors cursor-pointer flex items-center gap-2 text-sm"
            >
              <CopyIcon /> Copy link
            </button>
            <button
              onClick={nativeShare}
              className="p-2 px-4 rounded-full border border-[#f2ede3]/20 text-[#f2ede3]/80 hover:border-[#f2ede3]/50 transition-colors cursor-pointer flex items-center gap-2 text-sm"
            >
              <ShareIcon /> Share
            </button>
          </div>

          {/* stats chips */}
          <div className={`${mono.className} flex flex-wrap justify-center gap-3 mt-5`}>
            <div className="border border-[#f2ede3]/15 rounded px-4 py-2 text-center">
              <p className="text-[#c9a66b] text-lg">₹{totalRaised.toLocaleString()}</p>
              <p className="text-[#f2ede3]/40 text-[11px] tracking-wide">RAISED</p>
            </div>
            <div className="border border-[#f2ede3]/15 rounded px-4 py-2 text-center">
              <p className="text-[#c9a66b] text-lg">{supporterCount}</p>
              <p className="text-[#f2ede3]/40 text-[11px] tracking-wide">SUPPORTERS</p>
            </div>
            <div className="border border-[#f2ede3]/15 rounded px-4 py-2 text-center">
              <p className="text-[#c9a66b] text-lg">₹{avgSupport.toLocaleString()}</p>
              <p className="text-[#f2ede3]/40 text-[11px] tracking-wide">AVG</p>
            </div>
          </div>

          {/* coffee jar goal tracker */}
          <div className="flex flex-col items-center mt-6 mb-4">
            <div className="relative w-[70px] h-[140px] rounded-t-md rounded-b-[28px] border-2 border-[#f2ede3]/25 overflow-hidden bg-[#0f1815]">
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-700"
                style={{
                  height: `${goalPct}%`,
                  background: "linear-gradient(180deg, #d9b988 0%, #7a5230 100%)",
                }}
              >
                <div className="h-1.5 w-full bg-[#f2ede3]/50" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#f2ede3]/10" />
            </div>
            <p className={`${caveat.className} text-lg text-[#f2ede3] mt-2`}>
              {goalPct}% to the coffee fund goal
            </p>
            <p className={`${mono.className} text-xs text-[#f2ede3]/40`}>
              ₹{totalRaised.toLocaleString()} / ₹{GOAL_AMOUNT.toLocaleString()}
            </p>
          </div>
        </div>

        {/* menu board + receipts */}
        <div className="relative md:w-[80%] flex flex-col w-full md:flex-row gap-5 mx-auto mb-10 items-start px-4">
          {/* supporters as receipt tickets */}
          <div className="rounded-lg md:w-1/2 w-full bg-[#1c2b25] border border-[#f2ede3]/10 p-4">
            <h2 className={`${caveat.className} text-2xl text-center text-[#f2ede3] mb-4`}>
              Receipts from supporters
            </h2>
            {topSupporter && (
              <p className={`${mono.className} text-center text-[10px] text-[#c9a66b] mb-3 tracking-wide`}>
                ★ TOP SUPPORTER: {topSupporter.name.toUpperCase()} — ₹{topSupporter.amount}
              </p>
            )}
            <div className="h-80 overflow-auto [&::-webkit-scrollbar]:w-1.5 space-y-4 pr-1">
              {message.length === 0 && (
                <p className="text-center text-[#f2ede3]/40 py-8">No supporters yet 😥</p>
              )}
              {visibleSupporters.map((m) => (
                <div key={m._id} className="receipt relative bg-[#f2ede3] text-[#14201c] px-4 pt-3 pb-4 mx-2">
                  <p className={`${mono.className} text-[11px] flex justify-between opacity-60`}>
                    <span>ORDER #{String(m._id).slice(-4).toUpperCase()}</span>
                    <span>{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ""}</span>
                  </p>
                  <p className={`${mono.className} text-sm mt-2 font-semibold`}>{m.name}</p>
                  <p className={`${mono.className} text-xs mt-1 italic opacity-80`}>
                    &ldquo;{m.message}&rdquo;
                  </p>
                  <div className="flex justify-between items-end mt-3 border-t border-dashed border-[#14201c]/30 pt-2">
                    <span className={`${mono.className} text-[11px] opacity-60`}>TOTAL</span>
                    <span className={`${mono.className} text-lg font-bold`}>₹{m.amount}</span>
                  </div>
                  <span className="stamp">PAID</span>
                </div>
              ))}
            </div>
            {hasMoreSupporters && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => setVisibleCount((c) => c + SUPPORTERS_PAGE_SIZE)}
                  className={`${caveat.className} text-lg text-[#f2ede3] border border-dashed border-[#f2ede3]/30 hover:border-[#c9a66b] rounded-full px-4 py-1 cursor-pointer transition-colors`}
                >
                  more receipts, please
                </button>
              </div>
            )}
          </div>

          {/* order slip */}
          <div className="rounded-lg md:w-1/2 w-full bg-[#1c2b25] border border-[#f2ede3]/10 p-4">
            <h2 className={`${caveat.className} text-2xl text-center text-[#f2ede3] mb-1`}>
              Place your order
            </h2>
            <p className="text-center text-[#f2ede3]/40 text-xs mb-4">pick a size, or name your own</p>

            <div className="flex justify-around items-end mb-5">
              {SIZES.map((size) => (
                <button
                  key={size.key}
                  onClick={() => handleSize(size)}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div
                    className={`rounded-md p-2 transition-all ${
                      selectedSize === size.key
                        ? "bg-[#c9a66b]/20 ring-1 ring-[#c9a66b]"
                        : "group-hover:bg-[#f2ede3]/5"
                    }`}
                  >
                    <CupIcon w={size.cupWidth} h={size.cupHeight} />
                  </div>
                  <span className={`${caveat.className} text-[#f2ede3] text-lg leading-none`}>
                    {size.label}
                  </span>
                  <span className={`${mono.className} text-[#c9a66b] text-xs`}>₹{size.amount}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <input
                required
                type="text"
                name="name"
                value={paymentform.name || ""}
                onChange={handleChange}
                placeholder="Your name"
                className={`${inter.className} border border-[#f2ede3]/15 bg-[#14201c] p-2 rounded-md text-[#f2ede3] placeholder:text-[#f2ede3]/30`}
              />

              <div className="relative">
                <span className={`${mono.className} absolute left-3 top-1/2 -translate-y-1/2 text-[#f2ede3]/40`}>
                  ₹
                </span>
                <input
                  required
                  type="number"
                  min={MIN_AMOUNT}
                  name="amount"
                  onChange={handleChange}
                  value={paymentform.amount || ""}
                  ref={ref}
                  placeholder="Name your own amount"
                  className={`${mono.className} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-[#f2ede3]/15 bg-[#14201c] p-2 pl-7 rounded-md text-[#f2ede3] placeholder:text-[#f2ede3]/30 w-full`}
                />
              </div>
              {amountTooLow && (
                <p className="text-[#b3453a] text-xs -mt-2">Minimum amount is ₹{MIN_AMOUNT}</p>
              )}

              <div>
                <input
                  required
                  type="text"
                  value={paymentform.message || ""}
                  onChange={handleChange}
                  name="message"
                  placeholder="Say something nice"
                  className={`${inter.className} border border-[#f2ede3]/15 bg-[#14201c] p-2 rounded-md text-[#f2ede3] placeholder:text-[#f2ede3]/30 w-full`}
                />
                <p className={`${mono.className} text-right text-[10px] text-[#f2ede3]/30 mt-1`}>
                  {(paymentform.message || "").length}/{MESSAGE_MAX_LEN}
                </p>
              </div>

              <button
                type="button"
                disabled={
                  !paymentform.name ||
                  !paymentform.amount ||
                  !paymentform.message ||
                  amountTooLow ||
                  isPaying
                }
                className={`${caveat.className} text-xl rounded-md bg-[#c9a66b] text-[#14201c] px-6 py-2 text-center transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 flex items-center justify-center gap-2`}
                onClick={() => pay(paymentform.amount * 100)}
              >
                {isPaying && <span className="spinner" />}
                {isPaying ? "Brewing checkout…" : "Buy the coffee"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .receipt {
          clip-path: polygon(
            0% 4px, 4% 0%, 8% 4px, 12% 0%, 16% 4px, 20% 0%, 24% 4px, 28% 0%,
            32% 4px, 36% 0%, 40% 4px, 44% 0%, 48% 4px, 52% 0%, 56% 4px, 60% 0%,
            64% 4px, 68% 0%, 72% 4px, 76% 0%, 80% 4px, 84% 0%, 88% 4px, 92% 0%,
            96% 4px, 100% 0%,
            100% 100%, 0% 100%
          );
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        }
        .stamp {
          position: absolute;
          top: 10px;
          right: 14px;
          font-family: ${mono.style.fontFamily};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #b3453a;
          border: 2px solid #b3453a;
          border-radius: 4px;
          padding: 1px 6px;
          transform: rotate(-12deg);
          opacity: 0.75;
          mix-blend-mode: multiply;
        }
        .bean {
          position: absolute;
          top: -40px;
          font-size: 20px;
          animation-name: fall;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.2;
          }
        }
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(20, 32, 28, 0.3);
          border-top-color: #14201c;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default PaymentPage;