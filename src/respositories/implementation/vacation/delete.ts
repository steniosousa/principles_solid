import { ZodError } from "zod";
import { deleteVacation } from "../../contracts/vacation/deleteVacation";
import { prisma } from "../../prisma/prisma.service";

export class deleteVacationImplementation implements deleteVacation {
    async delete(id: string): Promise<void> {
        try {
            await prisma.vacation.delete({
                where: {
                    id
                }

            })
        } catch (error) {
            let message = "Não foi possível deletar agenda"
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}