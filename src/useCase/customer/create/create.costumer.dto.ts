import { z } from "zod";

export const createCustomerSchema = z.object({
    clinicId: z.string(),
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
    phone: z.string(),
})