import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "../ui/card";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            Don't just take our word for it. See what our customers have to say
            about their experience.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote:
                "storix has transformed how we manage our projects. The automation features have saved us countless hours of manual work.",
              author: "Sarah Johnson",
              role: "Project Manager, TechCorp",
              rating: 5,
            },
            {
              quote:
                "The analytics dashboard provides insights we never had access to before. It's helped us make data-driven decisions that have improved our ROI.",
              author: "Michael Chen",
              role: "Marketing Director, GrowthLabs",
              rating: 5,
            },
            {
              quote:
                "Customer support is exceptional. Any time we've had an issue, the team has been quick to respond and resolve it. Couldn't ask for better service.",
              author: "Emily Rodriguez",
              role: "Operations Lead, StartupX",
              rating: 5,
            },
            {
              quote:
                "We've tried several similar solutions, but none compare to the ease of use and comprehensive features of storix. It's been a game-changer.",
              author: "David Kim",
              role: "CEO, InnovateNow",
              rating: 5,
            },
            {
              quote:
                "The collaboration tools have made remote work so much easier for our team. We're more productive than ever despite being spread across different time zones.",
              author: "Lisa Patel",
              role: "HR Director, RemoteFirst",
              rating: 5,
            },
            {
              quote:
                "Implementation was seamless, and the ROI was almost immediate. We've reduced our operational costs by 30% since switching to storix.",
              author: "James Wilson",
              role: "COO, ScaleUp Inc",
              rating: 5,
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="border-border/40 from-background to-muted/10 h-full overflow-hidden bg-gradient-to-b backdrop-blur transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, j) => (
                        <Star
                          key={j}
                          className="size-4 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                  </div>
                  <p className="mb-6 flex-grow text-lg">{testimonial.quote}</p>
                  <div className="border-border/40 mt-auto flex items-center gap-4 border-t pt-4">
                    <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-full font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
