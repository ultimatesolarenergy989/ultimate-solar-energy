import Hero from "@/components/Hero";
import ResComPlans from "@/components/Res-Com-Plans";
import Eligible from "@/components/Eligible";
import Calculator from "@/components/Calculator";
import CompanySlider from "@/components/CompanySlider";
import YUltimate from "@/components/Y-Ultimate";
import TimeForSolar from "@/components/TimeForSolar";
import Blogs from "@/components/Blogs";

export default function Home() {
  return (
    <main>
      <Hero />
      <ResComPlans />
      <Eligible />
      <Calculator />
      <YUltimate />
      <CompanySlider />
      <Blogs />
      <TimeForSolar />
    </main>
  );
}
