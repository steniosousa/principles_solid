import { Clinic } from "../../../entities/clinic";

export interface findClinicById{
    find(id:string):Promise<Clinic>
}