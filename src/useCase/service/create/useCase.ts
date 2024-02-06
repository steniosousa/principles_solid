import { Request } from "express";
import { CreateService } from "../../../respositories/contracts/service/create";
import { FindService } from "../../../respositories/contracts/service/find";
import { findDentistById } from "../../../respositories/contracts/dentist/findById";
import { Dentist } from "../../../entities/dentist";


export class serviceUseCase {
    constructor(
        private readonly icreateService: CreateService,
        private readonly iFindService: FindService,
        private readonly ifindDentistById: findDentistById
    ) { }
    async execute(req: any) {

        try {
            const { name, cost } = req.body.data
            const id = req.user.id
            if (!name.toString() || !Number(cost)) {
                throw new Error("Dados inválidos")
            }
            const verifyIfDoctorExist = await this.ifindDentistById.findById(id)
            if (!verifyIfDoctorExist) {
                throw new Error("Dentista não encontrado")

            }
            const serviceAlredyExist = await this.iFindService.findService(name, verifyIfDoctorExist.clinicId)
            if (serviceAlredyExist) {
                throw new Error("Serviço já cadastrado")
            }

            await this.icreateService.createService({
                cost,
                name,
                clinicId: verifyIfDoctorExist.clinicId

            }, verifyIfDoctorExist.clinicId, id)

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
}