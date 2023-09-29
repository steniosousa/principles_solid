import { Customer } from "../../entities/costumer";

export interface FindByEmailRepositories{
    findByEmail(email:string):Promise<Customer[] | undefined>;
}