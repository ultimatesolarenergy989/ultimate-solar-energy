"use client";

export default function SolarServicesDetails() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] text-center mb-4">
          Solar Services
        </h2>
        <p className="text-lg md:text-xl text-[#002866] text-center mb-8">
          Our high-end solar services include:
        </p>

        {/* Yellow Box with Services */}
        <div className="bg-[#FFD700] p-8 md:p-12 mb-8">
          <div className="space-y-6">
            {/* Service 1 */}
            <div>
              <p className="text-gray-900 text-base md:text-lg leading-relaxed">
                <span className="font-bold">Comprehensive Solar Services:</span> We offer a wide range of services tailored to meet your specific solar needs. From installation and maintenance to repairs and cleaning, we have you covered every step. Our team of experts has the knowledge and experience to handle all types of solar systems, whether residential or commercial.
              </p>
            </div>

            {/* Service 2 */}
            <div>
              <p className="text-gray-900 text-base md:text-lg leading-relaxed">
                <span className="font-bold">Expert Cleaning Solutions:</span> Our professional cleaning services are designed to keep your solar panels in pristine condition. We utilize industry-leading techniques and equipment to remove dirt, dust, debris, and other pollutants that can hinder the efficiency of your panels. With regular cleaning, you can enjoy optimal energy production and maximize your savings.
              </p>
            </div>

            {/* Service 3 */}
            <div>
              <p className="text-gray-900 text-base md:text-lg leading-relaxed">
                <span className="font-bold">Skilled and Trained Technicians:</span> Our team consists of highly skilled technicians who are trained in the latest solar technologies and cleaning methods. They have the expertise to identify potential issues or inefficiencies in your system and provide practical solutions to ensure optimal performance.
              </p>
            </div>

            {/* Service 4 */}
            <div>
              <p className="text-gray-900 text-base md:text-lg leading-relaxed">
                <span className="font-bold">Quality and Customer Satisfaction:</span> We prioritize quality in everything we do. From our services to our customer support, we strive to exceed your expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <p className="text-lg md:text-xl text-[#002866] text-center font-semibold leading-relaxed">
          Let's Get Started! Contact us today to unlock the full potential of solar energy for your home or business.
        </p>
      </div>
    </section>
  );
}

