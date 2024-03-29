import { Request, Response } from "express";
import { useCase } from "./useCase";

export class Controller {
    constructor(private readonly iUseCase: useCase) { }

    async execute(req: Request, res: Response) {
        try {
            await this.iUseCase.execute(req.body.id)
            res.status(200).send('')
        } catch (error: unknown) {

            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}