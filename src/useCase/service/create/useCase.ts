import { Request } from "express";
import { CreateService } from "../../../respositories/contracts/service/create";
import { FindService } from "../../../respositories/contracts/service/find";


export class serviceUseCase {
    constructor(
        private readonly icreateService: CreateService,
        private readonly iFindService: FindService
    ) { }
    async execute(req: Request) {
        try {
            const { name, cost, clinicId } = req.body
            const serviceAlredyExist = await this.iFindService.findService(name, clinicId)
            if (serviceAlredyExist) {
                throw new Error("Service already exist")
            }
            await this.icreateService.createService({
                cost,
                name,

            }, clinicId)

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
}