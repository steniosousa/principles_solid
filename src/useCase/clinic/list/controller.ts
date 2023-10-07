import { Request, Response } from "express";
import { useCase } from "./useCase";

export class controller {
    constructor(private readonly useCase: useCase) { }

    async execute(req: Request, res: Response) {
        try {
            const clinics = await this.useCase.execute()

            res.status(200).send(clinics)
        } catch (error: unknown) {
            let message = 'Unable to recover clinics'
            if (error instanceof Error) {
                message = error.message
            }

            res.status(400).send(message)
        }
    }
}