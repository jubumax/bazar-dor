"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { DiGithubBadge } from "react-icons/di";
import { authClient } from "@/src/lib/auth-client";

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("redirected") === "1") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-redirect" });
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে");
        } else {
          toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন");
        }

        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন");
    }
  };

    return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="signin-email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="signin-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="input w-full border-gray-300 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড"
                className="input w-full border-gray-300 bg-white pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-green-700"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full border-0 bg-green-800 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          className="btn w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          className="btn mt-3 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <DiGithubBadge className="text-xl" />
          GitHub দিয়ে চালিয়ে যান
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-800 hover:text-green-900"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-4 text-sm text-[#1D271F]/60 transition hover:text-[#1D271F]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignIn;
