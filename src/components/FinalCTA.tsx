import { Button } from "@/components/ui/button";
import { MessageCircle, Rocket } from "lucide-react";

const FinalCTA = () => (
  <section className="py-14 md:py-20 gradient-red-strip text-primary-foreground">
    <div className="container px-4 text-center">
      <h2 className="text-3xl md:text-5xl mb-4" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
        Aaj Hi Business Start Karein 🚀
      </h2>
      <p className="text-base md:text-lg opacity-95 max-w-xl mx-auto mb-8">
        Hazaaron entrepreneurs ne humse apna business start kiya. Aapka number kab?
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <Button
          size="xl"
          className="bg-background text-primary hover:bg-background/90 font-bold flex-1"
          onClick={() => document.getElementById("footer-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Rocket className="h-5 w-5" /> Start Registration
        </Button>
        <Button
          size="xl"
          variant="outlineLight"
          className="flex-1"
          onClick={() => window.open("https://wa.me/+918169887643?text=Hi%2C%20I%20want%20to%20talk%20to%20a%20CA", "_blank")}
        >
          <MessageCircle className="h-5 w-5" /> Talk to CA
        </Button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
