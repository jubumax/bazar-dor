import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

async function CurrentDate() {
  await connection();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return <>{date}</>;
}

const Hero = () => {
  return (
    <section className="px-4 py-8 sm:py-10">
      <div className="mx-auto grid max-w-6xl items-center overflow-hidden rounded-xl bg-[#FAFCFA] px-4 py-5 shadow-sm sm:px-5 sm:py-6 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:px-3 lg:pt-0.5 lg:pb-5">
        <div className="pl-1">
          <span className="inline-flex rounded-xl bg-green-100 px-3 py-1 text-xs font-semibold text-[#05893E] sm:text-sm">
            <Suspense fallback="">
              <CurrentDate />
            </Suspense>
          </span>

          <h2 className="mt-3 text-xl font-extrabold leading-tight text-slate-900 sm:mt-4 sm:text-2xl lg:whitespace-nowrap lg:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 mb-2 max-w-xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="btn mt-4 rounded-lg bg-[#05893E] px-4 text-sm text-white shadow-md hover:bg-[#047A36] sm:mt-5 sm:px-5"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="mt-0.5 flex justify-center md:mt-0 md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="তাজা বাজারের ঝুড়ি"
            width={450}
            height={375}
            priority
            className="h-auto w-full max-w-[220px] object-contain sm:max-w-[260px] md:max-w-[220px] lg:max-w-xs"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
