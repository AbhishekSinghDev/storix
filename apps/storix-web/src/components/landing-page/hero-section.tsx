"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CloudLightning, CloudUpload, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge
            className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Your Cloud, Your Keys
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Next-Generation Cloud Storage with Storix
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bring your own AWS S3 storage and enjoy enterprise-grade performance
            with 99.999999999% durability. No vendor lock-in, just blazing-fast
            uploads with modern web UI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full h-12 px-8 text-base">
              Connect Your Storage
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-8 text-base"
            >
              View Live Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CloudLightning className="size-4 text-primary" />
              <span>Ultra-fast uploads</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CloudUpload className="size-4 text-primary" />
              <span>Bring your own storage</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="size-4 text-primary" />
              <span>Secure & durable</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
            <img
              src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
              width={1280}
              height={720}
              alt="Storix cloud storage dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
          <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
