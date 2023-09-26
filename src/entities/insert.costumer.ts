export interface InsertCostumersProps {
    name: string
    password:string
    email:string
    phone:string
    clinicId:string
}
export class InsertCostumer {
    private props:InsertCostumersProps

    set name (name:string) {
        this.props.name = name
    }

    set password(password:string){
        this.props.password = password
    }

    set email(email:string){
        this.props.email = email
    }

    set phone(phone:string){
        this.props.phone = phone
    }

    set clinicId(clinicId:string){
        this.props.clinicId = clinicId
    }

    constructor(props: InsertCostumersProps){
        this.props  = props
    }
}