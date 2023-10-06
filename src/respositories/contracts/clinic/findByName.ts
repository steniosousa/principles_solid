import { Clinic } from "../../../entities/clinic";

export interface findByName {
    findClinic(name:string):Promise<Clinic | null>
}