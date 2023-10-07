import { v4 as uuidv4 } from 'uuid'

export class Dentist {
    public readonly id?: string
    public name: string = ''
    public clinicId: string = ''
    public email:string = ''
    public password:string = ''

    constructor(props: Dentist, id?: string) {
        Object.assign(this, props)

        if (!id) {
            id = uuidv4()
        }
    }


}   