export const metadata = {
  title: "Terms of Service — StudioSpace",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Terms of Service
      </h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>
          StudioSpace is a peer-to-peer marketplace. Hosts list spaces they own
          or are authorized to rent; guests book those spaces by the hour.
        </p>
        <p>
          By using StudioSpace you agree to treat other members respectfully,
          honor confirmed bookings, and leave spaces as you found them.
          Listings must describe real spaces accurately — misleading listings
          may be removed.
        </p>
        <p>
          Full terms will be published with the production launch of the
          platform. Questions? Reach out through the newsletter links in the
          footer.
        </p>
      </div>
    </div>
  );
}
