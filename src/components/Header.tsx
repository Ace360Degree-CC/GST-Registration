import logo from "@/assets/logo.jpg";
import { Phone } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b shadow-sm">
    <div className="container flex items-center justify-between h-16 px-4">
      <a href="/" className="flex items-center gap-2">
        <img src={logo} alt="Praveen J & Associates – Chartered Accountants" className="h-10 md:h-12 w-auto" />
      </a>
      <a
        href="tel:+919999999999"
        className="flex items-center gap-2 text-sm md:text-base font-semibold text-primary hover:text-primary-dark transition-smooth"
      >
        <Phone className="h-4 w-4" />
        <span className="hidden sm:inline">Call CA Now</span>
        <span className="sm:hidden">Call</span>
      </a>
    </div>
  </header>
);

export default Header;
