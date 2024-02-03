import { UpdateDentist } from "../../respositories/implementation/dentist/update";
import { updateDentistController } from "../../useCase/dentist/update/controller";
import { UpdateDentistUseCase } from "../../useCase/dentist/update/useCase";

export function updateDentist() {
    const iImplementation = new UpdateDentist()
    const iUseCase = new UpdateDentistUseCase(iImplementation, iImplementation,iImplementation)
    const iController = new updateDentistController(iUseCase)
    return iController
}