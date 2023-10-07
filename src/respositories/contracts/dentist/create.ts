import { Dentist } from "../../../entities/dentist";

export interface createDentist{
    create(datas:Dentist):Promise<Dentist>
}