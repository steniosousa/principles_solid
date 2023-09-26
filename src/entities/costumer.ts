import { v4 as uuidv4 } from 'uuid';
export class Costumer {
    public readonly id?: string
    public name: string
    public password: string
    public email: string
    public phone: string
    public clinicId: string


    constructor(props: Costumer, id?: string) {
        if(!id){
            this.id = uuidv4();
        }

        this.id = props.id,
        this.name = props.name,
        this.email = props.email,
        this.password = props.password
        this.clinicId = props.clinicId,
        this.phone = props.phone

    }
}