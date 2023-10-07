import { update } from "../../respositories/implementation/clinic/update";
import { controller } from "../../useCase/clinic/update/controller";
import { useCase } from "../../useCase/clinic/update/useCase";

export function Update(){
    const iImplementation = new update()
    const iUseCase = new useCase(iImplementation,iImplementation)
    const iController = new controller(iUseCase)
    return iController
}