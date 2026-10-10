
export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-2">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProductSectionsSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      {[0, 1, 2].map((section) => (
        <section key={section} className={section === 0 ? "" : "mt-16"}>
          <div className="skeleton mb-6 h-7 w-48" />
          <ProductGridSkeleton />
        </section>
      ))}
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <main
      className="mx-auto max-w-6xl px-4 py-10 sm:py-14"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="mb-6 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="skeleton h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <div className="skeleton h-7 w-40" />
            <div className="skeleton h-4 w-56" />
          </div>
        </div>
      </div>

      <div className="mb-7 flex items-center justify-between">
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-8 w-32" />
      </div>

      <ProductGridSkeleton />
    </main>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <main
      className="min-h-screen bg-[#f4f8f3] px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <div className="mx-auto max-w-6xl space-y-7">
        <div className="skeleton h-4 w-56" />

        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="skeleton h-20 w-20 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-8 w-1/2" />
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>

        <div className="skeleton h-64 rounded-[22px]" />
      </div>
    </main>
  );
}

export function NavSkeleton() {
  return (
    <div className="border-b border-slate-200 bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 py-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-7 w-16 md:w-20" />
        ))}
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="border-y border-slate-200 bg-[#FAFCFA] px-4 py-2.5">
      <div className="skeleton h-5 w-full" />
    </div>
  );
}
