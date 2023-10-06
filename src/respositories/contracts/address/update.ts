import { Address } from "../../../entities/address";

export interface updateAddress {
    update(newAddress: Address): Promise<Address>
}