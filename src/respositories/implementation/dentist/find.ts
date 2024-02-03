import { ZodError } from "zod";
import { Dentist } from "../../../entities/dentist";
import { findDentistById } from "../../contracts/dentist/findById";
import { prisma } from "../../prisma/prisma.service";

export class FindDentistById implements findDentistById {
    async findById(id: string): Promise<Partial<Dentist>> {
        try {
            const foundDentist = await prisma.doctor.findUnique({
                where: {
                    id
                },
                select: {
                    name: true,
                    phone: true,
                    email: true,
                    photo: true,
                    _count:{
                        select:{
                            appointments:true,
                            doctorServices:true
                        }
                    },
                }
            })
            if (!foundDentist) return null
            return foundDentist
        } catch (error) {
            let message = "Erro";
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}