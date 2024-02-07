import { v4 as uuidv4 } from 'uuid';

export class Clinic {
    public readonly id?: string
    public name: string = ''
    public addressId: string = ''
    public cnpj: string = ''
    public phone: string = ''
    public password: string = ''
    public email: string = ''
    public bio: string = ''
    public photo: string = ''
    public pay: boolean

    constructor(props: Clinic, id?: string) {
        Object.assign(this, props)

        if (!id) {
            this.id = uuidv4()
        }
    }
}