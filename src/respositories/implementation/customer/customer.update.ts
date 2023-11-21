import axios from "axios";
import { FindById } from "../../contracts/customer/customer.FindById";
import { customerUpdate } from "../../contracts/customer/customer.update";
import { Customer } from "../../../entities/costumer";
import { prisma } from "../../prisma/prisma.service";

export class CustomerUpdate implements customerUpdate, FindById {
    async Find(customerId: string): Promise<null | Customer> {
        try {
            const response = await prisma.customers.findUnique({
                where: {
                    id: customerId
                }
            })
            if (!response) {
                return null
            }
            const customerFound: Customer = new Customer({
                clinicId: response.clinicId,
                email: response.email,
                name: response.name,
                password: response.password,
                phone: response.phone,
                id: response.id
            })
            return customerFound

        } catch {
            throw new Error('failure to find customer')
        }
    }
    async update(customerId: string, customer: Customer): Promise<Customer | null> {
        try {
            const response = await prisma.customers.update({
                where: {
                    id: customerId
                },
                data: {
                    email: customer.email,
                    clinicId: customer.clinicId,
                    name: customer.name,
                    phone: customer.phone,
                }
            })

            return response

        } catch (error) {
            throw new Error('Failed to update datas')
        }

    }
}