import { updateDentist } from "../../../respositories/contracts/dentist/update"

interface body {
    room: number,
    name: string,
    password: string,
    email: string,
}
export class UpdateDentistUseCase {
    constructor(
        private readonly iUpdate: updateDentist
    ) { }

    async execute(body: body, doctorId: string) {
        try {
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