import { v4 as uuidv4 } from 'uuid'

export class Dentist {
    public readonly id?: string
    public email: string = ''
    public room: number
    public name: string = ''
    public clinicId: string = ''
    public password: string = ''
    public firstAccess: boolean
    public phone: string = ''
    constructor(props: Dentist, id?: string) {
        Object.assign(this, props)
        if (!id) {
            id = uuidv4()
        }
    }
}   