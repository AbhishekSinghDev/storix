import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "../ui/button";

const CtaSection = () => {
  return (
    <section className="from-primary to-primary/80 text-primary-foreground relative w-full overflow-hidden bg-gradient-to-br py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative container mx-auto max-w-screen-xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{
            once: true,
            amount: 0.2, // Trigger when 20% of the element is visible
          }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-[700px] md:text-xl">
            Join thousands of satisfied customers who have streamlined their
            processes and boosted productivity with our platform.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-full px-8 text-base"
            >
              Start Free Trial
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white bg-transparent px-8 text-base text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="text-primary-foreground/80 mt-4 text-sm">
            No credit card required. 14-day free trial. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
