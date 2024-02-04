import { z } from 'zod'

export const createVocationDto = z.object({
    start: z.date().safeParse("2022-01-12T00:00:00.000Z"),
    end:  z.date().safeParse("2022-01-12T00:00:00.000Z"),
    reason: z.string(),
    userId: z.string()
})