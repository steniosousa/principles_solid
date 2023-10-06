import { z } from "zod";

export const deleteClinicSchema = z.object({
    id:z.string()
}) 