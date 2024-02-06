import { deleteVacation } from "../../../respositories/contracts/vacation/deleteVacation";

export class deleteVacationUseCase {
    constructor(private readonly ideleteVacation: deleteVacation) { }
    async delete(id: string) {
        try {
            await this.ideleteVacation.delete(id)
        } catch (error) {
            let message = "Não foi possível deletar agenda"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}