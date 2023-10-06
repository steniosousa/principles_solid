import { CustomerDeletion } from "../../respositories/implementation/customer/customer.deletion";
import { CustomerDeletionController } from "../../useCase/customer/deletion/controller";
import { CustomerDeletionUseCase } from "../../useCase/customer/deletion/useCase";

export function DeleteCustomer(){
    const iFindById = new CustomerDeletion()
    const iUseCase = new CustomerDeletionUseCase(iFindById)
    const iController = new CustomerDeletionController(iUseCase)

    return iController
}