import { Clinic } from "../../../entities/clinic";

export interface clinicSave{
    save(clinic:Clinic):Promise<Clinic>
}