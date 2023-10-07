import bcrypt from 'bcryptjs'
import { LoginContract } from "./login.contract";

export class Login implements LoginContract {
    async login(bdPass: string, password: string): Promise<Boolean | null> {
        const matchPassword = await bcrypt.compare(password, bdPass)

        if (!matchPassword) return null


        return matchPassword
    }
}