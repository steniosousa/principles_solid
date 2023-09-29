import { Customer } from "../../../entities/costumer"
import { FindByEmailRepositories } from "../../../respositories/contracts/costumer/FindByEmail.repository"
import { SaveCustomer } from "../../../respositories/contracts/costumer/SaveCustomer.repository"
import { createCustomerDto } from "./create.costumer.dto"

export class CustomerUseCase {
    constructor(
        private readonly CustomerRepository: FindByEmailRepositories,
        private readonly saveCustomer: SaveCustomer
    ) {}

    async execute(data: createCustomerDto) {
        const customerAlreadyExits = await this.CustomerRepository.findByEmail(data.email)
        if (customerAlreadyExits) throw new Error('Customer exists')

        const newCustomer = new Customer(data)
        await this.saveCustomer.save(newCustomer)
        
        return newCustomer
    }
}