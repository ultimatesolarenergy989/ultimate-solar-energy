"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

type City = {
  name: string;
  sunHours: number; // Average sun hours per day
  electricityRate: number; // cents per kWh
};

const cities: City[] = [
  { name: "Sydney", sunHours: 5.5, electricityRate: 28 },
  { name: "Melbourne", sunHours: 4.8, electricityRate: 26 },
  { name: "Brisbane", sunHours: 5.8, electricityRate: 27 },
  { name: "Perth", sunHours: 6.2, electricityRate: 29 },
  { name: "Adelaide", sunHours: 5.6, electricityRate: 30 },
  { name: "Canberra", sunHours: 5.3, electricityRate: 25 },
  { name: "Hobart", sunHours: 4.5, electricityRate: 24 },
  { name: "Darwin", sunHours: 6.5, electricityRate: 27 },
];

type HouseholdSize = {
  label: string;
  dailyUsage: number; // kWh per day
};

const householdSizes: HouseholdSize[] = [
  { label: "1 Person", dailyUsage: 8 },
  { label: "2 People", dailyUsage: 12 },
  { label: "3 People", dailyUsage: 16 },
  { label: "4 People", dailyUsage: 20 },
  { label: "5+ People", dailyUsage: 25 },
];

type EnergyUsage = {
  label: string;
  solarOffset: number; // percentage of energy that can be offset by solar
};

const energyUsagePatterns: EnergyUsage[] = [
  { label: "Morning and Night", solarOffset: 0.5 },
  { label: "During the Day", solarOffset: 0.8 },
  { label: "All Day", solarOffset: 0.65 },
];

export default function Calculator() {
  const [selectedCity, setSelectedCity] = useState("Melbourne");
  const [selectedHousehold, setSelectedHousehold] = useState("1 Person");
  const [selectedEnergyUsage, setSelectedEnergyUsage] = useState("Morning and Night");
  const [showResults, setShowResults] = useState(true);

  const calculateSavings = () => {
    const city = cities.find((c) => c.name === selectedCity) || cities[1];
    const household = householdSizes.find((h) => h.label === selectedHousehold) || householdSizes[0];
    const energyPattern = energyUsagePatterns.find((e) => e.label === selectedEnergyUsage) || energyUsagePatterns[0];

    // Calculate recommended system size (kW)
    const recommendedSystemSize = Math.ceil((household.dailyUsage / city.sunHours) * 10) / 10;

    // Calculate daily solar generation (kWh)
    const dailySolarGeneration = recommendedSystemSize * city.sunHours * 0.75; // 0.75 efficiency factor

    // Calculate daily savings
    const dailyUsageOffset = household.dailyUsage * energyPattern.solarOffset;
    const actualDailySavings = Math.min(dailySolarGeneration, dailyUsageOffset);
    const dailySavingsAmount = actualDailySavings * (city.electricityRate / 100);

    // Calculate monthly and annual savings
    const monthlySavings = dailySavingsAmount * 30;
    const annualSavings = dailySavingsAmount * 365;

    return {
      monthlySavings: monthlySavings.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      recommendedSystem: recommendedSystemSize.toFixed(1),
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = showResults ? calculateSavings() : { monthlySavings: "59.26", annualSavings: "711.16", recommendedSystem: "3.5" };

  return (
    <section className="py-16 bg-[#FFD700] relative overflow-hidden" style={{
      backgroundImage: 'url(/img/bg/calc-bg.jpg)',
      
    }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/bg/calc-bg.jpg)',
          opacity: 0.15,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Row - Heading + Paragraph on Left, Calculator Icon on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#002866] leading-tight uppercase mb-4">
              HOW MUCH DO SOLAR PANELS COST AUSTRALIA? CALCULATE YOUR SAVINGS!
            </h2>
            <p className="text-base lg:text-lg text-[#002866]">
              Use the form below to see how much you could save by moving to solar power.
            </p>
          </div>
          <div className="flex justify-end flex-shrink-0">
            <Image
              src="/img/calc-icon.png"
              alt="Calculator"
              width={200}
              height={200}
              className="w-40 lg:w-48 xl:w-56 h-auto"
            />
          </div>
        </div>

        {/* Third Row - Form Fields and Results Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Form Fields */}
          <div className="space-y-4">
            {/* City Selection */}
            <div>
              <label htmlFor="city" className="block text-sm font-bold text-[#002866] mb-2 uppercase">
                My Nearest City Is
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  handleCalculate();
                }}
                className="w-full px-4 py-3 rounded-md bg-white text-gray-800 font-medium focus:ring-2 focus:ring-[#002866] focus:border-transparent outline-none transition-all text-base border-0"
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Household Size */}
            <div>
              <label htmlFor="household" className="block text-sm font-bold text-[#002866] mb-2 uppercase">
                My Household Has
              </label>
              <select
                id="household"
                value={selectedHousehold}
                onChange={(e) => {
                  setSelectedHousehold(e.target.value);
                  handleCalculate();
                }}
                className="w-full px-4 py-3 rounded-md bg-white text-gray-800 font-medium focus:ring-2 focus:ring-[#002866] focus:border-transparent outline-none transition-all text-base border-0"
              >
                {householdSizes.map((size) => (
                  <option key={size.label} value={size.label}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Energy Usage Pattern */}
            <div>
              <label htmlFor="energy" className="block text-sm font-bold text-[#002866] mb-2 uppercase">
                I Use My Most Of My Energy
              </label>
              <select
                id="energy"
                value={selectedEnergyUsage}
                onChange={(e) => {
                  setSelectedEnergyUsage(e.target.value);
                  handleCalculate();
                }}
                className="w-full px-4 py-3 rounded-md bg-white text-gray-800 font-medium focus:ring-2 focus:ring-[#002866] focus:border-transparent outline-none transition-all text-base border-0"
              >
                {energyUsagePatterns.map((pattern) => (
                  <option key={pattern.label} value={pattern.label}>
                    {pattern.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-[#002866] text-[#FFD700] font-bold py-4 px-6 rounded-md transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg relative overflow-hidden group hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                Calculate Saving
                <div className="bg-[#FFD700] text-[#002866] p-1 rounded">
                  <Plus size={20} strokeWidth={3} />
                </div>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            </button>
          </div>

          {/* Right Side - Results Panel */}
          <div className="bg-[#002866] rounded-lg overflow-hidden shadow-2xl w-full">
              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 p-8 pb-6">
                {/* Monthly Savings */}
                <div className="text-center px-2 py-4 lg:py-0">
                  <h3 className="text-white font-bold text-sm lg:text-base mb-4 leading-tight uppercase">
                    EST. MONTHLY<br />SAVINGS
                  </h3>
                  <p className="text-[#FFD700] font-bold text-4xl">
                    ${results.monthlySavings}
                  </p>
                </div>

                {/* Annual Savings */}
                <div className="text-center px-2 py-4 lg:py-0">
                  <h3 className="text-white font-bold text-sm lg:text-base mb-4 leading-tight uppercase">
                    EST. ANNUAL<br />SAVINGS
                  </h3>
                  <p className="text-[#FFD700] font-bold text-4xl">
                    ${results.annualSavings}
                  </p>
                </div>

                {/* Recommended System */}
                <div className="text-center px-2 py-4 lg:py-0">
                  <h3 className="text-white font-bold text-sm lg:text-base mb-4 leading-tight uppercase">
                    RECOMMENDED<br />SYSTEM
                  </h3>
                  <p className="text-[#FFD700] font-bold text-4xl">
                    {results.recommendedSystem}KW
                  </p>
                </div>
              </div>

              {/* Get Quote Button */}
              <div className="px-8 pb-6">
                <Link
                  href="/quote"
                  className="block w-full bg-[#FFD700] text-[#002866] font-bold py-4 px-6 rounded-md transition-all duration-300 text-center uppercase tracking-wider shadow-lg hover:shadow-xl text-base relative overflow-hidden group hover:scale-105"
                >
                  <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 inline-block">Get Your Quote</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                </Link>
              </div>

              {/* Disclaimer */}
              <div className="px-8 pb-8">
                <p className="text-white text-xs leading-relaxed">
                  <span className="font-semibold">Assumptions:</span> Savings calculation based on a detached house, minimum feed-in tariff of 11.3 c/kwh. Based on an average household load profile (Bureau of Statistics). Monthly saving is simplified to annual saving / 12. Actual payback may vary on exact location, system conversion efficiency and other factors.
                </p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

