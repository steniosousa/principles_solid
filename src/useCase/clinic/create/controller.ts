import { Request, Response } from "express";
import { ClinicUseCase } from "./useCase";

export class clinicController {
    constructor(private readonly iClinicUseCase: ClinicUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const sucess = await this.iClinicUseCase.execute(req)
            res.status(200).json(sucess)
        } catch (error){
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}