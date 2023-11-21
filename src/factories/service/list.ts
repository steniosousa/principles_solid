import { ListServicesImplementation } from "../../respositories/implementation/service/list";
import { listServicesController } from "../../useCase/service/list/controller";
import { listUseCase } from "../../useCase/service/list/useCase";

export function ListServiceFactore(){
    const iImplementation = new ListServicesImplementation()
    const iUseCase = new listUseCase(iImplementation)
    const iController = new listServicesController(iUseCase)
    return iController
}