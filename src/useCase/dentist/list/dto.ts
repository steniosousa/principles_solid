import { z } from "zod";

export const listDentistSchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
    clinicId: z.string(),
    room: z.string()

})