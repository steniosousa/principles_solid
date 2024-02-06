import { Response } from "express";
import { UpdateDentistUseCase } from "./useCase";

export class updateDentistController {
    constructor(private readonly iUseCase: UpdateDentistUseCase) { }

    async execute(req: any, res: Response) {
        try {
            const id = req.body.doctorId ? req.body.doctorId : req.user.id
            console.log(req.body)
            const updateDoctor = await this.iUseCase.execute(req.body, id)
            res.status(200).send(updateDoctor)

        } catch (error: unknown) {
            let message = "Falha ao atualizar profissional"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }
    }
}