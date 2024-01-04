import { z } from "zod";

export const createDentistSchema = z.object({
    email: z.string().email(),
    room: z.number()
})