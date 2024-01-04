import { create } from "../../respositories/implementation/dentist/create";
import { controller } from "../../useCase/dentist/create/controller";
import { useCase } from "../../useCase/dentist/create/useCase";

export function createDentist() {
    const iImplementation = new create()
    const iUseCase = new useCase(iImplementation, iImplementation, iImplementation, iImplementation)
    const iController = new controller(iUseCase)
    return iController
}