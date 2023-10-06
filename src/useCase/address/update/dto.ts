import { z } from "zod";

export const updateAddressSchema = z.object({
    id:z.string(),
    street:z.string().optional(),
    country:z.string().optional(),
    city:z.string().optional(),
    cep:z.string().optional(),
    district:z.string().optional(),
    number:z.number().optional()
})