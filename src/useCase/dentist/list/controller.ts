import { Response } from "express"
import { ListDentistService } from "./useCase"

export class ListDentistController {
    constructor(private readonly listDentist: ListDentistService) { }
    async execute(req: any, res: Response) {
        try {
            const doctors = await this.listDentist.list(req.user.id)
            res.status(200).send(doctors)
        } catch (error) {
            let message = 'Error'
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}