import { z } from "zod";

export const updateImageDentistSchema = z.object({
    file: z.string()
})