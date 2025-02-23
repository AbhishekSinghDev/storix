import { z } from "zod";

// TODO: improve schema after implementing 'credentials' login using next-auth
export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
