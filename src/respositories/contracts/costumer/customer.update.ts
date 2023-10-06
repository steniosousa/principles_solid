import { Customer } from "../../../entities/costumer";

export interface customerUpdate {
    update(customerId: string, newsDatas: Customer): Promise<Customer | null>
}