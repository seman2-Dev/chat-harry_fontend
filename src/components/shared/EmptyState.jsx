import Link from "next/link";

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
      <span className="text-zinc-300 dark:text-zinc-600" aria-hidden="true">
        {icon}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
