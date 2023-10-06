import { Address } from "../../../entities/address";

export interface addressSave {
    saveAddress(address:Address):Promise<Address>
}