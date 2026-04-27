import { Star } from "lucide-react";

const reviews = [
  {
    name: "pooja acharya",
    city: "Mumbai",
    text: "I approached Praveen Jain & team for GST Registration as a startup founder and had a fantastic experience. They guided me step-by-step, gave great advice.",
  },
  {
    name: "Piyush bairagi",
    city: "Pune",
    text: "Prompt service for Proprietorship GST and Udyam registration. I received both certificates on the same day with approval. Thank you for the service.",
  },
  {
    name: "Sushil Shinde",
    city: "Thane",
    text: "Excellent service from [PRAVEEN J and ASSOCIATESCA] My CA is professional, knowledgeable, and very supportive. Highly recommend!!!",
  },
  {
    name: "Vinay Pokharna",
    city: "Navi Mumbai",
    text: "Great advice, timely intervention and prompt work... First choice for GST related work.",
  },
];

const Trust = () => (
  <section className="py-14 md:py-20 bg-background">
    <div className="container px-4">
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Client Love
        </span>

        <h2
          className="text-2xl md:text-4xl mt-2"
          style={{ fontFamily: "Poppins, Inter, sans-serif" }}
        >
          1000+ Happy Clients · 5.0 Rating ⭐
        </h2>

        <div className="flex justify-center items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
          ))}
          <span className="ml-2 text-sm font-semibold">
            Rated 5.0 on Google
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="bg-card border rounded-xl p-5 shadow-card hover:shadow-elegant transition-smooth flex flex-col h-full"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>

            {/* Review Content (Flexible Area) */}
            <div className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 min-h-[90px]">
                "{r.text}"
              </p>
            </div>

            {/* Bottom Section (Always Aligned) */}
            <div className="flex items-center gap-3 pt-3 border-t mt-auto">
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