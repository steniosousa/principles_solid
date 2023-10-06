import { ClinicCreateImplementation } from "../../respositories/implementation/clinic/clinic.create";
import { clinicController } from "../../useCase/clinic/create/clinic.controller";
import { ClinicUseCase } from "../../useCase/clinic/create/clinic.useCase";

export function ClinicCreate(){
    const iClinicCreateImplementation = new ClinicCreateImplementation()
    const iUseCase = new ClinicUseCase(iClinicCreateImplementation, iClinicCreateImplementation,iClinicCreateImplementation,iClinicCreateImplementation,iClinicCreateImplementation,iClinicCreateImplementation)
    const iController = new clinicController(iUseCase)

    return iController
}