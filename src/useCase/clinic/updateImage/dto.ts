import { z } from "zod";

export const updateImageClinicSchema = z.object({
    file: z.string()
})