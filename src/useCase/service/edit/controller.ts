import { Request, Response } from "express";
import { EditUseCase } from "./useCase";

export class editServiceController {
    constructor(private readonly iUseCase: EditUseCase) { }
    async execute(req: Request, res: Response) {
        try {
            const { coast, name, serviceId, clinicId } = req.body
            const edit = await this.iUseCase.edit(coast, name, serviceId, clinicId)
            res.status(200).send('Edition Success')

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}