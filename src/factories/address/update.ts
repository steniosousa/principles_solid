import { update } from "../../respositories/implementation/address/update";
import { Controller } from "../../useCase/address/update/controller";
import { useCase } from "../../useCase/address/update/useCase";

export function updateAddress(){
    const iImplementation = new update()
    const iUseCase = new useCase(iImplementation, iImplementation)
    const iController = new Controller(iUseCase)
    return iController

}