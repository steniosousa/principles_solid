
import { default as axios } from 'axios'
import { Customer } from "../../entities/costumer";

export class MakeCustomerFindByEmila{
    async findByEmail(email:string):Promise<Customer[] | undefined>{
        const {data} = await axios.get(`http://localhost:3000/Customers?email=${email}`)
        return data
    }
}