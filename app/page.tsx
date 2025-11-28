import FAQ from "@/Components/FAQ";
import Footer from "@/Components/Footer";
import FounderSection from "@/Components/FounderSection";
import Future from "@/Components/Future";
import HeroSection from "@/Components/HeroSection";
import InputChat from "@/Components/InputChat";
import TrustedBrands from "@/Components/Marqueue";
import Navbar from "@/Components/Navbar";
import SinglePlayerResponsePerplexityStyle from "./search/Components/SinglePlayerResponse";
import PlayerComparisonResponse from "./search/Components/PlayerComparisonResponse";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white relative">
      <Navbar />

      <HeroSection />

      <TrustedBrands />
      <InputChat />
      <Future />
      <FounderSection />
      <FAQ />
      <Footer />
    </div>
  );
}
