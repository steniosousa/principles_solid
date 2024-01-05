import { ListDentistImplementation } from "../../respositories/implementation/dentist/list";
import { ListDentistController } from "../../useCase/dentist/list/controller";
import { ListDentistService } from "../../useCase/dentist/list/useCase";

export function ListDentist() {
    const iImplementation = new ListDentistImplementation()
    const iUseCase = new ListDentistService(iImplementation)
    const iController = new ListDentistController(iUseCase)
    return iController
}