export default function TimeForSolar() {
  return (
    <section className="bg-gray-100 pb-16">
      {/* Top Section - The Time For Solar */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 uppercase">
            <span className="text-[#002866]">THE TIME FOR SOLAR IS </span>
            <span className="text-[#FFD700]">NOW</span>
            <span className="text-[#002866]"> !</span>
          </h2>
          <p className="text-base text-[18px] lg:text-[24px] text-[#002866] text-center max-w-6xl mx-auto leading-relaxed">
            Solar energy prices have amazingly reduced over the last decade with the increasing installations around the world and Australia. However, feed-in tariff (FiT) schemes have also reduced and will probably become less attractive over the next years. Therefore, now is the time when solar is widely accessible and when the subsidy schemes still offer a good incentive!
          </p>
        </div>
      </div>

      {/* Bottom Section - Yellow Banner */}
      <div className="bg-[#FFD700] py-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl lg:text-2xl xl:text-4xl font-bold text-[#002866] text-center uppercase leading-tight">
            EMPOWER THE FUTURE AUSTRALIAN GENERATIONS WITH SUSTAINABLE, RELIABLE AND CLEAN ENERGY
          </h3>
        </div>
      </div>
    </section>
  );
}

