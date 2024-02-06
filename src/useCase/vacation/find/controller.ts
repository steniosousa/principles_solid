import { Request, Response } from "express";
import { ZodError } from "zod";
import { findVacationUseCase } from "./useCase";

export class findVacationController {
    constructor(private readonly iUseCase: findVacationUseCase) { }
    async execute(req: any, res: Response) {
        try {
            const id = req.headers.id ? req.headers.id :req.user.id
            const vacations = await this.iUseCase.find(id)
            res.status(200).send(vacations)
        } catch (error) {
            let message = "Não foi possível recuperar férias"
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}