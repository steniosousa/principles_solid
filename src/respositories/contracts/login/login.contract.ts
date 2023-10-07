import { Customer } from "../../../entities/costumer";

export interface LoginContract {
    login( bdPass:string,password: string): Promise<Boolean | null>;
}