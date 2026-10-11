"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/src/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;
  const nameValue = name ?? user?.name ?? "";

  const firstLetter =
    user?.name?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "U";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = nameValue.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({ name: trimmedName });

      if (error) {
        toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      setName(null);
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

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
      <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <div>
          <div className="skeleton h-8 w-48" />
          <div className="skeleton mt-2 h-4 w-64" />
        </div>
        <div className="skeleton h-[120px] rounded-2xl" />
        <div className="skeleton h-[220px] rounded-2xl" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>
        <p className="text-sm text-[#1D271F]/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Account row */}
      <section className="flex flex-col gap-4 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6 sm:flex-row sm:items-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "প্রোফাইল"}
            width={80}
            height={80}
            unoptimized
            referrerPolicy="no-referrer"
            className="h-20 w-20 shrink-0 rounded-2xl bg-[#F0F5F0] object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#05893E]/10 text-3xl font-bold text-[#05893E]">
            {firstLetter}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-semibold text-[#1D271F]">
            {user.name || "ব্যবহারকারী"}
          </p>
          <p className="break-all text-base text-[#1D271F]/70">{user.email}</p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="h-10 shrink-0 rounded-lg border border-[#D03739] px-4 text-sm font-semibold text-[#D03739] transition hover:border-[#B02D2F] hover:bg-[#BD3133] hover:text-[#FFF6F5] disabled:opacity-60 sm:self-center"
        >
          {isSigningOut ? "সাইন আউট..." : "↩ সাইন আউট"}
        </button>
      </section>

      {/* Info / update */}
      <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
        <h2 className="text-lg font-semibold text-[#1D271F]">তথ্য</h2>

        <form onSubmit={handleUpdate} className="space-y-4 p-6">
          <div className="space-y-1">
            <label
              htmlFor="profile-name"
              className="text-sm font-medium text-[#1D271F]"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              maxLength={100}
              required
              className="h-10 w-full rounded-lg border border-[#1D271F]/20 bg-[#FAFCFA] px-3 text-sm text-[#1D271F] outline-none placeholder:text-[#1D271F]/50 focus:border-[#05893E]"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="h-10 w-full rounded-lg border border-[#047F39] bg-[#05893E] text-sm font-semibold text-[#F3FBF4] transition hover:bg-[#047C37] disabled:opacity-60"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ProfilePage;