
import { default as axios } from 'axios'
import { Customer } from "../../entities/costumer";

export class MakeCustomerFindByEmila{
    async findByEmail(email:string):Promise<Customer[] | []>{
        const {data} = await axios.get(`http://localhost:3000/Customers/`)
        const existCustomer = data.find((item:any) => item.data.email == email)
        if(existCustomer == undefined){
            return []
        }
        return existCustomer
    }
}