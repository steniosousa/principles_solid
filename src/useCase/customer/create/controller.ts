import { Request, Response } from 'express';
import { CustomerUseCase } from './useCase';

export class CreateCustomerController {
    constructor(private readonly service: CustomerUseCase) { }
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { clinicId, name, password, email, phone } = req.body
            const profilePicture = req.body.profileImg

            const iCustomerUseCase = await this.service.execute({
                clinicId,
                email,
                name,
                password,
                phone,
            })
            res.status(200).json(iCustomerUseCase)
        } catch (error: unknown) {

            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }




    }
}