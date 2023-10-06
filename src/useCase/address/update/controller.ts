import { Request, Response } from "express";
import { useCase } from "./useCase";

export class Controller {
    constructor(private readonly iUseCase: useCase) { }


    async execute(req: Request, res: Response) {
        try {
            await this.iUseCase.execute(req)
            res.status(200).send('')
        } catch (error: unknown) {
            let message = "Undefined Error"

            if (error instanceof Error) {
                message = error.message
            }

            res.status(400).send(message)
        }

    }
}