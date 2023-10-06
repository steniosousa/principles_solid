import { z } from "zod";

export const deletionCustomerSchema = z.object({
    Authorization: z.string(),
})