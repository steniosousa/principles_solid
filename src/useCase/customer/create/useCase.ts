import { Customer } from "../../../entities/costumer"
import { findById } from "../../../respositories/contracts/clinic/findById"
import { FindByEmailRepositories } from "../../../respositories/contracts/customer/costumer.repository"
import { saveCustomer } from "../../../respositories/contracts/customer/costumer.save.repository"

export class CustomerUseCase {
    constructor(
        private CustomerRepository: FindByEmailRepositories,
        private saveCustomer: saveCustomer,
        private ifindById:findById
    ) { }

    async execute(customer: Customer) {
        const clinicAlreadyExist = await this.ifindById.find(customer.clinicId)
        if(!clinicAlreadyExist) throw new Error('Clinic not found')
        
        const CustomerExist = await this.CustomerRepository.findByEmail(customer.email)
        if (CustomerExist) {
            throw new Error('Customer exists')
        }

        const newCustomer = new Customer(customer)
        await this.saveCustomer.save(newCustomer)
        return newCustomer
    }
}