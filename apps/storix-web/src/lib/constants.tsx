import { BarChart, Layers, Shield, Star, Users, Zap } from "lucide-react";

export const FEATURES = [
  {
    title: "Smart Automation",
    description:
      "Automate repetitive tasks and workflows to save time and reduce errors.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with real-time data visualization and reporting.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Work together seamlessly with integrated communication tools.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Enterprise Security",
    description:
      "Keep your data safe with end-to-end encryption and compliance features.",
    icon: <Shield className="size-5" />,
  },
  {
    title: "Seamless Integration",
    description:
      "Connect with your favorite tools through our extensive API ecosystem.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our dedicated support team.",
    icon: <Star className="size-5" />,
  },
];

export const COMPANIES = [
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
  },
  {
    name: "Google",
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  {
    name: "Microsoft",
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
  },
  {
    name: "AWS",
    logo: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
  },
];
