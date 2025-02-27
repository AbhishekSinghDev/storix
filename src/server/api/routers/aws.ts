/* eslint-disable  @typescript-eslint/await-thenable*/

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  getPresignedUrl,
  getPrivateFileUrl,
  getPublicFileUrl,
} from "@/lib/functions";
import { STORIX_DIR_PREFIX } from "@/lib/constant";

export const awsRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        contentType: z.string(),
        publicAvailable: z.boolean().optional().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      const { fileName, contentType, publicAvailable } = input;
      const key = STORIX_DIR_PREFIX + "/admin/" + fileName;
      const { url } = await getPresignedUrl(
        key,
        contentType,
        publicAvailable ?? false,
      );
      return { url, key };
    }),

  getPublicFileUrl: protectedProcedure
    .input(z.object({ fileKey: z.string() }))
    .mutation(async ({ input }) => {
      const { fileKey } = input;
      //
      return await getPublicFileUrl(fileKey);
    }),

  getPrivateFileUrl: protectedProcedure
    .input(z.object({ fileKey: z.string(), expiry: z.number() }))
    .mutation(async ({ input }) => {
      const { fileKey, expiry } = input;
      const resp = await getPrivateFileUrl(fileKey, expiry);
      if (resp?.error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      return resp;
    }),
});
