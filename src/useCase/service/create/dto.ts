import { z } from 'zod'

export const serviceCreateDTO = z.object({
    name:z.string(),
    cost:z.string(),
})