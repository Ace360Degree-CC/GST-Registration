import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Documents from "@/components/Documents";
import Trust from "@/components/Trust";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ExitPopup from "@/components/ExitPopup";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problems />
      <Solution />
      <Services />
      <Process />
      <Documents />
      <Trust />
      <FinalCTA />
      <FAQ />
      <Footer />

      <FloatingActions />
      <ScrollToTopButton />
      <ExitPopup />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            name: "Praveen J & Associates",
            description: "Chartered Accountants offering GST Registration, Company Setup & Accounting services in Mumbai.",
            areaServed: ["Mumbai", "Navi Mumbai", "Thane", "Pune"],
            telephone: "+91-8169887643",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "1000" },
          }),
        }}
      />
    </main>
  );
};

export default Index;
