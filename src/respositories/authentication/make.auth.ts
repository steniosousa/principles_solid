import { Customer } from "../../entities/costumer";

export interface MakeLogin {
    login(password:string,email:string):Promise<Customer | null>;
}