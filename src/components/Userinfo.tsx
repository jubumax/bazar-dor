"use client";

import { authClient } from "@/src/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";

const Userinfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;
  console.log("User image:", user?.image);
  const firstLetter =
    user?.name?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100 sm:h-10 sm:w-28" />
    );
  }

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex max-w-[200px] items-center gap-2 rounded-xl border border-transparent bg-white p-1.5 pr-2.5 transition-all duration-200 hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm active:scale-[0.98] sm:max-w-[240px] sm:gap-3 sm:pr-3"
            aria-expanded={isOpen}
            aria-label="প্রোফাইল মেনু"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={32}
                height={32}
                unoptimized
                referrerPolicy="no-referrer"
                className="h-8 w-8 shrink-0 rounded-full border-2 border-green-200 object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-sm font-bold text-white">
                {firstLetter}
              </span>
            )}
            <span className="max-w-[100px] truncate text-xs font-semibold text-slate-700 sm:max-w-[160px] sm:text-sm">
              {user.name?.trim().split(/\s+/)[0]}
            </span>

            <FiChevronDown
              size={16}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="মেনু বন্ধ করুন"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div className="absolute right-0 top-full z-50 mt-1.5 w-44 max-w-[calc(100vw-1rem)] overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/10 sm:mt-2 sm:w-52 sm:rounded-xl sm:p-1.5">
                {/* User Information */}
                <div className="px-2 py-1.5 sm:px-2.5 sm:py-2">
                  <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm">
                    {user.name}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-xs">
                    {user.email}
                  </p>
                </div>

                <div className="my-0.5 border-t border-slate-100 sm:my-1" />

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-green-50 hover:text-[#05893E] sm:gap-2.5 sm:rounded-lg sm:px-2.5 sm:py-2 sm:text-sm"
                >
                  <FiUser size={14} className="shrink-0 sm:hidden" />
                  <FiUser size={16} className="hidden shrink-0 sm:block" />
                  প্রোফাইল
                </Link>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 sm:gap-2.5 sm:rounded-lg sm:px-2.5 sm:py-2 sm:text-sm"
                >
                  <FiLogOut size={14} className="shrink-0 sm:hidden" />
                  <FiLogOut size={16} className="hidden shrink-0 sm:block" />
                  সাইন আউট
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-semibold text-green-800 shadow-sm transition-all duration-200 hover:border-green-600 hover:bg-green-50 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-[#05893E] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#047A36] hover:shadow-md active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
