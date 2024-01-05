import { Dentist } from "../../../entities/dentist";

export interface listDentist {
    list(clinicId: string): Promise<Partial<Dentist> | null>

}