"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { DiGithub } from "react-icons/di";
import { authClient } from "@/src/lib/auth-client";

const MIN_PASSWORD_LENGTH = 8;

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি একই নয়");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        if (error.code?.startsWith("USER_ALREADY_EXISTS")) {
          toast.error("এই ইমেইলে আগে থেকেই অ্যাকাউন্ট আছে");
        } else if (error.code === "PASSWORD_TOO_SHORT") {
          toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
        } else {
          toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন");
        }

        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন");
      router.push("/signin");
    } catch {
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন");
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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          সাইন আপ
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          নতুন <span className="font-bold">বাজার দর</span> অ্যাকাউন্ট তৈরি করুন
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="আপনার নাম"
              className="input w-full border-gray-300 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="আপনার ইমেইল"
              className="input w-full border-gray-300 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
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

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="input w-full border-gray-300 bg-white pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-green-700"
                aria-label={
                  showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full border-0 bg-green-800 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          className="btn w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          Google দিয়ে সাইন আপ করুন
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          className="btn mt-3 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <DiGithub className="text-xl" />
          GitHub দিয়ে সাইন আপ করুন
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-800 hover:text-green-900"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
