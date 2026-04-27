import { MessageSquare, FileText, Stamp, LifeBuoy } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Requirement Discussion", desc: "Aapki business needs samjhte hain — free 15 min call." },
  { icon: FileText, title: "Documents Collection", desc: "Simple checklist — WhatsApp pe documents bhejiye." },
  { icon: Stamp, title: "Registration", desc: "Hum portal pe file karte hain — aap relax kariye." },
  { icon: LifeBuoy, title: "Lifetime Support", desc: "Certificate ke baad bhi support — kabhi bhi puchiye." },
];

const Process = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="container px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">How It Works</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Simple <span className="text-primary">4-Step Process</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="bg-card border rounded-xl p-6 shadow-card hover:shadow-elegant transition-smooth h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-10 w-10 rounded-full gradient-cta text-primary-foreground font-bold flex items-center justify-center text-lg shadow-cta">
                  {i + 1}
                </span>
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
