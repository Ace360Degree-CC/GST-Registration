import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ExitPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const previousScrollPercentRef = useRef(0);
  const hasInitializedScrollRef = useRef(false);
  const pendingMilestonesRef = useRef(0);
  const hasShownExitIntentRef = useRef(false);
  const hasShownTimerRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrollPercent = Math.max(0, Math.min(100, (window.scrollY / scrollableHeight) * 100));

      if (!hasInitializedScrollRef.current) {
        previousScrollPercentRef.current = scrollPercent;
        hasInitializedScrollRef.current = true;
        return;
      }

      const previousPercent = previousScrollPercentRef.current;

      if (scrollPercent > previousPercent) {
        for (let threshold = 25; threshold <= 100; threshold += 25) {
          if (previousPercent < threshold && scrollPercent >= threshold) {
            pendingMilestonesRef.current += 1;
          }
        }
      } else if (scrollPercent < previousPercent) {
        for (let threshold = 50; threshold <= 100; threshold += 50) {
          if (previousPercent > threshold && scrollPercent <= threshold) {
            pendingMilestonesRef.current += 1;
          }
        }
      }

      previousScrollPercentRef.current = scrollPercent;

      if (pendingMilestonesRef.current > 0 && !open) {
        pendingMilestonesRef.current -= 1;
        setOpen(true);
      }
    };

    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntentRef.current) {
        setOpen(true);
        hasShownExitIntentRef.current = true;
      }
    };

    const timer = setTimeout(() => {
      if (!hasShownTimerRef.current) {
        setOpen(true);
        hasShownTimerRef.current = true;
      }
    }, 45000);

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    document.addEventListener("mouseout", handleLeave);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleLeave);
      clearTimeout(timer);
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(mobile)) {
      toast.error("Please enter valid name and 10-digit mobile");
      return;
    }
    toast.success("✅ Thanks! CA will call you shortly.");
    setOpen(false);
    navigate("/thank-you");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
            Business Start Karne Se Pehle Rukiye 🚀
          </DialogTitle>
          <DialogDescription>
            Free 15-minute CA consultation — no obligation. Apna number chhodiye, hum call karenge.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3 pt-2">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="h-12" maxLength={60} />
          <Input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            className="h-12"
          />
          <Button type="submit" variant="cta" size="xl" className="w-full">
            👉 Start My Registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitPopup;
