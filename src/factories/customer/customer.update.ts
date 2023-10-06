import { CustomerUpdate } from "../../respositories/implementation/customer/customer.update";
import { JsonServerCreateCustomer } from "../../respositories/implementation/customer/json.server.customer";
import { CustomerUpdateController } from "../../useCase/costumer/update/customer.update.controller";
import { CustomerUpdateUseCase } from "../../useCase/costumer/update/customer.update.useCase";

export function UpdateCustomer(){
    const IUpdate = new CustomerUpdate()
    const iUpdateUseCase = new CustomerUpdateUseCase(IUpdate, IUpdate)
    const iController =  new CustomerUpdateController(iUpdateUseCase)
    return iController
}