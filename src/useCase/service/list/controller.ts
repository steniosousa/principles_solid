import { Request, Response } from "express";
import { listUseCase } from './useCase'

export class listServicesController {
    constructor(private readonly service: listUseCase) { }
    async execute(req: Request, res: Response) {
        const { clinicId } = req.params
        try {
            const list = await this.service.list(clinicId)
            res.status(200).json(list)
        }
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}