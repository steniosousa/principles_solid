import { listDentist } from "../../contracts/dentist/list";
import { prisma } from "../../prisma/prisma.service";

export class ListDentistImplementation implements listDentist {
    async list(clinicId: string): Promise<any> {
        try {
            const professioais = await prisma.clinic.findMany({
                where: {
                    id: clinicId
                },
                select: {
                    doctors: {
                        select: {
                            _count: true,
                            name: true,
                            room: true,
                        },
                    }
                },
                take: 5
            })
            if (!professioais) return null
            return professioais
        } catch (error: unknown) {

            let message = "Não foi possível listar profissional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}