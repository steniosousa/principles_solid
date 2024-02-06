import { z } from 'zod'

export const deleteVocationDto = z.object({
    id: z.string()
})