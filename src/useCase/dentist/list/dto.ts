import { z } from "zod";

export const listDentistSchema = z.object({
    page: z.number(),

})