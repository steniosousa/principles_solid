import { Customer } from "../../../entities/costumer"
import { FindByEmailRepositories } from "../../../respositories/contracts/costumer/costumer.repository"
import { saveCustomer } from "../../../respositories/contracts/costumer/costumer.save.repository"

export class CustomerUseCase {
    constructor(
        private CustomerRepository: FindByEmailRepositories,
        private saveCustomer: saveCustomer
    ) { }

    async execute(customer: Customer) {
        const CustomerExist = await this.CustomerRepository.findByEmail(customer.email)
        if (CustomerExist) {
            throw new Error('Customer exists')
        }
        const newCustomer = new Customer(customer)
        await this.saveCustomer.save(newCustomer)
        return newCustomer
    }
}