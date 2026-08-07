"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userProfile } from "@/actions/useractions.js";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const inputClass =
  "w-full border border-[#f2ede3]/15 bg-[#14201c] rounded-lg p-3 text-[#f2ede3] placeholder:text-[#f2ede3]/30 focus:outline-none focus:border-[#c9a66b]/60 transition-colors";

const labelClass = "block mb-1.5 text-sm text-[#f2ede3]/60";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    profilePic: "",
    coverPic: "",
    twitter: "",
    github: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const user = await userProfile(form, session.user.email);
    router.push(`/${user.username}`);
  };

  return (
    <div
      className={`${inter.className} min-h-[calc(100vh-4rem)] bg-[#14201c] relative overflow-hidden py-12 px-4`}
    >
      {/* chalk dust */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(242,237,227,0.8) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative max-w-2xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className={`${caveat.className} text-4xl md:text-5xl text-[#f2ede3]`}>
            Creator Dashboard
          </h1>
          <p className="mt-2 text-[#f2ede3]/50 text-sm">
            Customize your public page and payment settings
          </p>
        </div>

        <form
          onSubmit={handleForm}
          className="rounded-xl border border-[#f2ede3]/10 bg-[#1c2b25] p-6 md:p-8 space-y-6"
        >
          {/* live preview chip */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-[#c9a66b]/30 bg-[#14201c]/60">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#c9a66b]/50 -m-1" />
              <Image
                src={form.profilePic || "/default.svg"}
                alt=""
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover bg-black"
              />
            </div>
            <div>
              <p className={`${caveat.className} text-xl text-[#f2ede3]`}>
                {form.name || session?.user?.name || "Your Name"}
              </p>
              <p className={`${mono.className} text-xs text-[#c9a66b]`}>
                @{form.username || "username"}
              </p>
            </div>
          </div>

          {/* name + username */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="johndoe"
                className={inputClass}
              />
            </div>
          </div>

          {/* bio */}
          <div>
            <label className={labelClass}>Bio</label>
            <textarea
              rows={4}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell your supporters about yourself…"
              maxLength={200}
              className={`${inputClass} resize-none`}
            />
            <p className={`${mono.className} text-right text-[10px] text-[#f2ede3]/30 mt-1`}>
              {form.bio.length}/200
            </p>
          </div>

          {/* images */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Profile Picture URL</label>
              <input
                type="text"
                name="profilePic"
                value={form.profilePic}
                onChange={handleChange}
                placeholder="https://…"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cover Picture URL</label>
              <input
                type="text"
                name="coverPic"
                value={form.coverPic}
                onChange={handleChange}
                placeholder="https://…"
                className={inputClass}
              />
            </div>
          </div>

          {/* socials */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Twitter / X</label>
              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="https://x.com/…"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GitHub</label>
              <input
                type="text"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/…"
                className={inputClass}
              />
            </div>
          </div>

          {/* razorpay */}
          <div className="space-y-4 pt-2">
            <p className={`${mono.className} text-[11px] tracking-widest text-[#c9a66b]/70 uppercase`}>
              Payment credentials
            </p>
            <div>
              <label className={labelClass}>Razorpay Key ID</label>
              <input
                type="text"
                name="razorpayId"
                value={form.razorpayId}
                onChange={handleChange}
                placeholder="rzp_live_…"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Razorpay Key Secret</label>
              <input
                type="password"
                name="razorpaySecret"
                value={form.razorpaySecret}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            className={`${caveat.className} w-full text-xl py-3 rounded-lg bg-[#c9a66b] text-[#14201c] hover:bg-[#d9b988] transition-colors cursor-pointer`}
          >
            Save & open my page
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;