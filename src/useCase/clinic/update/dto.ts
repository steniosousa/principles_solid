import { z } from "zod";

export const updateClinicSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    cnpj: z.string().optional(),
    bio: z.string().optional()
})