import { LoginContract } from "../../respositories/contracts/login/login.contract";
import { FindByEmailRepositories } from "../../respositories/contracts/customer/costumer.repository";
import { JwtContract } from "../../respositories/contracts/login/jwt.contract";

export class LoginUseCase {
    constructor(
        private readonly login: LoginContract,
        private readonly findByEmail: FindByEmailRepositories,
        private readonly jwt: JwtContract

    ) { }
    async execute(password: string, email: string) {
        const accountExist = await this.findByEmail.findByEmail(email)
        if (!accountExist) throw new Error('Email ou senha inválidos')

        const customerLogin = await this.login.login(accountExist.password, password)
        if (!customerLogin) throw new Error("Email ou senha inválidos")
        const webToken = await this.jwt.sign(accountExist.id as string)
        return webToken
    }
}