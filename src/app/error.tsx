"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-black text-slate-900">
          কিছু একটা সমস্যা হয়েছে
        </h1>

        <p className="mt-3 text-slate-500">
          Data load করা যায়নি। আবার চেষ্টা করুন।
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn btn-success text-white"
          >
            আবার চেষ্টা করুন
          </button>

          <Link href="/" className="btn btn-outline">
            হোম
          </Link>
        </div>
      </div>
    </main>
  );
}
