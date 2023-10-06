import { Response } from "express";
import { CustomerDeletionUseCase } from "./useCase";

export class CustomerDeletionController {
    constructor(private readonly useCase: CustomerDeletionUseCase) { }

    async execute(req: any, res: Response) {
        try {
            await this.useCase.execute(req.user.id)
            res.status(200).send('Successful deletion')
        }
        catch (error: unknown) {

            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}