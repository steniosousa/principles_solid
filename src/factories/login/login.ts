import { JsonServerCreateCustomer } from "../../respositories/implementation/json.server.customer";
import { Login } from "../../respositories/implementation/login";
import { loginController } from "../../useCase/login/login.controller";
import { LoginUseCase } from "../../useCase/login/login.useCase";

export function LoginFactore() {
    const iLogin = new Login()
    const iFindByEmail = new JsonServerCreateCustomer()
    const loginUseCase = new LoginUseCase(iLogin,iFindByEmail)
    const iloginController = new loginController(loginUseCase)
    return iloginController
}