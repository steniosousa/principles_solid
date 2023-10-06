import { Address } from "../../../entities/address";

export interface addressSave {
    save(address:Address):Promise<Address>
}