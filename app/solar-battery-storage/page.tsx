import SolarBatteryBanner from "@/components/SolarBatteryBanner";
import HybridSolarSystem from "@/components/HybridSolarSystem";
import VppPlanBenefits from "@/components/VppPlanBenefits";
import VppPlansFaq from "@/components/VppPlansFaq";

export default function SolarBatteryStoragePage() {
  return (
    <main>
      <SolarBatteryBanner />
      <HybridSolarSystem />
      <VppPlanBenefits />
      <VppPlansFaq />
    </main>
  );
}

