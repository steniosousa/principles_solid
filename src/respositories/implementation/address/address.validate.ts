import cep from "cep-promise";
import { ValidateCep } from "../../contracts/address/address.valid.cep";

export class AddressValidade implements ValidateCep{
    async validate(cepValidate: string): Promise<boolean | any> {
        try {
            const returnCep = await cep(cepValidate)
            return returnCep
        }
        catch(error) {
            return false
        }
    }
}