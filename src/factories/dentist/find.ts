import { FindDentistById } from "../../respositories/implementation/dentist/find";
import { FindDentistController } from "../../useCase/dentist/find/controller";
import { FindDentist } from "../../useCase/dentist/find/useCase";

export function findDentist() {
    const iImplementation = new FindDentistById()
    const iUseCase = new FindDentist(iImplementation)
    const iController = new FindDentistController(iUseCase)
    return iController
}