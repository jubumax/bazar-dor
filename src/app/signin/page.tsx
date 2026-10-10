"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { DiGithub } from "react-icons/di";
import { authClient } from "@/src/lib/auth-client";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (error) {
      if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
        toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে");
      } else {
        toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন");
      }

      return;
    }

    if (data) {
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push("/");
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          আপনার <span className="font-bold">বাজার দর</span> অ্যাকাউন্টে প্রবেশ
          করুন।
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>

            <input
              type="email"
              name="email"
              placeholder="আপনার ইমেইল"
              className="input w-full border-gray-300 bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="আপনার পাসওয়ার্ড"
                className="input w-full border-gray-300 bg-white pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-green-700"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full border-0 bg-green-800 text-white hover:bg-green-700"
          >
            সাইন ইন
          </button>
        </form>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn mt-4 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          Google দিয়ে সাইন আপ করুন
        </button>
        <button
          type="button"
          onClick={handleGithubSignIn}
          className="btn mt-4 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <DiGithub className="text-xl" />
          Github দিয়ে সাইন আপ করুন
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-cyan-700 hover:text-cyan-900"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
