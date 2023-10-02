import axios from "axios";
import { Customer } from "../../entities/costumer";
import bcrypt from 'bcryptjs'
import { MakeLogin } from "../authentication/make.auth";

export class Login implements MakeLogin {
    async login(password: string, email: string): Promise<Customer | null> {
        const response = await axios.get(`http://localhost:3000/Customers?email=${email}`)
        const customerFound: Customer = response.data[0]
        if (!customerFound) return null

        const matchPassword = await bcrypt.compare(password, customerFound.password)

        if (matchPassword) {
            const makeCustomer = new Customer({
                clinicId: customerFound.clinicId,
                email: customerFound.email,
                name: customerFound.name,
                password: customerFound.password,
                phone: customerFound.phone,
                profileImg: customerFound.profileImg
            })
            return makeCustomer
        }

        return null
    }
}