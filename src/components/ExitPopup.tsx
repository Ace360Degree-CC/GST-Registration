import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ExitPopup = () => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };
    const timer = setTimeout(() => {
      if (!shown) { setOpen(true); setShown(true); }
    }, 45000);
    document.addEventListener("mouseout", handleLeave);
    return () => {
      document.removeEventListener("mouseout", handleLeave);
      clearTimeout(timer);
    };
  }, [shown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(mobile)) {
      toast.error("Please enter valid name and 10-digit mobile");
      return;
    }
    toast.success("✅ Thanks! CA will call you shortly.");
    setOpen(false);
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
