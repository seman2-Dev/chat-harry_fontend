import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import { getFeaturedStudios } from "@/data/studios";

export const metadata = {
  title: "StudioSpace — Discover & Book Creative Studios by the Hour",
  description:
    "Peer-to-peer marketplace for photo studios, sound stages, podcast rooms, music suites, and art workshops — available by the hour.",
};

export default async function HomePage() {
  const featuredStudios = await getFeaturedStudios();

  return (
    <>
      <HeroSlider />
      <FeaturedStudios studios={featuredStudios} />
      <CategoryGrid />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
