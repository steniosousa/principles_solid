import { ZodError } from "zod";
import { Vacation } from "../../../entities/vacation";
import { createVacation } from "../../contracts/vacation/createVacation";
import { prisma } from "../../prisma/prisma.service";
import { findVacation } from "../../contracts/vacation/findVacation";

export class findVacationImplementation implements findVacation {
    async find(doctorId: string): Promise<Vacation | null> {
        try {
            const findVacations = await prisma.vacation.findMany({
                where: {
                    doctorId
                },
                include: {
                    doctor: {
                        select: {
                            name: true, id: true
                        }
                    }
                }

            })
            const vacations: any = findVacations
            return vacations
        } catch (error) {
            let message = "Não foi possível encontrar agenda"
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}