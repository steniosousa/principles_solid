import { Response } from "express"
import { FindDentist } from "./useCase"

export class FindDentistController {
    constructor(private readonly findDoctor: FindDentist) { }
    async execute(req: any, res: Response) {
        try {
            const id = req.headers.id ? req.headers.id : req.user.id
            const doctors = await this.findDoctor.execute(id)
            if (!doctors) {
                res.status(400).send("Profissional não encontrado")
                return
            }
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