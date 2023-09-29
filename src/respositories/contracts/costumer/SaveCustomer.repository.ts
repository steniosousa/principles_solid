import { Customer } from "../../../entities/costumer";

export interface SaveCustomer{
    save(data:Customer):Promise<void>
}