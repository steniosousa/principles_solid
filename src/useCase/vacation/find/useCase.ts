import { findVacation } from "../../../respositories/contracts/vacation/findVacation"

export class findVacationUseCase {
    constructor(private readonly iFindVacation: findVacation) { }
    async find(doctorId: string) {
        try {
            const findVacation = await this.iFindVacation.find(doctorId)
            if (!findVacation) {
                throw new Error('Não há férias agendadas')
            }
            return findVacation
        } catch (error) {
            let message = "Não foi possível agendar as férias"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }
}