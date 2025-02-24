import { Clock, Folder, Star, Trash } from "lucide-react";

export const SIDEBAR_LINKS = {
  navMain: [
    {
      title: "Folder 1",
      url: "#",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Folder 2",
      url: "#",
      icon: Folder,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Folder 3",
      url: "#",
      icon: Folder,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  tabs: [
    {
      name: "Recent",
      url: "#",
      icon: Clock,
    },
    {
      name: "Starred",
      url: "#",
      icon: Star,
    },
    {
      name: "Bin",
      url: "#",
      icon: Trash,
    },
  ],
};
