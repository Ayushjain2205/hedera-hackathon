import { Navbar } from "@/components/navbar";
import { LandingHero } from "@/components/landing-hero";
import { FeatureCards } from "@/components/feature-cards";
import { RegistrationStatus } from "@/components/registration-status";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <LandingHero />
        <FeatureCards />
        <RegistrationStatus />
      </main>
    </div>
  );
}
