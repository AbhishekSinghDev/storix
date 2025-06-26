"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import {
  CloudLightning,
  CloudUpload,
  HardDrive,
  Search,
  Server,
  Users,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const features = [
  {
    title: "Bring Your Own Storage",
    description:
      "Connect any AWS S3 or S3-compatible bucket in minutes. Retain full control and avoid vendor lock-in.",
    icon: <CloudUpload className="size-5" />,
  },
  {
    title: "Ultra-fast Uploads",
    description:
      "Lightning-fast uploads using AWS Transfer Acceleration and parallel multipart uploads.",
    icon: <CloudLightning className="size-5" />,
  },
  {
    title: "Multi-Cloud Flexibility",
    description:
      "Add multiple cloud providers to optimize storage performance, cost, and compliance.",
    icon: <Server className="size-5" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Share folders and files with fine-grained permissions and activity tracking. (Coming soon)",
    icon: <Users className="size-5" />,
  },
  {
    title: "Offline Access & Versioning",
    description:
      "Local caching for offline use with version history for file recovery. (Future feature)",
    icon: <HardDrive className="size-5" />,
  },
  {
    title: "File Previews & Search",
    description:
      "Browse and preview images, PDFs, and media with quick search by name and content.",
    icon: <Search className="size-5" />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Enterprise-Grade Cloud Storage Features
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Storix offers a comprehensive feature set tailored for developers
            and teams who need secure, fast, and flexible cloud storage
            solutions.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
