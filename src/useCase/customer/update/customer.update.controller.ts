import { Request, Response } from "express";
import { CustomerUpdateUseCase } from "./customer.update.useCase";

export class CustomerUpdateController {
    constructor(private readonly updateUseCase: CustomerUpdateUseCase) { }

    async execute(req: any, res: Response) {
        const customerId = req.user.id
        try {
            const responseEdit = await this.updateUseCase.execute(customerId as string, req.body)
            if (req.body.password && responseEdit) {
                responseEdit.password = "Passwords are edited through the put metado"
                res.status(200).send(responseEdit)
            }
            res.status(200).send(responseEdit)
        }
        catch (error) {
            res.status(400).send('Update fail')
        }
    }
}