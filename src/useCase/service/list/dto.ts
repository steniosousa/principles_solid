import { z } from 'zod'

export const serviceListDTO = z.object({
    clinicId:z.string(),
})