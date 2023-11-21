import { ListServiceContrat } from "../../../respositories/contracts/service/list";

export class listUseCase {
    constructor(private readonly iListService: ListServiceContrat) { }

    async list(clinicId: string) {
        try {
            const list = await this.iListService.List(clinicId)
            return list
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
}