import { v4 as uuidv4 } from "uuid"
export class Vacation {
    public readonly id?: string
    public start: Date
    public finish: Date
    public reason: String
    public doctorId: String

    constructor(props: Vacation, id?: string) {

        Object.assign(this, props)
        if (!id) {
            this.id = uuidv4()
        }
    }
}