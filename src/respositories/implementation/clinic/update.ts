import { Clinic } from "../../../entities/clinic";
import { findClinicById } from "../../contracts/clinic/findById";
import { updateClinic } from "../../contracts/clinic/update";
import { prisma } from "../../prisma/prisma.service";
import { ZodError } from "zod";

export class update implements findClinicById, updateClinic {
    async find(id: string): Promise<Clinic> {
        try {
            const response = await prisma.clinic.findUnique({
                where: {
                    id
                }
            })

            const clinicFound: Clinic = new Clinic({
                addressId: response.addressId,
                cnpj: response.cnpj,
                name: response.name,
                phone: response.phone,
                id: response.id,
                bio: response.bio,
                email: response.email,
                password: response.password,
                pay: response.pay,

                photo: response.photo
            })
            return clinicFound

        } catch (error) {
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)

        }
    }

    async update(datas: Clinic): Promise<Clinic> {
        try {
            const response = await prisma.clinic.update({
                where: {
                    id: datas.id
                },
                data: {
                    name: datas.name,
                    phone: datas.phone,
                    cnpj: datas.cnpj,
                }
            })

            const returAfterUpdate: Clinic = new Clinic({
                addressId: response.addressId,
                cnpj: response.cnpj,
                name: response.name,
                phone: response.phone,
                id: response.id,
                bio: response.bio,
                email: response.email,
                password: response.password,
                photo: response.photo,
                pay: response.pay

            })

            return returAfterUpdate

        } catch (error: unknown) {
            let message = 'Failed update clinic'

            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}