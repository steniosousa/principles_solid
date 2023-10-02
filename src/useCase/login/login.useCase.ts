import { MakeLogin } from "../../respositories/authentication/make.auth";
import { FindByEmailRepositories } from "../../respositories/costumer/costumer.repository";

export class LoginUseCase {
    constructor(
        private readonly login:MakeLogin,
        private readonly findByEmail:FindByEmailRepositories
        ){}
    async execute(password:string, email:string){
        console.log(password,email)
        const accountExist = await this.findByEmail.findByEmail(email)
        
        const customerLogin = await this.login.login(password,email)
        if (!accountExist || !customerLogin) {
            throw new Error('Email ou senha inválidos')
        }
        
        return customerLogin
    }
}