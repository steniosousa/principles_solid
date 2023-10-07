import { Customer } from "../../../entities/costumer";
import { default as axios } from 'axios'
import { saveCustomer } from "../../contracts/customer/costumer.save.repository";
import { FindByEmailRepositories } from "../../contracts/customer/costumer.repository";
import bcrypt from 'bcryptjs'
import { findById } from "../../contracts/clinic/findById";
import { Clinic } from "../../../entities/clinic";

export class JsonServerCreateCustomer implements saveCustomer, FindByEmailRepositories,findById {
    async findByEmail(email: string): Promise<Customer | null> {
        const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Customers?email=${email}`)
        const customerFound: Customer = response.data[0]
        if (!customerFound) return null
        return customerFound
    }

    async save(customer: Customer): Promise<void> {

        const hashPassword = await bcrypt.hash(customer.password, 10)

        await axios.post(`${process.env.DATABASE_JSON_SERVER}/Customers/`, {
            email: customer.email,
            clinicId: customer.clinicId,
            name: customer.name,
            phone: customer.phone,
            password: hashPassword,
            id:customer.id
        })
    }

    async find(id: string): Promise<Clinic> {
        try{
            const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic/${id}`)
            const returClini:Clinic = response.data
            return returClini
        }catch{
            throw new Error('Clinic not found')
        }
    }

}