import axios from "axios";
import { FindById } from "../../contracts/customer/customer.FindById";
import { customerUpdate } from "../../contracts/customer/customer.update";
import { Customer } from "../../../entities/costumer";

export class CustomerUpdate implements customerUpdate, FindById {
    async Find(customerId: string): Promise<null | Customer> {
        try{
            const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Customers/${customerId}`)
            const customerFound: Customer = response.data
            if (!customerFound) {
                return null
            }
            const returnCustomer = new Customer({
                clinicId: customerFound.clinicId,
                email: customerFound.email,
                name: customerFound.name,
                password: customerFound.password,
                phone: customerFound.phone,
                profileImg: customerFound.profileImg,
                id: customerFound.id
            },customerFound.id)
    
    
            return returnCustomer

        }catch{
            throw new Error('failure to find customer')
        }
    }
    async update(customerId: string, customer: Customer): Promise<Customer | null> {
        try {
            const response = await axios.patch(`${process.env.DATABASE_JSON_SERVER}/Customers/${customerId}`, {
                email: customer.email,
                clinicId: customer.clinicId,
                name: customer.name,
                phone: customer.phone,
            });


            return response.data

        } catch (error) {
            throw new Error('Failed to update datas')
        }

    }
}