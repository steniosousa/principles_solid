import { z } from 'zod'

export const serviceUpdateDTO = z.object({
    clinicId: z.string(),
    cost: z.string().optional(),
    name: z.string().optional(),
    serviceId: z.string(),
})