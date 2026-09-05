import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThreadLine from "@/components/ThreadLine";
import RoadmapSection from "@/components/RoadmapSection";
import InterviewSimulator from "@/components/InterviewSimulator";
import DualSystemSection from "@/components/DualSystemSection";
import CompareSection from "@/components/CompareSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="relative">
        <ThreadLine />
        <RoadmapSection />
        <InterviewSimulator />
        <DualSystemSection />
        <CompareSection />
        <PricingSection />
      </div>
      <Footer />
    </>
  );
}
