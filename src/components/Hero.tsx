import { useEffect, useState } from "react";
import founder from "@/assets/founder.png"; // Replace with your image
import LeadForm from "./LeadForm";
import { Play, CheckCircle2, Star } from "lucide-react";

const Hero = () => {
  const [playing, setPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/nVvmDk9kZ2M?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1";

  useEffect(() => {
    const handleScrollStart = () => {
      if (window.scrollY > 0) {
        setPlaying(true);
        window.removeEventListener("scroll", handleScrollStart);
      }
    };

    window.addEventListener("scroll", handleScrollStart, { passive: true });
    handleScrollStart();
    return () => window.removeEventListener("scroll", handleScrollStart);
  }, []);

  const handlePlayClick = () => {
    setPlaying(true);
  };

  return (
    <section className="relative gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
      <div className="container relative px-4 py-10 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Video / Founder */}
        <div className="animate-fade-up order-2 lg:order-1">
          <div
            className={`relative rounded-2xl overflow-hidden bg-transparent aspect-[9/16] w-full mx-auto ${
              playing ? "max-w-sm" : "max-w-lg"
            }`}
          >
            {/* Thumbnail (Founder Image) */}
            <img
              src={founder}
              alt="CA Praveen Jain - Founder, Praveen J & Associates"
              className="w-full h-full object-contain object-center"
              loading="eager"
              style={{ cursor: "default" }}
            />

            {/* Play Button */}
            {!playing && (
              <button
                onClick={handlePlayClick}
                aria-label="Play introduction video"
                className="absolute inset-0 flex items-center justify-center transition-smooth group"
              >
                <span className="h-20 w-20 rounded-full bg-primary-foreground flex items-center justify-center shadow-elegant group-hover:scale-110 transition-smooth animate-pulse-ring">
                  <Play className="h-10 w-10 text-primary fill-primary ml-1" />
                </span>
              </button>
            )}

            {playing && (
              <iframe
                src={videoUrl}
                title="YouTube Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </div>

        {/* Right: Headline + Form */}
        <div className="order-1 lg:order-2 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-xs md:text-sm font-semibold mb-4 border border-primary-foreground/20">
            🇮🇳 Trusted by 1000+ Indian Businesses
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
            Business Start Karna Hai? <br />
            <span className="text-accent">GST Registration</span> Se Shuruaat Karein 🚀
          </h1>
          <p className="text-base md:text-lg opacity-95 mb-5">
            New business ke liye GST registration aur setup ab easy hai.
            <br className="hidden md:block" />
            👉 CA Praveen Jain ke saath <strong>fast & hassle-free</strong> process.
          </p>

          <ul className="space-y-2 mb-6">
            {["GST Registration", "Company / LLP / Pvt Ltd Registration", "Accounting & CA Support"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0" /> <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Inline form on desktop, scroll cue on mobile */}
          <div className="bg-background text-foreground rounded-2xl p-5 md:p-6 shadow-float">
            <h2 className="text-lg md:text-xl font-bold mb-1">Get Free Consultation</h2>
            <p className="text-sm text-muted-foreground mb-4">Fill the form — we call you within 30 mins ⏱</p>
            <LeadForm variant="hero" />
          </div>

          <div className="flex items-center gap-4 mt-5 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              <span className="ml-1 font-semibold">5.0</span>
            </div>
            <span className="opacity-80">·</span>
            <span className="opacity-95">⭐ 1000+ Clients · Mumbai · INDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

