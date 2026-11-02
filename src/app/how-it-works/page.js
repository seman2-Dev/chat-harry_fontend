import Link from "next/link";

export const metadata = {
  title: "How It Works — StudioSpace",
  description:
    "Learn how to find, book, and host creative studios on StudioSpace.",
};

const guestSteps = [
  {
    number: "01",
    title: "Find the right setup",
    text: "Explore photo studios, sound stages, podcast rooms, music suites, and art workshops. Compare locations, hourly rates, amenities, and photos before you choose.",
  },
  {
    number: "02",
    title: "Choose a date and time",
    text: "Open a studio listing to review its details, then select the date, start time, and number of hours that fit your project.",
  },
  {
    number: "03",
    title: "Send your booking request",
    text: "Review the time and estimated total, add a note for the host, and submit your request. It appears in My Bookings with a Pending status while it awaits the host.",
  },
  {
    number: "04",
    title: "Keep track and create",
    text: "Check My Bookings for status updates and keep the studio details handy for your session. After a completed booking, you can leave a review for future guests.",
  },
];

const tips = [
  ["Check the details", "Read the description and amenities list to make sure the space suits your gear, crew, and type of work."],
  ["Share useful context", "Use the booking note to tell the host what you are planning or ask about anything the listing does not cover."],
  ["Save options for later", "Save studios you like to compare them or return when your project dates are settled."],
];

export default function HowItWorksPage() {
  return (
    <main className="bg-zinc-50 dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            A simpler way to find your setup
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
                Your next great session starts with the right space.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                StudioSpace helps creators discover practical workspaces and gives hosts a place to share theirs. Here is what to expect, from your first search to session day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studios" className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
                  Explore studios
                </Link>
                <Link href="/register" className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                  Join StudioSpace
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/30">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">At a glance</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li><strong className="text-zinc-950 dark:text-white">Browse:</strong> compare spaces by category, location, price, and amenities.</li>
                <li><strong className="text-zinc-950 dark:text-white">Request:</strong> choose your session time and send the host a booking request.</li>
                <li><strong className="text-zinc-950 dark:text-white">Follow up:</strong> track the request from your account’s My Bookings page.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">For creators</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">From search to session day</h2>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">A clear flow helps you spend less time coordinating and more time preparing for the work.</p>
        </div>
        <ol className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {guestSteps.map((step) => (
            <li key={step.number} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-sm font-bold text-amber-700 dark:text-amber-400">{step.number}</span>
              <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">Good to know</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">A few details before you book</h2>
            <ul className="mt-6 space-y-5">
              {tips.map(([title, text]) => (
                <li key={title} className="border-l-2 border-amber-500 pl-4">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-zinc-950 p-7 text-white sm:p-9 dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">For hosts</p>
            <h2 className="mt-3 text-2xl font-bold">Put your creative space to work.</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">Create a listing with clear photos, an accurate description, your hourly rate, and the amenities guests can use. You can update your listing and review incoming booking requests from your account.</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-200">
              <li>• Show guests what makes your space useful.</li>
              <li>• Keep listing information current.</li>
              <li>• Manage your spaces and requests in one place.</li>
            </ul>
            <Link href="/add-studio" className="mt-7 inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
              List your studio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-14 sm:px-6 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Ready to find your next workspace?</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Explore the spaces and see which one fits your project.</p>
        </div>
        <Link href="/studios" className="inline-flex w-fit rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">Browse studios</Link>
      </section>
    </main>
  );
}
