import { deleteClinicImplementation } from "../../respositories/implementation/clinic/delete";
import { Controller } from "../../useCase/clinic/delete/controller";
import { useCase } from "../../useCase/clinic/delete/useCase";

export function DeleteClinic() {
    const iImplementation = new deleteClinicImplementation()
    const iUseCase = new useCase(iImplementation,iImplementation)
    const iController = new Controller(iUseCase)
    return iController
}