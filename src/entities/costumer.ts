import { v4 as uuidv4 } from 'uuid';

export interface CustomerProps {
    id: string;
    name: string
    password: string
    email: string
    phone: string
    clinicId: string
}
export class Customer {
    private props: CustomerProps

    constructor(props: Omit<Customer, 'id'>, id?: string) {
        this.props = {
            ...props,
            id: id ?? uuidv4()
        };
    }

    get id() {
        return this.props.id
    }
    
    get name() {
        return this.props.name
    }
    
    get password() {
        return this.props.password
    }
    
    get email() {
        return this.props.email
    }
    
    get phone() {
        return this.props.phone
    }
    
    get clinicId() {
        return this.props.clinicId
    }
}