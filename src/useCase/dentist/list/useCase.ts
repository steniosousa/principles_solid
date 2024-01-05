import { listDentist } from "../../../respositories/contracts/dentist/list";

export class ListDentistService {
    constructor(private readonly ilistDentist: listDentist) { }
    async list(clinicId: string) {
        try {
            const listDentists = await this.ilistDentist.list(clinicId)
            return listDentists
        } catch (error: unknown) {

            let message = "Não foi possível listar professional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }
}