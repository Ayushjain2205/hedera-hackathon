import { Navbar } from "@/components/navbar";
import { LandingHero } from "@/components/landing-hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <LandingHero />
    </div>
  );
}
