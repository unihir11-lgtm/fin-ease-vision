import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "FinEase completely transformed how I manage my money. The insights are incredible and the interface is beautiful.",
    author: "Sarah Chen",
    role: "Entrepreneur",
    rating: 5,
  },
  {
    quote: "Finally, a finance app that doesn't feel like a chore. I actually enjoy tracking my spending now.",
    author: "Michael Torres",
    role: "Product Designer",
    rating: 5,
  },
  {
    quote: "The investment tools helped me start building wealth without needing to be a financial expert. Highly recommend!",
    author: "Emma Williams",
    role: "Marketing Director",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Loved by thousands
          </h2>
          <p className="text-foreground/60 text-lg">
            See what our users have to say about their experience with FinEase.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl bg-background border border-border/50 hover:border-border transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-muted/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-secondary">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-foreground/50">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
