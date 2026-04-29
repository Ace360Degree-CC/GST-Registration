import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, FileText, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: FileText,
    title: "Requirement Discussion",
    desc: "Hamari CA team aapko call karegi aur aapki business requirements samjhegi.",
  },
  {
    icon: Building2,
    title: "Registration",
    desc: "Documents collect karke GST / Company registration process start karenge.",
  },
  {
    icon: Rocket,
    title: "Setup & Support",
    desc: "Complete setup ke baad ongoing accounting & compliance support milega.",
  },
];

const ThankYou = () => {
  const waUrl = "https://wa.me/+918169887643?text=" + encodeURIComponent("Hi, I just submitted the form. Please help me start my business.");

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              You're One Step Closer to Starting Your Business 🚀
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thank you! Aapki request humein mil gayi hai. CA Praveen Jain ki team aapse jaldi contact karegi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Don't want to wait? Talk to us now 👇</h2>
            <p className="text-muted-foreground mb-6">Get instant response on WhatsApp</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button size="xl" className="bg-whatsapp hover:bg-whatsapp/90 text-white gap-2">
                <MessageCircle className="w-5 h-5" />
                👉 WhatsApp Now
              </Button>
            </a>
            <div className="mt-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ThankYou;
