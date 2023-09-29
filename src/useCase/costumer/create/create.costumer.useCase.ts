import { Customer } from "../../../entities/costumer"
import {  FindByEmailRepositories } from "../../../respositories/costumer/costumer.repository"
import { saveCustomer } from "../../../respositories/costumer/costumer.save.repository"
import { createCustomerDto } from "./create.costumer.dto"

export class CustomerUseCase {
    constructor(
        private CustomerRepository: FindByEmailRepositories,
        private saveCustomer:saveCustomer
    ) { }

    async execute(data: createCustomerDto) {
        const CustomerExist = await this.CustomerRepository.findByEmail(data.email)
        if (CustomerExist.length != 0) {
            throw new Error('Customer exists')
        }
        const newCustomer = new Customer(data)
        await this.saveCustomer.save(newCustomer)
        return newCustomer
    }
}