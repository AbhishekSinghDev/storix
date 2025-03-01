import { Clock, Folder, Star, Trash } from "lucide-react";
import type { MockFile, MockFolder } from "./types";

export const UPLOAD_DIALOG_STATE_KEY = "file_upload";
export const NEW_FOLDER_DIALOG_STATE_KEY = "new_folder";

export const STORIX_DIR_PREFIX = "/storix";

export const AWS_REGIONS = {
  "us-east-1": "US East (N. Virginia)",
  "us-east-2": "US East (Ohio)",
  "us-west-1": "US West (N. California)",
  "us-west-2": "US West (Oregon)",
  "af-south-1": "Africa (Cape Town)",
  "ap-east-1": "Asia Pacific (Hong Kong)",
  "ap-south-1": "Asia Pacific (Mumbai)",
  "ap-northeast-3": "Asia Pacific (Osaka)",
  "ap-northeast-2": "Asia Pacific (Seoul)",
  "ap-southeast-1": "Asia Pacific (Singapore)",
  "ap-southeast-2": "Asia Pacific (Sydney)",
  "ap-northeast-1": "Asia Pacific (Tokyo)",
  "ca-central-1": "Canada (Central)",
  "eu-central-1": "Europe (Frankfurt)",
  "eu-west-1": "Europe (Ireland)",
  "eu-west-2": "Europe (London)",
  "eu-south-1": "Europe (Milan)",
  "eu-west-3": "Europe (Paris)",
  "eu-north-1": "Europe (Stockholm)",
  "me-south-1": "Middle East (Bahrain)",
  "sa-east-1": "South America (São Paulo)",
} as const;

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

export const MOCK_FOLDERS = [
  {
    id: "folder1",
    name: "Documents",
    parentId: null,
    path: "/Documents",
    isPublic: false,
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
    userId: "user1",
    files: ["file1", "file2"],
  },
  {
    id: "folder2",
    name: "Images",
    parentId: null,
    path: "/Images",
    isPublic: false,
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
    userId: "user1",
    files: ["file3"],
  },
  {
    id: "folder3",
    name: "Subfolder",
    parentId: "folder1",
    path: "/Documents/Subfolder",
    isPublic: false,
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
    userId: "user1",
    files: ["file4"],
  },
];

export const MOCK_FILES = [
  {
    id: "file1",
    name: "report.pdf",
    type: "DOCUMENT",
    size: 1234567,
    url: "https://example.com/report.pdf",
    mimeType: "application/pdf",
    thumbnailUrl: null,
    metadata: null,
    isPublic: false,
    parentPath: "/Documents",
    extension: "pdf",
    folderId: "folder1",
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
  },
  {
    id: "file2",
    name: "presentation.pptx",
    type: "DOCUMENT",
    size: 8765432,
    url: "https://example.com/presentation.pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    thumbnailUrl: null,
    metadata: null,
    isPublic: false,
    parentPath: "/Documents",
    extension: "pptx",
    folderId: "folder1",
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
  },
  {
    id: "file3",
    name: "image1.jpg",
    type: "IMAGE",
    size: 543210,
    url: "https://example.com/image1.jpg",
    mimeType: "image/jpeg",
    thumbnailUrl: "https://example.com/image1_thumb.jpg",
    metadata: { width: 1920, height: 1080 },
    isPublic: false,
    parentPath: "/Images",
    extension: "jpg",
    folderId: "folder2",
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
  },
  {
    id: "file4",
    name: "document.txt",
    type: "DOCUMENT",
    size: 1024,
    url: "https://example.com/document.txt",
    mimeType: "text/plain",
    thumbnailUrl: null,
    metadata: null,
    isPublic: false,
    parentPath: "/Documents/Subfolder",
    extension: "txt",
    folderId: "folder3",
    archivedAt: null,
    deletedAt: null,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
  },
];

export const DASHBOARD_MOCK_FOLDERS: MockFolder[] = [
  { id: "1", name: "Documents", createdAt: "2024-01-15" },
  { id: "2", name: "Pictures", createdAt: "2024-01-16" },
  { id: "3", name: "Music", createdAt: "2024-01-17" },
  { id: "4", name: "Videos", createdAt: "2024-01-18" },
];

export const DASHBOARD_MOCK_FILES: MockFile[] = [
  {
    id: "1",
    name: "vacation.jpg",
    type: "IMAGE",
    size: 2500000,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "document.pdf",
    type: "DOCUMENT",
    size: 1200000,
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "song.mp3",
    type: "AUDIO",
    size: 4800000,
    createdAt: "2024-01-17",
  },
  {
    id: "4",
    name: "movie.mp4",
    type: "VIDEO",
    size: 15000000,
    createdAt: "2024-01-18",
  },
  {
    id: "5",
    name: "notes.txt",
    type: "DOCUMENT",
    size: 50000,
    createdAt: "2024-01-19",
  },
];

export const FILE_EXTENSIONS = {
  IMAGE: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".ico",
    ".svg",
    ".tiff",
    ".heif",
    ".heic",
  ],
  AUDIO: [
    ".mp3",
    ".wav",
    ".ogg",
    ".m4a",
    ".aac",
    ".wma",
    ".flac",
    ".alac",
    ".aiff",
    ".midi",
  ],
  VIDEO: [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".wmv",
    ".flv",
    ".mkv",
    ".m4v",
    ".3gp",
    ".3g2",
  ],
  DOCUMENT: [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
    ".ods",
    ".odp",
    ".txt",
    ".rtf",
    ".md",
    ".csv",
  ],
  ARCHIVE: [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
  CODE: [
    ".json",
    ".xml",
    ".html",
    ".css",
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".php",
  ],
};

export const ACCEPTED_MIME_TYPES = {
  // Images
  "image/*": FILE_EXTENSIONS.IMAGE,

  // Audio
  "audio/*": FILE_EXTENSIONS.AUDIO,

  // Video
  "video/*": FILE_EXTENSIONS.VIDEO,

  // Documents
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
  "text/plain": [".txt"],
  "text/markdown": [".md"],
  "text/csv": [".csv"],

  // Archives
  "application/zip": [".zip"],
  "application/x-rar-compressed": [".rar"],
  "application/x-7z-compressed": [".7z"],
  "application/x-tar": [".tar"],
  "application/gzip": [".gz"],

  // Code
  "application/json": [".json"],
  "text/xml": [".xml"],
  "text/html": [".html"],
  "text/css": [".css"],
  "text/javascript": [".js"],
  "text/typescript": [".ts"],
};

export const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024;
