import { Clinic } from "../../../entities/clinic";

export interface clinicSave {
    save(clinic: Clinic, addressId: string): Promise<Clinic>
}