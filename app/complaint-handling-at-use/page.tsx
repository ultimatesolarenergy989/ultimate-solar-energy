import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaint Handling & Customer Support | Ultimate Solar Energy",
  description: "Ultimate Solar Energy complaint handling and customer support process. We're committed to resolving issues quickly and professionally.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComplaintHandlingPage() {
  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-6 uppercase">
          CUSTOMER SUPPORT/COMPLAINTS
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Ultimate Solar Energy Complaint Handling Procedure
        </h2>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            The following document highlights the complaint resolution strategy adopted by{" "}
            <span className="font-bold">Ultimate Solar Energy</span> for the rectification of any complaints lodged by a customer.
          </p>

          <p>
            At <span className="font-bold">Ultimate Solar Energy</span>, we value the feedback of customers and escalating the complaints to resolve any issues regarding the performance of the system, Staff professionalism and installation efficiency. We believe in providing excellent customer service, however, at times complaints are lodged and we follow our standardised procedure of receiving the complaints, reviewing them and escalating them to resolution.
          </p>

          <p>The following timeline is followed for efficient timely resolution of complaints;</p>

          <ol className="list-decimal ml-8 space-y-3 mt-4">
            <li>We will ensure we provide an outcome within 21 days of when the complaint is made in writing.</li>
            <li>
              If for any reason the complaint resolution isn't going as fast as we set out to, we will make sure that we communicate the need for more time with you and resolve the complaint within 45 days of the initial complaint.
            </li>
            <li>
              First point of contact for complaints will be handled be the post installation team at{" "}
              <span className="font-bold">Ultimate Solar Energy</span>. They will correspond with our installers if necessary and will reach you with a resolution.
            </li>
            <li>
              If you are not happy with the resolution from the post installation team, we will redirect the complaint to management who will be able review and find out whether a further resolution is needed.
            </li>
          </ol>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">
            Ultimate Solar Energy requires the following information:
          </h3>

          <ul className="list-disc ml-8 space-y-2">
            <li>Your Ultimate Solar Energy Project Number.</li>
            <li>Your name and contact details.</li>
            <li>The name of the person(s) you have been dealing with.</li>
            <li>The nature of the complaint.</li>
            <li>Any previous correspondence with our staff.</li>
            <li>Remedy requested.</li>
            <li>Copies of any evidence that supports your complaint.</li>
          </ul>

          <p className="font-bold text-gray-900 mt-6">
            It is highly recommended you submit your complaint in writing.
          </p>

          <div className="mt-8 mb-8 h-px bg-gray-300"></div>

          <p>
            In the case that you would like to escalate the complaint outside of{" "}
            <span className="font-bold">Ultimate Solar Energy</span> we have listed The Clean Energy Council's contact details below
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Contact Details:</h3>

          <div className="space-y-1">
            <p>
              Email:{" "}
              <a href="mailto:Team@ultimatesolarenergy.com.au" className="text-[#FDB714] hover:underline">
                Team@ultimatesolarenergy.com.au
              </a>
            </p>
            <p>Phone: 1300 661 388</p>
            <p>Address: 1/50 assembly drive, Tullamarine VIC 3043</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Clean Energy Council:</h3>

          <div className="space-y-1">
            <p>
              Phone:{" "}
              <span className="text-[#FDB714]">03 9929 4100</span>
            </p>
            <p>Address: Level 15, 222 Exhibition Street, Melbourne VIC 3000</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Australian Competition & Consumer Commission:</h3>

          <div className="space-y-1">
            <p>
              Phone:{" "}
              <span className="text-[#FDB714]">1300 302 502</span>
            </p>
            <p>Address: GPO Box 520, Melbourne VIC 3001</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Consumer Affairs Victoria:</h3>

          <div className="space-y-1">
            <p>
              Phone:{" "}
              <span className="text-[#FDB714]">1300 558 181</span>
            </p>
            <p>Address: GPO Box 123, Melbourne VIC 3001</p>
          </div>

          {/* Support Ticket Button */}
          <div className="mt-12">
            <a
              href="/why-ultimate-solar-energy/customer-support"
              className="inline-block bg-[#0096FF] text-white font-semibold px-8 py-3 rounded hover:bg-[#0080E0] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Log a Support Ticket now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

