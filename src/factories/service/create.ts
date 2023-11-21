import { createServiceImplementation } from "../../respositories/implementation/service/create";
import { serviceController } from "../../useCase/service/create/controller";
import { serviceUseCase } from "../../useCase/service/create/useCase";

export function createServiceFactore() {
    const iImplementation = new createServiceImplementation()
    const iUseCase = new serviceUseCase(iImplementation, iImplementation)
    const iController = new serviceController(iUseCase)
    return iController
}