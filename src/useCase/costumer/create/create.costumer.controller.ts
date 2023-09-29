import { Request, Response } from 'express';
import { CustomerUseCase } from './create.costumer.useCase';

export class CreateCustomerController {
    constructor(
        private readonly createCustomerUseCase: CustomerUseCase
    ) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { clinicId, name, password, email, phone } = req.body

        try {
            const process = await this.createCustomerUseCase.execute({
                clinicId,
                email,
                name,
                password,
                phone
            })
            res.status(200).json(process)
        } catch (error: unknown) {
            console.log(error)
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}