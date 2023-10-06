import { Customer } from "../../../entities/costumer";
import { FindById } from "../../../respositories/contracts/costumer/customer.FindById";
import { customerUpdate } from "../../../respositories/contracts/costumer/customer.update";

export class CustomerUpdateUseCase {
    constructor(private readonly iUpdate: customerUpdate,
        private readonly findById: FindById) { }

    async execute(customerId: string, newDatas: Customer) {
        try {
            const foundCustomer = await this.findById.Find(customerId)
            if (!foundCustomer?.id) throw new Error('Customer not found')
            const customerEdit = await this.iUpdate.update(foundCustomer.id, newDatas)
            return customerEdit
        }
        catch (error) {
            throw new Error('Update failed')
        }

    }
}