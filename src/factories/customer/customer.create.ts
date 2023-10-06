import { JsonServerCreateCustomer } from "../../respositories/implementation/customer/json.server.customer";
import { CreateCustomerController } from "../../useCase/customer/create/controller";
import { CustomerUseCase } from "../../useCase/customer/create/useCase";

export function MakeCustomerFactore() {
    const iJsonServerCreateCustomer = new JsonServerCreateCustomer()
    const iCustomerUseCase = new CustomerUseCase(iJsonServerCreateCustomer, iJsonServerCreateCustomer)
    const iController = new CreateCustomerController(iCustomerUseCase)
    return iController
}