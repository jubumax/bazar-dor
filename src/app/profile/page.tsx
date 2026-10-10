"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import { authClient } from "@/src/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const firstLetter =
    user?.name?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "U";

  const handleSignOut = async () => {
    setIsSigningOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setIsSigningOut(false);
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.replace("/signin");
    router.refresh();
  };

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton mt-3 h-4 w-64" />
        <div className="skeleton mt-7 h-28 rounded-2xl" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-800">আমার প্রোফাইল</h1>
        <p className="mt-2 text-sm text-slate-500">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>
        <Link
          href="/signin"
          className="btn mt-5 border-0 bg-green-700 text-white hover:bg-green-800"
        >
          সাইন ইন
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল"}
                width={64}
                height={64}
                unoptimized
                referrerPolicy="no-referrer"
                className="h-14 w-14 shrink-0 rounded-full border-2 border-green-100 object-cover sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-green-100 bg-green-50 text-xl font-bold text-green-700 sm:h-16 sm:w-16">
                {firstLetter}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:shrink-0">
            {/* C3: goes to a separate route with the update form */}
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              <FiEdit2 size={16} />
              <span>তথ্য আপডেট করুন</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiLogOut size={16} />
              <span>{isSigningOut ? "সাইন আউট..." : "সাইন আউট"}</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
