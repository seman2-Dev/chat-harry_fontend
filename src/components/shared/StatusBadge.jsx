const STYLES = {
  Pending: "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-400",
  Confirmed: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-400",
  Completed: "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark:text-sky-400",
  Cancelled: "bg-red-500/15 text-red-700 ring-red-500/30 dark:text-red-400",
};

export default function StatusBadge({ status }) {
  const classes = STYLES[status] ?? STYLES.Pending;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes}`}
    >
      {status}
    </span>
  );
}
