import { createVacationImplementation } from "../../respositories/implementation/vacation/create";
import { createVacationController } from "../../useCase/vacation/create/controller";
import { createVacationUseCase } from "../../useCase/vacation/create/useCase";

export function createVacationFactore() {
    const iImplementation = new createVacationImplementation()
    const iUseCase = new createVacationUseCase(iImplementation)
    const iController = new createVacationController(iUseCase)
    return iController
}