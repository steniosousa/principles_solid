import { Request, Response } from "express";
import { useCase } from "./useCase";

export class controller {
    constructor(private readonly iUseCase: useCase) { }

    async execute(req: Request, res: Response) {
        try {
            await this.iUseCase.execute(req)
            res.status(200).send('Successful update')
        } catch (error: unknown) {
            let message = "Failed in update clinic"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }

    }
}