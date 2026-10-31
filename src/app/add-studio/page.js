import RequireAuth from "@/components/auth/RequireAuth";
import StudioForm from "@/components/studios/StudioForm";

export const metadata = {
  title: "Add New Studio — StudioSpace",
};

export default function AddStudioPage() {
  return (
    <RequireAuth>
      <div className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Host your space
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Add New Studio
            </h1>
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              List your creative workspace — fill in the details below and it
              appears on Explore Studios right away.
            </p>
          </header>
          <StudioForm mode="add" />
        </div>
      </div>
    </RequireAuth>
  );
}
