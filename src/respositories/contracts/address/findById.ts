import { Address } from "../../../entities/address";

export interface finById{
    find(id:string):Promise<Address | null>
}