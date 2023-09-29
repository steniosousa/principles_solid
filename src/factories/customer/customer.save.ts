import { Customer } from "../../entities/costumer";
import { default as axios } from 'axios'

export class CustomerSave{
    async save(data:Customer):Promise<void>{
        const findByEmail:Customer = await axios.post(`http://localhost:3000/Customers/`,{
            data
        })
    }
}