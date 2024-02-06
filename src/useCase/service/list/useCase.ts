import { findDentistById } from "../../../respositories/contracts/dentist/findById";
import { ListServiceContrat } from "../../../respositories/contracts/service/list";
import { ListWithDoctorId } from "../../../respositories/contracts/service/listWithDoctorId";

export class listUseCase {
    constructor(private readonly iListService: ListServiceContrat,
        private readonly ifindDentistById: findDentistById,
        private readonly iListWithDoctorId: ListWithDoctorId) { }

    async list(clinicId: string) {
        try {
            let list;
            const idOfUserId = await this.ifindDentistById.findById(clinicId)
            if (idOfUserId) {
                const listServicesWithDoctorId = await this.iListWithDoctorId.ListWithDoctorId(clinicId)
                list = listServicesWithDoctorId
            }else{
                const listServicesWithClinicId = await this.iListService.List(clinicId)
                list = listServicesWithClinicId
            }
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