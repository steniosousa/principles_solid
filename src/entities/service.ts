import { v4 as uuidv4 } from 'uuid'

export class Service {
    public readonly id?: string
    public name: string = ''
    public cost: string = ''
    public clinicId: string = ''


    constructor(props: Service, id?: string) {
        Object.assign(this, props)

        if (!id) {
            id = uuidv4()
        }
    }


}   