import { List } from "../../../respositories/contracts/clinic/list";

export class useCase {
    constructor(private readonly iList: List) { }

    async execute() {
        try {
            const allClinic = await this.iList.list()
            return allClinic
        } catch (error: unknown) {
            let message = 'Unable to recover clinics'
            if (error instanceof Error) {
                message = error.message
            }

            throw new Error(message)
        }
    }
}