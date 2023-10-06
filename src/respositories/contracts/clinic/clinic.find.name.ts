import { Clinic } from "../../../entities/clinic";

export interface findByName {
    find(name:string):Promise<Clinic>
}