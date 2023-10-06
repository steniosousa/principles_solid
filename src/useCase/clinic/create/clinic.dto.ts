import { z } from 'zod'

export const clinicCreateDTO = z.object({
    cep: z.string(),
    street: z.string(),
    number: z.number(),
    country: z.string(),
    district: z.string(),
    city: z.string(),
    name:z.string()
})