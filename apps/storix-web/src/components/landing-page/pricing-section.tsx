import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="bg-muted/30 relative w-full overflow-hidden py-20 md:py-32"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>

      <div className="relative container mx-auto max-w-screen-xl px-4 md:px-6">
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
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            Choose the plan that's right for your business. All plans include a
            14-day free trial.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="monthly" className="rounded-full px-6">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annually" className="rounded-full px-6">
                  Annually (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="monthly">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$29",
                    description: "Perfect for small teams and startups.",
                    features: [
                      "Up to 5 team members",
                      "Basic analytics",
                      "5GB storage",
                      "Email support",
                    ],
                    cta: "Start Free Trial",
                  },
                  {
                    name: "Professional",
                    price: "$79",
                    description: "Ideal for growing businesses.",
                    features: [
                      "Up to 20 team members",
                      "Advanced analytics",
                      "25GB storage",
                      "Priority email support",
                      "API access",
                    ],
                    cta: "Start Free Trial",
                    popular: true,
                  },
                  {
                    name: "Enterprise",
                    price: "$199",
                    description: "For large organizations with complex needs.",
                    features: [
                      "Unlimited team members",
                      "Custom analytics",
                      "Unlimited storage",
                      "24/7 phone & email support",
                      "Advanced API access",
                      "Custom integrations",
                    ],
                    cta: "Contact Sales",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative h-full overflow-hidden ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="flex h-full flex-col p-6">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            /month
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          {plan.description}
                        </p>
                        <ul className="my-6 flex-grow space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="text-primary mr-2 size-4" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="annually">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$23",
                    description: "Perfect for small teams and startups.",
                    features: [
                      "Up to 5 team members",
                      "Basic analytics",
                      "5GB storage",
                      "Email support",
                    ],
                    cta: "Start Free Trial",
                  },
                  {
                    name: "Professional",
                    price: "$63",
                    description: "Ideal for growing businesses.",
                    features: [
                      "Up to 20 team members",
                      "Advanced analytics",
                      "25GB storage",
                      "Priority email support",
                      "API access",
                    ],
                    cta: "Start Free Trial",
                    popular: true,
                  },
                  {
                    name: "Enterprise",
                    price: "$159",
                    description: "For large organizations with complex needs.",
                    features: [
                      "Unlimited team members",
                      "Custom analytics",
                      "Unlimited storage",
                      "24/7 phone & email support",
                      "Advanced API access",
                      "Custom integrations",
                    ],
                    cta: "Contact Sales",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative h-full overflow-hidden ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} from-background to-muted/10 bg-gradient-to-b backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="flex h-full flex-col p-6">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            /month
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          {plan.description}
                        </p>
                        <ul className="my-6 flex-grow space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="text-primary mr-2 size-4" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-auto w-full rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
