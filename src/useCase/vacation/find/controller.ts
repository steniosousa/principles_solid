import { Request, Response } from "express";
import { ZodError } from "zod";
import { findVacationUseCase } from "./useCase";

export class findVacationController {
    constructor(private readonly iUseCase: findVacationUseCase) { }
    async execute(req: any, res: Response) {
        try {
            const vacations = await this.iUseCase.find(req.user.id)
            res.status(200).send(vacations)
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            let message = "Não foi possível criar férias"
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
            res.status(400).json(errorMessage)
        }
    }
}