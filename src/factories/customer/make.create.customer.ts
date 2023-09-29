import { JsonServerCreateCustomer } from "../../respositories/implementation/json.server.customer";
import { CreateCustomerController } from "../../useCase/costumer/create/create.costumer.controller";
import { CustomerUseCase } from "../../useCase/costumer/create/create.costumer.useCase";

export function MakeCustomerFactore() {
    const iJsonServerCreateCustomer = new JsonServerCreateCustomer()
    const iCustomerUseCase = new CustomerUseCase(iJsonServerCreateCustomer, iJsonServerCreateCustomer)
    const iController = new CreateCustomerController(iCustomerUseCase)
    return iController
}