import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActions = () => (
  <>
    {/* WhatsApp floating */}
    <a
      href="https://wa.me/+918169887643?text=Hi%2C%20I%20want%20GST%20registration"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-6 md:bottom-6 md:right-8 z-40 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground flex items-center justify-center transition-smooth"
    >
      <MessageCircle className="h-7 w-7" />
    </a>

    {/* Sticky mobile CTA */}
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t shadow-float p-3">
      <Button
        variant="cta"
        size="lg"
        className="w-full"
        onClick={() => document.getElementById("footer-form")?.scrollIntoView({ behavior: "smooth" })}
      >
        🚀 Start GST Registration Now
      </Button>
    </div>
  </>
);

export default FloatingActions;
