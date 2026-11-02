import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import StudioSearch from "@/components/home/StudioSearch";
import { allStudios, getFeaturedStudios } from "@/data/studios";

export const metadata = {
  title: "StudioSpace — Discover & Book Creative Studios by the Hour",
  description:
    "Peer-to-peer marketplace for photo studios, sound stages, podcast rooms, music suites, and art workshops — available by the hour.",
};

export default async function HomePage() {
  const featuredStudios = await getFeaturedStudios();
  const featuredIds = new Set(featuredStudios.map((studio) => studio.id));
  const moreStudios = allStudios
    .slice(-3)
    .filter((studio) => !featuredIds.has(studio.id));

  return (
    <>
      <HeroSlider />
      <StudioSearch />
      <FeaturedStudios studios={featuredStudios} moreStudios={moreStudios} />
      <CategoryGrid />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
