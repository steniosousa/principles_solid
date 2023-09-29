import { Customer } from "../../../entities/costumer"
import { FindByEmailRepositories } from "../../../respositories/costumer/costumer.repository"
import { saveCustomer } from "../../../respositories/costumer/costumer.save.repository"
import { createCustomerDto } from "./create.costumer.dto"

export class CustomerUseCase {
    constructor(
        private CustomerRepository: FindByEmailRepositories,
        private saveCustomer: saveCustomer
    ) { }

    async execute(customer: createCustomerDto) {
        const CustomerExist = await this.CustomerRepository.findByEmail(customer.email)
        if (CustomerExist) {
            throw new Error('Customer exists')
        }
        const newCustomer = new Customer(customer)
        await this.saveCustomer.save(newCustomer)
        return newCustomer
    }
}