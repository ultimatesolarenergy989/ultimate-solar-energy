export default function Hero() {
  return (
    <section className="relative w-full bg-black">
      <video
        className="w-full h-auto max-h-[90vh] object-contain"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/Why-Solar-Energy_6-compressed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
