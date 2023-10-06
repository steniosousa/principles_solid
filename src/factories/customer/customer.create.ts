import { JsonServerCreateCustomer } from "../../respositories/implementation/customer/json.server.customer";
import { CreateCustomerController } from "../../useCase/customer/create/create.costumer.controller";
import { CustomerUseCase } from "../../useCase/customer/create/create.costumer.useCase";

export function MakeCustomerFactore() {
    const iJsonServerCreateCustomer = new JsonServerCreateCustomer()
    const iCustomerUseCase = new CustomerUseCase(iJsonServerCreateCustomer, iJsonServerCreateCustomer)
    const iController = new CreateCustomerController(iCustomerUseCase)
    return iController
}