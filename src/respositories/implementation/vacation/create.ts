import { ZodError } from "zod";
import { Vacation } from "../../../entities/vacation";
import { createVacation } from "../../contracts/vacation/createVacation";
import { prisma } from "../../prisma/prisma.service";

export class createVacationImplementation implements createVacation {
    async create(start: Date, end: Date, reason: string, doctorId: string): Promise<Vacation> {
        try {
            const createVacation = await prisma.vacation.create({
                data: {
                    finish: end,
                    reason,
                    start,
                    doctorId
                }
            })
            return createVacation
        } catch (error) {
            let message = "Não foi possível criar agenda"
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}