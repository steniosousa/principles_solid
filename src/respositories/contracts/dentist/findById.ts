import { Dentist } from "../../../entities/dentist";

export interface findDentistById {
    findById(id: string): Promise<Partial<Dentist> | null>
}