import { Customer } from "../../../entities/costumer";

export interface LoginContract {
    login(customer: Customer, password: string): Promise<Customer | null>;
}