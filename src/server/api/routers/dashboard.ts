import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createFolderSchema } from "@/lib/zod-schema";
import { z } from "zod";

const dashboardRouter = createTRPCRouter({
  getRootFolder: protectedProcedure.query(async ({ ctx }) => {
    try {
      const rootFolder = await ctx.db.folder.findFirst({
        where: {
          userId: ctx.session.user.id,
          name: { equals: "home" },
        },
      });

      return rootFolder;
    } catch (err) {
      console.error("Failed to fetch root folder: ", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch root folder",
      });
    }
  }),

  getFoldersAndFilesAccordingToPath: protectedProcedure
    .input(z.object({ path: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const folders = await ctx.db.folder.findMany({
          where: {
            userId: ctx.session.user.id,
            path: { equals: input.path },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const files = await ctx.db.file.findMany({
          where: {
            parentPath: { equals: input.path },
            folder: {
              userId: ctx.session.user.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return {
          folders: folders,
          files: files,
        };
      } catch (err) {
        console.error("Failed to fetch level one folders: ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to level one fetch folders",
        });
      }
    }),

  // this api returns the particular folder's data like files and subfolders
  getFoldersAndFilesUsingFolderId: protectedProcedure
    .input(z.object({ folderId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const foldersAndFiles = await ctx.db.folder.findUnique({
          where: {
            userId: ctx.session.user.id,
            id: input.folderId,
          },
          include: {
            subfolders: true,
            files: true,
          },
        });

        return foldersAndFiles;
      } catch (err) {
        console.error("Failed to fetch files: ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch files",
        });
      }
    }),

  createFolder: protectedProcedure
    .input(createFolderSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, path, parentId } = input;

      try {
        await ctx.db.folder.create({
          data: {
            name: name,
            path: path,
            parentId: parentId,
            userId: ctx.session.user.id,
          },
        });

        return {
          message: `${name} folder created.`,
        };
      } catch (err) {
        console.error("Failed to create folder: ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create folder",
        });
      }
    }),
});

export default dashboardRouter;
