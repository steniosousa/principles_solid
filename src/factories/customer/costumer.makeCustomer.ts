import { Customer } from "../../entities/costumer";

export class MakeCustomerFindByEmila{
    async findByEmail(email:string):Promise<Customer | undefined>{
        const allCustomers:Customer[] = [
            {
                clinicId:'stenio',
                email:'stenio',
                name:'stenio',
                password:'stenio',
                phone:'stenio',
                id:'stenio'
            },
            {
                clinicId:'dayane',
                email:'dayane',
                name:'dayane',
                password:'dayane',
                phone:'dayane',
                id:'dayane'
            }
        ]
        const findForEmail = allCustomers.find(item => item.email == email)
        return findForEmail

    }
}