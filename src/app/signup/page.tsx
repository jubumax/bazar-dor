"use client";

import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { DiGithub } from "react-icons/di";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি একই নয়");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (error) {
      if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        toast.error("এই ইমেইলে অ্যাকাউন্ট আছে");
      }

      return;
    }

    if (data) {
      redirect("/");
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
          সাইন আপ
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          নতুন <span className="font-bold">বাজার দর</span> অ্যাকাউন্ট তৈরি করুন
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              name="name"
              type="text"
              placeholder="আপনার নাম"
              className="input w-full border-gray-300 bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
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
                name="password"
                type={showPassword ? "text" : "password"}
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
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="input w-full border-gray-300 bg-white pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-green-700"
                aria-label={
                  showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
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
            className="btn w-full border-0 bg-green-800 text-white hover:bg-green-700"
          >
            সাইন আপ
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
