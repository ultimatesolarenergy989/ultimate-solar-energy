import Image from 'next/image';

export default function FinancingDetails() {
  const financingOptions = [
    {
      title: "PURCHASE:",
      description: "A cash purchase allows your organisation to achieve the highest returns from installing a commercial solar power system; however it requires an initial upfront investment in the system. A cash purchase generates the cheapest LCOE (Levelised Cost of Electricity) over the life of the system."
    },
    {
      title: "LEASE:",
      description: "A solar lease allows you to install a commercial solar system on your premises with a payment plan to eliminate the upfront capital investment required. By spreading the cost of the installation out over an agreed payment term, your business can have the advantages of solar power from day one without the drain on cash flow. Todae Solar will work with your organisation and find the right finance partner to enable you to install solar power"
    },
    {
      title: "POWER PURCHASE AGREEMENT:",
      description: "Secure your company's energy costs with long term hedging against future energy price volatility with a Todae Solar PPA. A Solar PPA allows you to install solar power without any upfront capital investment – with no significant effect on cash flow. A Solar PPA means you are buying the solar electricity produced by the system, rather than buying the system itself. This means that you only pay for what the system produces, and you usually pay less than what it would cost to buy the same electricity from the grid."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#002866] mb-12 uppercase">
          Commercial Solar Financing Options
        </h2>

        {/* Financing Options */}
        <div className="space-y-10">
          {financingOptions.map((option, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start"
            >
              {/* Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="border border-gray-300 p-3 bg-white shadow-sm w-[200px]">
                  <Image
                    src="/img/item/purchase-img1.jpg"
                    alt={option.title}
                    width={200}
                    height={450}
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#002866] mb-3">
                  {option.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

