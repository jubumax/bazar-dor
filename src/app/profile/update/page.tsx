"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";
import { authClient } from "@/src/lib/auth-client";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const nameValue = name ?? session?.user?.name ?? "";

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
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
        তথ্য আপডেট করুন
      </h1>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
      </p>

      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <FiUser className="text-green-700" size={20} />
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            ব্যক্তিগত তথ্য
          </h2>
        </div>

        {isPending ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-12 w-full" />
            <div className="skeleton h-11 w-40" />
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <label
              htmlFor="update-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              নাম
            </label>

            <input
              id="update-name"
              type="text"
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার সম্পূর্ণ নাম লিখুন"
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
              </button>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                বাতিল
              </Link>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default UpdateProfilePage;
