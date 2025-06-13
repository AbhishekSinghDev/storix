import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="w-full overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="relative container mx-auto max-w-full px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-full text-center"
        >
          <Badge
            className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Launching Soon
          </Badge>
          <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Elevate Your Workflow with storix
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            The all-in-one platform that helps teams collaborate, automate, and
            deliver exceptional results. Streamline your processes and focus on
            what matters most.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 rounded-full px-8 text-base">
              Start Free Trial
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-8 text-base"
            >
              Book a Demo
            </Button>
          </div>
          <div className="text-muted-foreground mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Check className="text-primary size-4" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="text-primary size-4" />
              <span>14-day trial</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="text-primary size-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="border-border/40 from-background to-muted/20 overflow-hidden rounded-xl border bg-gradient-to-b shadow-2xl">
            <img
              src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
              width={1280}
              height={720}
              alt="storix dashboard"
              className="h-auto w-full"
              //   priority
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10"></div>
          </div>
          <div className="from-primary/30 to-secondary/30 absolute -right-6 -bottom-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br opacity-70 blur-3xl"></div>
          <div className="from-secondary/30 to-primary/30 absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br opacity-70 blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
