import { Clinic } from "../../../entities/clinic";

export interface findByCNPJ{
    findClinic(cnpj:string):Promise< Clinic | null>
}