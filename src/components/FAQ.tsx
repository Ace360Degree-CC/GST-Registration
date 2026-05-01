import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "GST registration kab zaroori hai?", a: "Agar aapka annual turnover ₹40 lakh (goods) ya ₹20 lakh (services) se zyada hai, toh GST mandatory hai. Inter-state supply ya e-commerce sellers ke liye day-1 se zaroori hai." },
  { q: "Pvt Ltd ya LLP — kaunsa choose karein?", a: "Pvt Ltd funding aur scaling ke liye best hai. LLP small partnerships ke liye zyada compliance-friendly hota hai. Partnership is good.for normal trading business <br /> Sole proprietorship is good for signal person freelancer.<br /> Hum aapki situation ke hisab se sahi structure suggest karte hain." },
  { q: "GST registration ka timeline kya hai?", a: "Documents complete hone ke baad usually 3–7 working days mein GSTIN mil jata hai.<br /> Kya aap pure India mein services dete ho?<br />Haan! Hum Mumbai, Navi Mumbai, Thane, Pune ke alawa pure India mein online services provide karte hain." },
  // { q: "Aapki fees kya hai?", a: "GST registration ₹999 se start hota hai. Company registration ₹4,999 se. Accounting plans ₹1,499/month se." },
  { q: "Kya aap pure India mein services dete ho?", a: "Haan! Hum Mumbai, Navi Mumbai, Thane, Pune ke alawa pure India mein online services provide karte hain." },
];

const normalizeAnswer = (answer: string) => answer.replace(/<br\s*\/?\s*>/gi, "\n");

const FAQ = () => (
  <section className="py-14 md:py-20 bg-secondary">
    <div className="container px-4 max-w-3xl">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Frequently Asked Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-xl px-5 shadow-card">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {normalizeAnswer(f.a)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
