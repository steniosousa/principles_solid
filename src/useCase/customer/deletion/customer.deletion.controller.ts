import { Response } from "express";
import { CustomerDeletionUseCase } from "./customer.deletion.useCase";

export class CustomerDeletionController {
    constructor(private readonly useCase: CustomerDeletionUseCase) { }

    async execute(req: any, res: Response) {
        try {
            await this.useCase.execute(req.user.id)
            res.status(200).send('Successful deletion')
        }
        catch {
            res.status(400).send('Failed deletion')

        }
    }
}