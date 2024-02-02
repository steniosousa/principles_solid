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
        private readonly ifindDentistById: findDentistById
    ) { }

    async execute(body: body, doctorId: string) {
        try {
            const verifyFirstAccess = await this.ifindDentistById.findById(doctorId)
            console.log(verifyFirstAccess)
            if (verifyFirstAccess.firstAccess && !body.password) {
                throw new Error("Informe nova senha para validar alteração")
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