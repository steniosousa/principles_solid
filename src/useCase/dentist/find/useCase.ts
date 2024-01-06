import { findDentistById } from "../../../respositories/contracts/dentist/findById";

export class FindDentist {
    constructor(private readonly ifindDentistById: findDentistById) { }
    async execute(dentistId: string) {
        try {
            const foundDentist = await this.ifindDentistById.findById(dentistId)
            if (!foundDentist) throw new Error("Profissional não encontrado")
            return foundDentist
        } catch (error: unknown) {

            let message = "Não foi possível listar professional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}