import { Request, Response } from "express";
import { ZodError } from "zod";
import { deleteVacationUseCase } from "./useCase";

export class deleteVacationController {
    constructor(private readonly iUseCase: deleteVacationUseCase) { }
    async execute(req: Request, res: Response) {
        try {
            await this.iUseCase.delete(req.body.id)
            res.status(200).send('Calendário alterado')
        } catch (error) {
            let message = "Não foi possível deletar agenda"
            if (error instanceof ZodError) {
                message = error.message
            }
            res.status(400).json(message)
        }
    }
}