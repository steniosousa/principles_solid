import { Dentist } from "../../../entities/dentist";

export interface listDentist {
    list(clinicId: string, page: number): Promise<Partial<Dentist> | null>

}