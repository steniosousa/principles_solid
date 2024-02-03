import { z } from "zod";

export const updateDentistSchema = z.object({
    email: z.string().email().optional(),
    room: z.number().optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    phone:z.string().optional(),
    bio:z.string().optional(),
})