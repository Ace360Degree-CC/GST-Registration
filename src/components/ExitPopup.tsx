import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Flame } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/lib/submitLead";

const schema = z.object({
  name: z.string().trim().min(2, "Enter name").max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "10-digit mobile"),
  email: z.string().trim().regex(/^\S+@\S+\.\S+$/, "Enter valid email"),
});

type FormData = z.infer<typeof schema>;
const LEAD_FORM_ENDPOINT = import.meta.env.VITE_LEAD_API_URL || "/api/leads";
const EXIT_POPUP_SUBMITTED_KEY = "exitPopupSubmitted";

const ExitPopup = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastTriggerPercentRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const isPopupSubmitted = () => {
      try {
        return localStorage.getItem(EXIT_POPUP_SUBMITTED_KEY) === "true";
      } catch {
        return false;
      }
    };

    if (isPopupSubmitted()) return;

    const getScrollPercent = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return 0;
      return (window.scrollY / scrollHeight) * 100;
    };

    const handleScroll = () => {
      const percent = getScrollPercent();
      if (lastTriggerPercentRef.current === null) {
        lastTriggerPercentRef.current = percent;
        return;
      }

      if (Math.abs(percent - lastTriggerPercentRef.current) >= 40) {
        lastTriggerPercentRef.current = percent;
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await submitLead(LEAD_FORM_ENDPOINT, {
        name: data.name.trim(),
        mobile: data.mobile,
        email: data.email.trim(),
        service: "TDS Filing",
        stage: "Running",
        formSource: "popup",
      });

      try {
        localStorage.setItem(EXIT_POPUP_SUBMITTED_KEY, "true");
      } catch {
        // Ignore storage errors and continue success flow.
      }
      reset();
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-md">
        <div className="gradient-cta px-6 py-5 text-primary-foreground">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase backdrop-blur">
            <Flame className="h-3.5 w-3.5" /> Wait!
          </div>
          <DialogHeader className="mt-3 space-y-1 text-left">
            <DialogTitle className="text-2xl font-extrabold text-primary-foreground">
              TDS Delay = Penalty <AlertTriangle className="inline h-5 w-5" />
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/90">
              Abhi file karein aur interest bachayein. Avoid late fees and notices.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-6">
          <div>
            <Label htmlFor="ep-name">Name</Label>
            <Input id="ep-name" placeholder="Your name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="ep-mob">Mobile</Label>
            <Input id="ep-mob" type="tel" inputMode="numeric" placeholder="10-digit mobile" {...register("mobile")} />
            {errors.mobile && <p className="mt-1 text-xs text-destructive">{errors.mobile.message}</p>}
          </div>
          <div>
            <Label htmlFor="ep-email">Email</Label>
            <Input id="ep-email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "File My TDS Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitPopup;
