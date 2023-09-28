import { v4 as uuidv4 } from 'uuid';
export class Customer {
    public readonly id?: string;
    public name: string = '';
    public password: string = '';
    public email: string = '';
    public phone: string = '';
    public clinicId: string = '';


    constructor(props: Omit<Customer, 'id'>, id?: string) {
        Object.assign(this,props);
        if(!id){
            this.id = uuidv4();
        }


        // this.id = props.id,
        // this.name = props.name,
        // this.email = props.email,
        // this.password = props.password
        // this.clinicId = props.clinicId,
        // this.phone = props.phone
    }
}