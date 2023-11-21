import { Service } from "../../../entities/service";

export interface ListServiceContrat {
    List(clinicId:string):Promise<Service[] | null>
}