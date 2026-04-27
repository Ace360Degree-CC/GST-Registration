import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    badge: "MOST POPULAR",
    title: "GST Registration",
    points: [
      "GSTIN approval",
      "Complete Documentation",
      "Fast 3-5 day processing",
      "Free CA consultation",
    ],
    highlight: true,
  },
  {
    title: "Company / LLP Registration",
    points: [
      "Pvt Ltd Company",
      "LLP Registration",
      "OPC Registration",
      "DSC + DIN included",
    ],
  },
  {
    title: "Partnership / Sole Proprietor",
    points: [
      "Pvt Ltd Partnership Firm Setup",
      "Sole Proprietor Registration",
      "MSME / Shop Act Assistance",
      "GST & Compliance Ready",
    ],
  },
  {
    title: "Accounting & CA Support",
    points: [
      "Bookkeeping",
      "GST & ITR Compliance",
      "Monthly reports",
      "Dedicated CA consultation",
    ],
  },
];

const Services = () => (
  <section id="services" className="py-14 md:py-20 gradient-soft">
    <div className="container px-4">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Our Services
        </span>
        <h2
          className="text-2xl md:text-4xl mt-2"
          style={{ fontFamily: "Poppins, Inter, sans-serif" }}
        >
          Choose What Suits Your Business
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`relative rounded-2xl p-6 border-2 bg-card transition-smooth hover:-translate-y-1 flex flex-col h-full ${
              c.highlight
                ? "border-primary shadow-elegant scale-[1.02]"
                : "border-border shadow-card"
            }`}
          >
            {/* Badge */}
            {c.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-cta text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-cta">
                <Crown className="h-3 w-3" /> {c.badge}
              </span>
            )}

            {/* Content Wrapper (IMPORTANT) */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>

              {/* Points */}
              <ul className="space-y-2 mb-6">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <Button
              variant={c.highlight ? "cta" : "outline"}
              className="w-full mt-auto"
              onClick={() =>
                document
                  .getElementById("footer-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;