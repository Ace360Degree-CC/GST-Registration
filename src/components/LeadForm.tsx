import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  variant?: "hero" | "footer";
  defaultService?: string;
}

const LeadForm = ({ variant = "hero", defaultService = "GST Registration" }: Props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [stage, setStage] = useState("Idea");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid name and 10-digit mobile number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const msg = `Hi, I'm ${name}. I need help with ${service}. Stage: ${stage}.`;
      window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, "_blank");
      setName(""); setMobile(""); setEmail("");
      navigate("/thank-you");
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        placeholder="Your Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={60}
        className="h-12 bg-background"
      />
      <Input
        placeholder="Mobile Number *"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
        inputMode="numeric"
        className="h-12 bg-background"
      />
      {variant === "footer" && (
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={120}
          className="h-12 bg-background"
        />
      )}
      <Select value={service} onValueChange={setService}>
        <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="GST Registration">GST Registration ✅</SelectItem>
          <SelectItem value="Company Registration">Company / LLP Registration</SelectItem>
          <SelectItem value="Accounting">Accounting & Bookkeeping</SelectItem>
          <SelectItem value="CA Consultation">CA Consultation</SelectItem>
        </SelectContent>
      </Select>
      {variant === "footer" && (
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="h-12 bg-background"><SelectValue placeholder="Business Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Idea">Just an Idea</SelectItem>
            <SelectItem value="Starting">Starting Out</SelectItem>
            <SelectItem value="Running">Already Running</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : variant === "footer" ? "👉 Submit & Get Consultation" : "👉 Get Started"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">⚡ Quick response guaranteed · 100% Confidential</p>
    </form>
  );
};

export default LeadForm;
