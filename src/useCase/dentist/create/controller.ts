import { Request, Response } from "express";
import { useCase } from "./useCase";

export class controller {
    constructor(private readonly iUseCase: useCase) { }

    async execute(req: Request, res: Response) {
        try {
            const { email, room } = req.body
            const newDentist = await this.iUseCase.execute(email, room, req)
            res.status(200).send(newDentist)

        } catch (error: unknown) {
            let message = "Failed to save profissional"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }
    }
}