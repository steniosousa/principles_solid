import { Service } from "../../../entities/service";

export interface ListWithId{
    List(id:string):Promise<Service>
}