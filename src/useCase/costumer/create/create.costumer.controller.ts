import { Request, Response } from 'express';
import { CustomerUseCase } from './create.costumer.useCase';
import { MakeCustomerFindByEmila } from '../../../factories/customer/costumer.makeCustomer';
import { CustomerSave } from '../../../factories/customer/customer.save';

export class CreateCustomerController {
    async execute(req: Request, res: Response): Promise<void> {
        const { clinicId, name, password, email, phone } = req.body
        const iMakeCustomerFindByEmila = new MakeCustomerFindByEmila()
        const iCustomerSave = new CustomerSave()
        iCustomerSave.save({
            clinicId,
            email,
            name,
            password,
            phone,
        })

        iMakeCustomerFindByEmila.findByEmail(email)

        try{
            const iCustomerUseCase = new CustomerUseCase(iMakeCustomerFindByEmila, iCustomerSave)
            const process = await iCustomerUseCase.execute({
                clinicId,
                email,
                name,
                password,
                phone
            })
            console.log(process)
            res.status(200).json(process)

        }catch(err){
            console.log(err)
            res.status(400).json()
        }
       



    }
}