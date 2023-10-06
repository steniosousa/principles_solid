import { Customer } from "../../../entities/costumer";
import { FindById } from "../../../respositories/contracts/customer/customer.FindById";
import { customerUpdate } from "../../../respositories/contracts/customer/customer.update";

export class CustomerUpdateUseCase {
    constructor(private readonly iUpdate: customerUpdate,
        private readonly findById: FindById) { }

    async execute(customerId: string, newDatas: Customer) {
        try {
            const foundCustomer = await this.findById.Find(customerId)
            if (!foundCustomer) throw new Error('Customer not found')
            const customerEdit = await this.iUpdate.update(foundCustomer.id, newDatas)
            return customerEdit
        }
        catch (error:unknown) {
            let message = "Update failed"
            if(error instanceof Error){
                message = error.message
            }
            throw new Error(message)
        }

    }
}