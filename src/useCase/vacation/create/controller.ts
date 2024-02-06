import {  Response } from "express";
import { createVacationUseCase } from "./useCase";
import { ZodError } from "zod";

export class createVacationController {
    constructor(private readonly iUseCase: createVacationUseCase) { }
    async execute(req: any, res: Response) {
        try {
            await this.iUseCase.create(req.body.start, req.body.end, req.body.reason, req.body.userId)
            res.status(200).send('Calendário alterado')
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            let message = "Não foi possível criar agenda"
            if (error instanceof ZodError) {
                message = error.message
            }
            res.status(400).json(errorMessage)
        }
    }
}