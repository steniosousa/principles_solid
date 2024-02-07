import { ZodError } from "zod";
import { Dentist } from "../../../entities/dentist";
import { findDentistById } from "../../contracts/dentist/findById";
import { updateDentist } from "../../contracts/dentist/update";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
import { findByEmail } from "../../contracts/dentist/findByEmail";

interface body {
    room: number,
    name: string,
    password: string,
    email: string,
    active: Date,
    desactive: string
    doctorId: string
}
export class UpdateDentist implements updateDentist, findDentistById, findByEmail {
    async update(datas: body, doctorId: string): Promise<null> {
        if (datas.password) {
            const hashPassword = await bcrypt.hash(datas.password, 10)
            datas['password'] = hashPassword
        }
        if (datas.doctorId) {
            delete datas.doctorId
        }
        let desactive;
        if (datas.desactive == "smilify") {
            desactive = null
        }
        try {
            await prisma.doctor.update({
                where: {
                    id: doctorId
                },
                data: {
                    ...datas,
                    firstAccess: false,
                    desactive

                }
            })
            return null
        } catch (error) {
            let message = "Erro ao atualizar usuário";
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
    async findById(id: string): Promise<Partial<Dentist>> {

        try {
            const founDoctor = await prisma.doctor.findUnique({
                where: {
                    id
                },
                select: {
                    firstAccess: true,
                    desactive: true
                }
            })

            return founDoctor
        } catch (error) {
            let message = "Erro";
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async findDentis(email: string): Promise<Dentist> {
        try {
            const founDoctor = await prisma.doctor.findFirst({
                where: {
                    email
                },
            })
            const founClinic = await prisma.clinic.findFirst({
                where: {
                    email
                },
            })
            if (founClinic) {
                throw new Error("Informe um email diferente do anterior")
            }

            return founDoctor
        } catch (error) {
            let message = "Erro ao efetuar alteração";
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}