import { v4 as uuidv4 } from 'uuid';
export class Customer {
    public readonly id?: string;
    public name: string = '';
    public password: string = '';
    public email: string = '';
    public phone: string = '';
    public clinicId: string = '';


    constructor(props: Customer, id?: string) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuidv4();
        }
    }
}