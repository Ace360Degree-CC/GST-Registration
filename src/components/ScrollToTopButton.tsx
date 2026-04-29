import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  // Show button after scroll
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // show after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-40 right-6 z-40 h-12 w-12 rounded-full bg-primary text-white transition hover:scale-110 md:right-8 md:bottom-24"
    >
      <ArrowUp className="h-5 w-5 mx-auto" />
    </button>
  );
};
