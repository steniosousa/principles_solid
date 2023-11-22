import { ListWithId } from "../../../respositories/contracts/service/listWithId";
import { UpdateService } from "../../../respositories/contracts/service/update";

export class EditUseCase {
    constructor(private readonly iListWithId: ListWithId,
        private readonly iUpdateService: UpdateService) { }

    async edit(cost: string, name: string, serviceId: string, clinicId: string) {
        try {
            const findService = await this.iListWithId.List(serviceId)
            if (!findService) {
                throw new Error('Error: Service not found')
            }

            await this.iUpdateService.update({
                cost,
                name,
                clinicId
            })


        } catch (error) {
            let message = 'Failed to do something exceptional'
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}