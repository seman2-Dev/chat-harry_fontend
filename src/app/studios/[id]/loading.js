export default function StudioDetailsLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 h-9 w-96 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-3 h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-[16/10] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-8 space-y-3">
            <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="h-96 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
