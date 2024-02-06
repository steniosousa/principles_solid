import { Service } from "../../../entities/service";

export interface ListWithDoctorId{
    ListWithDoctorId(id:string):Promise<Service[]>
}