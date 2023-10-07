import { ListClinics } from "../../respositories/implementation/clinic/list";
import { controller } from "../../useCase/clinic/list/controller";
import { useCase } from "../../useCase/clinic/list/useCase";

export function ListClinic() {
    const iImplementation = new ListClinics()
    const iUseCase = new useCase(iImplementation)
    const iController = new controller(iUseCase)
    return iController
}