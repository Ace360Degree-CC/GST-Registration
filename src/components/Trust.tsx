import { Star } from "lucide-react";

const reviews = [
  { name: "Rohit Sharma", city: "Mumbai", text: "GST mil gaya in 4 days! Praveen sir ne har step pe guide kiya. Highly recommend." },
  { name: "Priya Mehta", city: "Pune", text: "Pvt Ltd registration was super smooth. Team is responsive and professional." },
  { name: "Aman Verma", city: "Thane", text: "Best CA firm! Accounting bhi inhi se karwata hoon. No headache." },
  { name: "Sneha Patil", city: "Navi Mumbai", text: "Hindi mein samjhate hain — first time business owner ke liye perfect." },
];

const Trust = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="container px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Client Love</span>
        <h2 className="text-2xl md:text-4xl mt-2" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>
          1000+ Happy Clients · 5.0 Rating ⭐
        </h2>
        <div className="flex justify-center items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
          <span className="ml-2 text-sm font-semibold">Rated 5.0 on Google</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card border rounded-xl p-5 shadow-card hover:shadow-elegant transition-smooth">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
            </div>
            <p className="text-sm text-muted-foreground mb-4">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-3 border-t">
              <div className="h-10 w-10 rounded-full gradient-cta flex items-center justify-center text-primary-foreground font-bold">
                {r.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Trust;
