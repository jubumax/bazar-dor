const Footer = () => {
  return (
    <footer className="mt-10 border-t border-green-100 bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:text-sm">
        <p className="text-[#1D271F]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="max-w-xl text-[#1D271F] sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
