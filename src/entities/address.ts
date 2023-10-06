import {v4 as uuidv4 } from "uuid"
export class Address{
    public readonly id?:string
    public cep:string = ''
    public number:number = 0
    public street:string = ''
    public district:string = ''
    public city:string = ''
    public country:string = ''

    constructor(props:Address,id?:string){
        Object.assign(this,props)
        if(!id){
            this.id = uuidv4()
        }
    }
}