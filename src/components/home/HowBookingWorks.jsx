const steps = [
  {
    title: "Discover Spaces",
    text: "Filter studios by category, location, price, and amenities to find the room that fits your shoot.",
  },
  {
    title: "Select Shoot Hours",
    text: "Check live availability and pick the exact hours you need — no phone tag, no hidden fees.",
  },
  {
    title: "Book Instantly",
    text: "Confirm the reservation and pay securely. Your booking lands in My Bookings as Pending.",
  },
  {
    title: "Create & Produce",
    text: "Show up, plug in, and do your best work in a space built for creators.",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="booking-heading"
      className="bg-white py-20 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            How booking works
          </p>
          <h2
            id="booking-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            From Idea to Shoot Day in Four Steps
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Booking a professional studio should feel as easy as streaming a
            movie. Here is the whole flow.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-base font-bold text-amber-600 dark:text-amber-400">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
