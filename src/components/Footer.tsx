import LeadForm from "./LeadForm";
import logo from "@/assets/logo.jpg";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer id="footer-form" className="bg-foreground text-background pt-14 md:pt-20 pb-6">
    <div className="container px-4 grid lg:grid-cols-2 gap-10">
      {/* Detailed form */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Get Free Consultation</span>
        <h2 className="text-2xl md:text-4xl mt-2 mb-2 text-background" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Ready To Start? Let's Talk 📞
        </h2>
        <p className="text-background/70 mb-5">Fill the form, we'll call you within 30 minutes.</p>
        <div className="bg-background text-foreground rounded-2xl p-5 md:p-6 shadow-float">
          <LeadForm variant="footer" />
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-6 lg:pl-8">
        <img src={logo} alt="Praveen J & Associates" className="h-14 w-auto bg-background rounded-lg p-2" />
        <p className="text-background/80 text-sm leading-relaxed max-w-md">
          Praveen J & Associates is a Mumbai-based Chartered Accountant firm helping
          entrepreneurs across India start and grow their businesses with GST,
          company registration, accounting & compliance services.
        </p>
        <div className="space-y-3 text-sm">
          <a href="tel:+918169887643" className="flex items-center gap-3 hover:text-accent transition-smooth">
            <Phone className="h-4 w-4" />+91 81698 87643
          </a>
          <a href="mailto:pravreena2026@gmail.com" className="flex items-center gap-3 hover:text-accent transition-smooth">
            <Mail className="h-4 w-4" /> pravreena2026@gmail.com
          </a>
          <p className="flex items-start gap-3 text-background/80">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            Serving Mumbai · Navi Mumbai · Thane · Pune · Pan-India
          </p>
        </div>
      </div>
    </div>
    <div className="container px-4 mt-12 pt-6 border-t border-background/10 text-center text-xs text-background/60">
      © {new Date().getFullYear()} Praveen J & Associates · Chartered Accountants. All rights reserved.
    </div>
  </footer>
);

export default Footer;
