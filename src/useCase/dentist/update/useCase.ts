import { findByEmail } from "../../../respositories/contracts/dentist/findByEmail"
import { findDentistById } from "../../../respositories/contracts/dentist/findById"
import { updateDentist } from "../../../respositories/contracts/dentist/update"

interface body {
    room: number,
    name: string,
    password: string,
    email: string,
}
export class UpdateDentistUseCase {
    constructor(
        private readonly iUpdate: updateDentist,
        private readonly ifindDentistById: findDentistById,
        private readonly ifindByEmail: findByEmail
    ) { }

    async execute(body: any, doctorId: string) {
        try {
            for (const chave in body) {
                if (body[`${chave}`] == '') {
                    delete body[`${chave}`]
                }
            }
            const verifyFirstAccess = await this.ifindDentistById.findById(doctorId)
            if (verifyFirstAccess.firstAccess && !body.password) {
                throw new Error("Informe nova senha para validar alteração")
            }
            if (body.email) {
                const emailAlredy = await this.ifindByEmail.findDentis(body.email)
                if (emailAlredy) {
                    throw new Error("Informe um email diferente do anterior")
                }
            }
            const updateDoctor = await this.iUpdate.update(body, doctorId)
            return updateDoctor

        } catch (error: unknown) {

            let message = "Unable to create professional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}