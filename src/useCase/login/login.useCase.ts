import { LoginContract } from "../../respositories/contracts/login/login.contract";
import { JwtContract } from "../../respositories/contracts/login/jwt.contract";
import { findByEmail } from "../../respositories/contracts/dentist/findByEmail";
import { findByCNPJ } from "../../respositories/contracts/clinic/findByCNPJ";

export class LoginUseCase {
    constructor(
        private readonly login: LoginContract,
        private readonly findByEmail: findByEmail,
        private readonly findByCNPJ: findByCNPJ,
        private readonly jwt: JwtContract

    ) { }
    async execute(password: string, email: string) {
        const accountExist = await this.findByEmail.findDentis(email)
        const foundClinicWithCNPJ = await this.findByCNPJ.findClinic(email)
        if (accountExist) {
            const customerLogin = await this.login.login(accountExist.password, password)
            if (!customerLogin) throw new Error("Email ou senha inválidos")
            const webToken = await this.jwt.sign(accountExist.id as string)
            const returnForFront = {
                webToken,
                role: "dentist"
            }
            if (accountExist.firstAccess) {
                const firstAccessUser = {
                    webToken,
                    firstAccess: accountExist.firstAccess,
                    role: "dentist"
                }
                return firstAccessUser
            }
            return returnForFront
        } else if (foundClinicWithCNPJ) {
            const clinicLogin = await this.login.login(foundClinicWithCNPJ.password, password)
            if (!clinicLogin) throw new Error("Email ou senha inválidos")
            const webToken = await this.jwt.sign(foundClinicWithCNPJ.id as string)
            const returnForFront = {
                webToken,
                role: "clinic"
            }
            return returnForFront
        }
        else {

            throw new Error('Email ou senha inválidos')
        }
    }
}