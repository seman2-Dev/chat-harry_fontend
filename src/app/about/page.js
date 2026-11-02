import Link from "next/link";

export const metadata = {
  title: "About Us — StudioSpace",
  description:
    "StudioSpace connects independent creators with the studios and workspaces they need.",
};

const values = [
  {
    number: "01",
    title: "Make discovery easier",
    text: "Finding a suitable place to shoot, record, rehearse, or make art can take time. StudioSpace brings creative spaces together so people can compare the details that matter to their project.",
  },
  {
    number: "02",
    title: "Help hosts get seen",
    text: "A well-equipped room deserves an audience. Hosts can describe their space, share photos and amenities, set an hourly rate, and manage their listings through one account.",
  },
  {
    number: "03",
    title: "Build trust through clarity",
    text: "Useful listing details, visible booking statuses, and reviews from completed bookings help guests make informed choices and help the community learn from real sessions.",
  },
];

const categories = [
  ["Photo studios", "Portraits, products, and campaign shoots"],
  ["Sound stages", "Film, video, and production work"],
  ["Podcast rooms", "Conversations, interviews, and voice work"],
  ["Music suites", "Writing, recording, and rehearsal"],
  ["Art workshops", "Hands-on making and creative practice"],
];

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-zinc-950 text-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">About StudioSpace</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Good work needs a place to happen.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            StudioSpace is a marketplace for creative workspaces. We connect people looking for a place to make something with hosts who have a space to share.
          </p>
          <Link href="/studios" className="mt-8 inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
            Find a studio
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">Why we are here</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Make the space part of the plan.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            <p>Creative projects need more than an idea. They need the right light, sound, equipment, room to move, and a place where a team can focus. Finding those details across scattered listings can make planning harder than it needs to be.</p>
            <p>StudioSpace gives creators a straightforward way to explore spaces and gives hosts a practical way to present what they offer. Whether you are preparing a one-hour recording or planning a full production day, you can start by comparing real listing details in one place.</p>
            <p>We are building for independent creators, small teams, and the people who open their workspaces to them.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">What guides us</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Built around the people behind the work</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.number} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{value.number}</span>
                <h3 className="mt-4 text-xl font-semibold text-zinc-950 dark:text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">Spaces for many kinds of work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Bring the project. Find the setting.</h2>
            <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">Explore by category, then use each listing’s photos, description, location, rate, and amenities to decide whether it fits.</p>
          </div>
          <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 px-5 dark:divide-zinc-800 dark:border-zinc-800">
            {categories.map(([name, description]) => (
              <li key={name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="font-semibold text-zinc-900 dark:text-white">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl bg-amber-50 p-7 sm:p-9 md:flex-row md:items-center md:justify-between dark:bg-amber-950/30">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">A space to create. A community to grow with.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">Browse studios for your next project, or share a workspace you would like more creators to discover.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/studios" className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">Explore spaces</Link>
            <Link href="/how-it-works" className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-white dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">How it works</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
