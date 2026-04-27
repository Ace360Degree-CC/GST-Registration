import { CreditCard, IdCard, Briefcase, MapPin } from "lucide-react";

const docs = [
  { icon: IdCard, title: "PAN Card", desc: "Proprietor / Directors ka PAN" },
  { icon: CreditCard, title: "Aadhaar Card", desc: "Mobile linked Aadhaar" },
  { icon: Briefcase, title: "Business Details", desc: "Trade name, nature of business" },
  { icon: MapPin, title: "Address Proof", desc: "Electricity bill / Rent agreement" },
];

const Documents = () => (
  <section className="py-14 md:py-20 bg-secondary">
    <div className="container px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Documents Required</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Bas Itne Documents Chahiye 📂
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {docs.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-card rounded-xl p-5 border shadow-card flex items-start gap-3">
            <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Documents;
