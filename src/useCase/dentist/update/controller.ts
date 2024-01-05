import { Request, Response } from "express";
import { UpdateDentistUseCase } from "./useCase";

export class controller {
    constructor(private readonly iUseCase: UpdateDentistUseCase) { }

    async execute(req: any, res: Response) {
        try {
            const updateDoctor = await this.iUseCase.execute(req.body, req.user.id)
            res.status(200).send(updateDoctor)

        } catch (error: unknown) {
            let message = "Failed to save profissional"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }
    }
}