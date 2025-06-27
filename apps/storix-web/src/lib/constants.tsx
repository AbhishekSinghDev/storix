import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const SIDEBAR_LINKS = {
  user: {
    name: "abhishek",
    email: "abhishek@storix.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Connect Your Storage",
    description:
      "Sign up and securely link your AWS S3 or S3-compatible storage. Your credentials stay yours - we use time-limited presigned URLs for secure access.",
  },
  {
    step: "02",
    title: "Upload & Organize Files",
    description:
      "Drag-and-drop files with lightning-fast uploads using multipart transfers and AWS acceleration. Create folders, preview content in real-time.",
  },
  {
    step: "03",
    title: "Access & Share Anywhere",
    description:
      "Your files sync seamlessly across devices and remain accessible via standard S3 APIs. Share with colleagues and control permissions.",
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    monthlyPrice: "$5",
    annualPrice: "$4",
    annualTotal: "$48/year",
    description: "Ideal for personal use and small projects.",
    features: [
      "50 GB storage",
      "Basic file operations",
      "Folder organization",
      "File previews",
      "Community email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    monthlyPrice: "$15",
    annualPrice: "$12",
    annualTotal: "$144/year",
    description: "Perfect for freelancers and growing teams.",
    features: [
      "500 GB storage",
      "Everything in Starter",
      "Accelerated uploads",
      "Advanced search",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "$30",
    annualPrice: "$24",
    annualTotal: "$288/year",
    description: "For businesses that need scale and custom features.",
    features: [
      "Unlimited storage",
      "All Professional features",
      "Advanced sharing & activity logs",
      "Single sign-on (SSO)",
      "Premium support with SLA",
    ],
    cta: "Start Free Trial",
  },
];

export const FAQ_DATA = [
  {
    question: "Is my data safe with Storix?",
    answer:
      "Absolutely. Storix stores your files in your own AWS S3 buckets, which are designed for 99.999999999% durability. S3 automatically replicates data across multiple facilities. We also use industry-standard encryption (TLS in transit, and you can enable AWS's at-rest encryption). Since Storix only uses presigned URLs, we never store your AWS secret keys.",
  },
  {
    question: "Which cloud providers does Storix support?",
    answer:
      "Currently Storix fully supports Amazon S3 and any S3-compatible storage. We're actively working on multi-cloud support – soon you'll be able to connect Google Cloud Storage, Azure Blob Storage, and more. This lets you leverage the unique benefits of each provider.",
  },
  {
    question: "How is Storix faster than other drives?",
    answer:
      "We optimize uploads with AWS backend features. By splitting files into parts and using S3 Transfer Acceleration, Storix can cut upload time by up to 61% compared to a single-threaded upload. In practice, large file uploads feel much snappier than standard uploaders.",
  },
  {
    question: "Do I keep my AWS keys?",
    answer:
      "Yes – you always hold your own keys. Storix never stores long-term credentials. Instead, when you connect Storix to your bucket, our backend generates temporary presigned URLs for each file operation. Those URLs are valid only for the duration of the upload/download, ensuring your account stays secure.",
  },
  {
    question: "What about pricing?",
    answer:
      "You pay Storix for the software (monthly or annual plan) and pay your cloud provider for storage usage. For example, AWS charges $0.023/GB for S3 Standard. There are no hidden fees from Storix – you get all software features for a flat rate, while continuing to pay your cloud storage bill.",
  },
];
