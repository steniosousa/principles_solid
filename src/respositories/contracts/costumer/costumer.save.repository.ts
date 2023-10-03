import { Customer } from "../../../entities/costumer";

export interface saveCustomer {
    save(data: Customer): Promise<void>
}