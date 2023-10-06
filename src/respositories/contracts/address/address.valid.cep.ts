export interface ValidateCep {
    validate(cep:string):Promise<boolean>
}