import { Dentist } from "../../../entities/dentist";

export interface findByEmail{
    findDentis(email:string):Promise<Dentist>
}