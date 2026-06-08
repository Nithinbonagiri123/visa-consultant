export default function Hero() {
  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
      style={{ paddingTop: "calc(8rem - 75px)" }}
    >
      {/* Headline */}
      <h1
        className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl max-w-7xl animate-fade-rise"
        style={{
          color: "#000000",
          lineHeight: 0.95,
          letterSpacing: "-2.46px",
        }}
      >
        Beyond <em className="italic" style={{ color: "#6F6F6F" }}>silence,</em> we build{" "}
        <em className="italic" style={{ color: "#6F6F6F" }}>the eternal.</em>
      </h1>

      {/* Description */}
      <p
        className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay"
        style={{ color: "#6F6F6F" }}
      >
        Building platforms for brilliant minds, fearless makers, and thoughtful
        souls. Through the noise, we craft digital havens for deep work and
        pure flows.
      </p>

      {/* CTA */}
      <a
        href="#"
        className="rounded-full px-14 py-5 text-base mt-12 inline-block transition-transform duration-300 hover:scale-[1.03] animate-fade-rise-delay-2"
        style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
      >
        Begin Journey
      </a>
    </section>
  );
}
