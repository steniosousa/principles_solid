import { CustomerUpdate } from "../../respositories/implementation/customer/customer.update";
import { JsonServerCreateCustomer } from "../../respositories/implementation/customer/json.server.customer";
import { CustomerUpdateController } from "../../useCase/customer/update/controller";
import { CustomerUpdateUseCase } from "../../useCase/customer/update/useCase";

export function UpdateCustomer(){
    const IUpdate = new CustomerUpdate()
    const iUpdateUseCase = new CustomerUpdateUseCase(IUpdate, IUpdate)
    const iController =  new CustomerUpdateController(iUpdateUseCase)
    return iController
}