import { UpdateServiceImplementatio } from "../../respositories/implementation/service/update";
import { editServiceController } from "../../useCase/service/edit/controller";
import { EditUseCase } from "../../useCase/service/edit/useCase";

export function UpdateService(){
    const iImplementation = new UpdateServiceImplementatio()
    const iUseCase = new EditUseCase(iImplementation,iImplementation)
    const iController = new editServiceController(iUseCase)
    return iController
}