import { z } from "zod";

export const createDentistSchema = z.object({
    name:z.string(),
    password:z.string(),
    email:z.string().email(),
    clinicId:z.string(),

})