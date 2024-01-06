import { Response } from "express"
import { FindDentist } from "./useCase"

export class FindDentistController {
    constructor(private readonly findDoctor: FindDentist) { }
    async execute(req: any, res: Response) {
        try {
            const doctors = await this.findDoctor.execute(req.user.id)
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