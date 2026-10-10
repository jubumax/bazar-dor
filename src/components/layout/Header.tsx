"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import Userinfo from "../Userinfo";

const Header = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          dateStyle: "full",
        }).format(new Date()),
      );
    };

    const timeoutId = setTimeout(updateDate, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <header className="border-b border-slate-200 bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white sm:h-11 sm:w-11">
            <GiShoppingCart size={22} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
              বাজার দর
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{date}</p>
          </div>
        </Link>

        <Userinfo />
      </div>
    </header>
  );
};

export default Header;
