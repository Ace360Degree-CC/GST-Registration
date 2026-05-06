import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/submitLead";

const schema = z.object({
  name: z.string().trim().min(2, "Enter name").max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "10-digit mobile"),
  email: z.string().trim().regex(/^\S+@\S+\.\S+$/, "Enter valid email"),
});

type FormData = z.infer<typeof schema>;
const LEAD_FORM_ENDPOINT = import.meta.env.VITE_LEAD_API_URL || "/api/leads";
const POPUP_THRESHOLDS = [30, 60] as const;

const ExitPopup = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastScrollPercentRef = useRef(0);
  const downTriggersRef = useRef<Record<number, boolean>>({ 30: false, 60: false });
  const upTriggersRef = useRef<Record<number, boolean>>({ 30: false, 60: false });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const getScrollPercent = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return 0;
      return (window.scrollY / scrollHeight) * 100;
    };

    const triggerPopup = () => {
      setOpen(true);
    };

    const handleScroll = () => {
      const current = getScrollPercent();
      const previous = lastScrollPercentRef.current;

      for (const threshold of POPUP_THRESHOLDS) {
        const crossedDown = previous < threshold && current >= threshold;
        if (crossedDown && !downTriggersRef.current[threshold]) {
          downTriggersRef.current[threshold] = true;
          triggerPopup();
          break;
        }
      }

      for (const threshold of POPUP_THRESHOLDS) {
        const crossedUp = previous > threshold && current <= threshold;
        if (crossedUp && !upTriggersRef.current[threshold]) {
          upTriggersRef.current[threshold] = true;
          triggerPopup();
          break;
        }
      }

      lastScrollPercentRef.current = current;
    };

    lastScrollPercentRef.current = getScrollPercent();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await submitLead(LEAD_FORM_ENDPOINT, {
        name: data.name.trim(),
        mobile: data.mobile,
        email: data.email.trim(),
        service: "GST Registration",
        stage: "Idea",
        formSource: "popup",
      });
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
      <DialogContent className="overflow-hidden border-zinc-200 bg-zinc-100 p-0 sm:max-w-[460px]">
        <div className="px-6 pb-5 pt-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-[34px] font-extrabold leading-8 tracking-tight text-zinc-800">
              Business Start Karne Se Pehle Rukiye 🚀
            </DialogTitle>
            <DialogDescription className="text-xs leading-5 text-zinc-500">
              Free 15-minute CA consultation - no obligation. Apna number chhodiye, hum call karenge.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 pb-6">
          <div>
            <Input
              id="ep-name"
              placeholder="Your Name"
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-1"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              id="ep-mob"
              type="tel"
              inputMode="numeric"
              placeholder="Mobile Number"
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-1"
              {...register("mobile")}
            />
            {errors.mobile && <p className="mt-1 text-xs text-destructive">{errors.mobile.message}</p>}
          </div>
          <div>
            <Input
              id="ep-email"
              type="email"
              placeholder="Email Address"
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-1"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full rounded-xl bg-red-600 text-base font-bold text-white shadow-none hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "👉 Start My Registration"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitPopup;
