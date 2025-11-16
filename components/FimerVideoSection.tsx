export default function FimerVideoSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002866] mb-8 text-center uppercase">
          LEARN MORE ABOUT THE PVS-10/33
        </h2>

        {/* YouTube Video Embed */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full shadow-2xl"
            src="https://www.youtube.com/embed/kwpvOphS9SA?start=34"
            title="FIMER - PVS-10/33-TL three-phase string inverter platform"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

