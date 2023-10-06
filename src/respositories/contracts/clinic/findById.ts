import { Clinic } from "../../../entities/clinic";

export interface findById{
    find(id:string):Promise<Clinic>
}