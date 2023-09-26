import { Costumer } from "../entities/costumer";

export interface costumerRepository{
    findByEmail(email:string):Promise<Costumer>;
    save(costumer:Costumer):Promise<Costumer>
}