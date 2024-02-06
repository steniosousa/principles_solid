import { z } from 'zod'

export const createVocationDto = z.object({
    start: z.string(),
    end: z.string(),
    reason: z.string(),
    userId: z.string()
})