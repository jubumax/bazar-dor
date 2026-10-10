import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-6xl" aria-hidden="true">
          🛒
        </p>

        <p className="mt-3 text-6xl font-black text-green-700">৪০৪</p>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি নেই, অথবা লিংকটি ভুল।
        </p>

        <Link
          href="/"
          className="btn mt-7 border-0 bg-[#05893E] text-white shadow-md hover:bg-[#047A36]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
