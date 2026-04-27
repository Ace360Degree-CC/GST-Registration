import { FileQuestion, FileX, Building2, UserX } from "lucide-react";

const items = [
  { icon: FileQuestion, title: "GST process confusing", desc: "Portal samajhna mushkil, errors aate rahte hain." },
  { icon: FileX, title: "Documents samajh nahi aate", desc: "Kya chahiye, kaise dena hai — koi nahi batata." },
  { icon: Building2, title: "Company structure confusion", desc: "Pvt Ltd, LLP ya OPC — kaunsa best hai?" },
  { icon: UserX, title: "CA support nahi milta", desc: "Sawaal puchho toh phone bhi nahi uthate." },
];

const Problems = () => (
  <section className="py-14 md:py-20 bg-secondary">
    <div className="container px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">The Problem</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          Business Start Karne Mein Yeh Problems Aati Hai 😟
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-card rounded-xl p-5 shadow-card hover:shadow-elegant transition-smooth border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-base mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Problems;
