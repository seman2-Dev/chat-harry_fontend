export const metadata = {
  title: "Privacy Policy — StudioSpace",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>
          We collect only what the product needs to work: your name, email, and
          profile photo when you register, plus the studios and bookings you
          create.
        </p>
        <p>
          Session tokens are stored in HttpOnly cookies — client-side
          JavaScript cannot read them. We do not sell your personal data to
          third parties.
        </p>
        <p>
          A full policy covering data retention and your right to deletion will
          ship with the production launch.
        </p>
      </div>
    </div>
  );
}
