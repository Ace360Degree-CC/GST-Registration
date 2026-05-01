import logo from "@/assets/logo.jpg";
import { Phone } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b shadow-sm">
    <div className="container flex items-center justify-between h-16 px-4">
      <a href="/" className="flex items-center gap-2">
        <img src={logo} alt="Praveen J & Associates – Chartered Accountants" className="h-10 md:h-12 w-auto" />
      </a>
      
      <a
        href="tel:+918169887643"
        className="flex items-center gap-3 text-sm md:text-base font-semibold text-primary hover:text-primary-dark transition-smooth"
      >Phone:+918169887643 
        <Phone className="h-4 w-4" />
        <span className="hidden sm:inline" gap-1>Call CA Now</span>
        <span className="sm:hidden">Call</span>
      </a>
    </div>
  </header>
);

export default Header;
