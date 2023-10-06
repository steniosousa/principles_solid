import { z } from "zod";

export const addressValidateSchema = z.object({
    cep:z.string()
})