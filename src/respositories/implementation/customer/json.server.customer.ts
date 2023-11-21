import { Customer } from "../../../entities/costumer";
import { default as axios } from 'axios'
import { saveCustomer } from "../../contracts/customer/costumer.save.repository";
import { FindByEmailRepositories } from "../../contracts/customer/costumer.repository";
import bcrypt from 'bcryptjs'
import { findById } from "../../contracts/clinic/findById";
import { Clinic } from "../../../entities/clinic";
import { prisma } from "../../prisma/prisma.service";
import { ZodError } from "zod";

export class JsonServerCreateCustomer implements saveCustomer, FindByEmailRepositories, findById {
    async findByEmail(email: string): Promise<Customer | null> {
        const response = await prisma.customers.findFirst({
            where: {
                email
            }
        })
        if (!response) return null
        return response
    }

    async save(customer: Customer): Promise<void> {
        try {
            const hashPassword = await bcrypt.hash(customer.password, 10)

            await prisma.customers.create({
                data: {
                    email: customer.email,
                    clinicId: customer.clinicId,
                    name: customer.name,
                    phone: customer.phone,
                    password: hashPassword,
                }
            })

        } catch (error) {
            let message
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }


    async find(id: string): Promise<Clinic> {
        try {
            const response = await prisma.clinic.findUnique({
                where: {
                    id
                }
            })
            const returClini: Clinic = new Clinic({
                adressId: response.addresId,
                cnpj: response.cnpj,
                name: response.name,
                phone: response.phone,
                id: response.id
            })
            return returClini
        } catch (error) {
            let message
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }

}