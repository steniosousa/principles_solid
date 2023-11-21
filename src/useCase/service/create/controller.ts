import { Request, Response } from "express";
import { serviceUseCase } from "./useCase";

export class serviceController {
    constructor(private readonly iserviceUseCase: serviceUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const sucess = await this.iserviceUseCase.execute(req)
            res.status(200).json(sucess)
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}