import { Customer } from "../../entities/costumer";

export class CustomerSave{
    async save(data:Customer):Promise<void>{
        const allCustomers:Customer[] = []
        allCustomers.push(data)

    }
}