import { JsonServerCreateCustomer } from "../../respositories/implementation/json.server.customer";
import { Login } from "../../respositories/contracts/login/login";
import { loginController } from "../../useCase/login/login.controller";
import { LoginUseCase } from "../../useCase/login/login.useCase";
import { JwtSecretToken } from "../../respositories/contracts/login/jwt.secret";

export function LoginFactore() {
    const iLogin = new Login()
    const IjwtToken = new JwtSecretToken()
    const iFindByEmail = new JsonServerCreateCustomer()
    const loginUseCase = new LoginUseCase(iLogin, iFindByEmail, IjwtToken)
    const iloginController = new loginController(loginUseCase)
    return iloginController
}