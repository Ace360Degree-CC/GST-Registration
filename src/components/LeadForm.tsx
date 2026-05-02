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

const LEAD_FORM_ENDPOINT = import.meta.env.VITE_LEAD_API_URL || "/api/leads";

const LeadForm = ({ variant = "hero", defaultService = "GST Registration" }: Props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [stage, setStage] = useState("Idea");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid name and 10-digit mobile number");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(LEAD_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          mobile,
          email: email.trim(),
          service,
          stage,
          formSource: variant === "footer" ? "footer" : "header",
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to submit lead form.";
        try {
          const payload = await response.json();
          if (payload?.error) {
            errorMessage = payload.error;
          }
        } catch {
          // Ignore JSON parse errors and use default message.
        }
        throw new Error(errorMessage);
      }

      setName("");
      setMobile("");
      setEmail("");
      toast.success("Submitted successfully. We'll contact you shortly.");
      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      if (error instanceof TypeError) {
        toast.error("Submission failed: backend API is not reachable. Start `npm run dev:server`.");
      } else if (error instanceof Error) {
        toast.error(`Submission failed: ${error.message}`);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
      <Input
        type="email"
        placeholder="Email Address *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={120}
        className="h-12 bg-background"
      />
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
