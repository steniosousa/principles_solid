import { Address } from "../../../entities/address";

export interface findAddress{
    findAddress(cep:string,street:string,number:number):Promise<Address | null>
}