import Image from "next/image";

export default function BrightePayment() {
  return (
    <section className=" w-full mb-12 ">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6  lg:px-8 bg-[#27cf8b] pb-8">
      <h2 className="text-white mb-4 uppercase tracking-wide leading-tight font-bold" style={{ textAlign:'center', fontSize: '20px', fontFamily: "'Montserrat', sans-serif" }}>
              BRIGHTE 0% INTEREST PAYMENT PLANS
            </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        
          {/* Brighte Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/img/brighte-white.png"
              alt="Brighte"
              width={300}
              height={150}
              className="w-28 md:w-64 lg:w-40 h-auto object-contain"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="flex-1" >
            
            <p className="text-white text-base md:text-lg leading-relaxed " style={{ fontSize: '15px', fontFamily: "'Montserrat', sans-serif" }}>
              USE has partnered with Bright to bring you more options to pay for your Solar Installation.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed" style={{ fontSize: '15px', fontFamily: "'Montserrat', sans-serif" }}>
              The Brighte 0% Interest Payment Plan provides the opportunity to tick off home improvements, or upgrade your energy efficiency today, and pay back over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

