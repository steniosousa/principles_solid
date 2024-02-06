import { deleteVacationImplementation } from "../../respositories/implementation/vacation/delete";
import { deleteVacationController } from "../../useCase/vacation/delete/controller";
import { deleteVacationUseCase } from "../../useCase/vacation/delete/useCase";

export function deleteVacationFactore() {
    const iImplementation = new deleteVacationImplementation()
    const iUseCase = new deleteVacationUseCase(iImplementation)
    const iController = new deleteVacationController(iUseCase)
    return iController
}