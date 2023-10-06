import { z } from "zod";

export const updateCustomerSchema = z.object({
    clinicId: z.string().optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
})