import { ShieldCheck, Award, Clock, Headphones } from "lucide-react";

const trust = [
  { icon: ShieldCheck, label: "100% Compliant" },
  { icon: Award, label: "Certified CA Firm" },
  { icon: Clock, label: "On-Time Delivery" },
  { icon: Headphones, label: "Lifetime Support" },
];

const Solution = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="container px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">The Solution</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Complete Business Setup – <span className="text-primary">One Place Solution</span>
        </h2>
        <p className="mt-3 text-muted-foreground">From GST to growth — sab kuch ek hi CA team ke saath.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {trust.map(({ icon: Icon, label }) => (
          <div key={label} className="text-center p-5 rounded-xl bg-secondary/60 border hover:border-primary transition-smooth">
            <div className="mx-auto h-14 w-14 rounded-full gradient-cta flex items-center justify-center mb-3 shadow-cta">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="font-semibold text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Solution;
