import { Clinic } from "../../../entities/clinic";

export interface updateClinic{
    update(datas:Clinic):Promise<Clinic>
}