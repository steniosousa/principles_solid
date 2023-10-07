import { Request } from "express";
import { findByEmail } from "../../../respositories/contracts/dentist/findByEmail";
import { createDentist } from "../../../respositories/contracts/dentist/create";
import { findById } from "../../../respositories/contracts/clinic/findById";
import { Dentist } from "../../../entities/dentist";

export class useCase {
    constructor(
        private readonly findByEmailDentist: findByEmail,
        private readonly findByEmailClinic: findById,
        private readonly createDentist: createDentist
    ) { }

    async execute(req: Request) {
        const { email, name, password, clinicId } = req.body
        try {
            const dentistAlreadyExist = await this.findByEmailDentist.findDentis(email)
            if (dentistAlreadyExist) throw new Error('Professional already exist')

            const clinicExist = await this.findByEmailClinic.find(clinicId)
            if (!clinicExist) throw new Error('Clinic not found')


            const newDentist = new Dentist({
                email,
                name,
                password,
                clinicId
            })

            await this.createDentist.create(newDentist)


        } catch (error: unknown) {
            let message = "Unable to create professional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}