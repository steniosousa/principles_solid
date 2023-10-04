import { Customer } from "../../../entities/costumer";
import bcrypt from 'bcryptjs'
import { LoginContract } from "./login.contract";

export class Login implements LoginContract {
    async login(customer: Customer, password: string): Promise<Customer | null> {
        const matchPassword = await bcrypt.compare(password, customer.password)

        if (!matchPassword) return null

        const accountExist = new Customer({
            clinicId: customer.clinicId,
            email: customer.email,
            name: customer.email,
            password: customer.password,
            phone: customer.phone,
            profileImg: customer.profileImg,
            id:customer.id
        },customer.id)


        return accountExist
    }
}