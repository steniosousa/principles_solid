import { Customer } from "../../../entities/costumer";

export interface FindById {
    Find(customerId: string): Promise<Customer | null | void>
}