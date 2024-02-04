import { findVacationImplementation } from "../../respositories/implementation/vacation/find"
import { findVacationController } from "../../useCase/vacation/find/controller"
import { findVacationUseCase } from "../../useCase/vacation/find/useCase"

export function findVacationFactore() {
    const iImplementation = new findVacationImplementation()
    const iUseCase = new findVacationUseCase(iImplementation)
    const iController = new findVacationController(iUseCase)
    return iController
}