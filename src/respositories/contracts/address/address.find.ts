import { Address } from "../../../entities/address";

export interface findAddress{
    find(cep:string,street:string,number:number):Promise<Address>
}