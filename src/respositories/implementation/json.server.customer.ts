import { Customer } from "../../entities/costumer";
import { default as axios } from 'axios'
import { saveCustomer } from "../costumer/costumer.save.repository";
import { FindByEmailRepositories } from "../costumer/costumer.repository";
import bcrypt from 'bcryptjs'
export class JsonServerCreateCustomer implements saveCustomer, FindByEmailRepositories {
    async findByEmail(email: string): Promise<Customer | null> {
        const  response = await axios.get(`http://localhost:3000/Customers?email=${email}`)
        const customerFound:Customer = response.data[0]
        if (!customerFound) return null

        const customer = new Customer({
            email: customerFound.email,
            name: customerFound.name,
            password: customerFound.password,
            phone: customerFound.phone,
            clinicId: customerFound.clinicId,
            profileImg:customerFound.profileImg,
        })
         return customer
    }

    async save(customer: Customer): Promise<void> {

        const hashPassword = await bcrypt.hash(customer.password,10)

        await axios.post('http://localhost:3000/Customers/', {
                email: customer.email,
                clinicId: customer.clinicId,
                name: customer.name,
                phone: customer.phone,
                password:hashPassword
        })
    }

}