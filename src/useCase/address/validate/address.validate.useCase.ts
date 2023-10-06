import { ValidateCep } from "../../../respositories/contracts/address/valid.cep";

export class addressValidateUseCase {
    constructor(private readonly ivalidateCep: ValidateCep) { }

    async execute(cep: string) {
        try {
            
            const cepValidate = await this.ivalidateCep.validate(cep)
            if(!cepValidate) throw new Error('Invalid CEP')
            return cepValidate

        } catch {
            throw new Error('Invalid CEP')
        }

    }
}