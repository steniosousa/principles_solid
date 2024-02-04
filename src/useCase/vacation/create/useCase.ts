import { createVacation } from "../../../respositories/contracts/vacation/createVacation"

export class createVacationUseCase {
    constructor(private readonly icreateVacation: createVacation) { }
    async create(start: Date, end: Date, reason: string, doctorId: string) {
        try {
            const createVacation = await this.icreateVacation.create(start, end, reason, doctorId)
            if (!createVacation) {
                throw new Error('Não foi possível agendar férias')
            }
            return createVacation
        } catch (error) {
            let message = "Não foi possível agendar as férias"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }
}