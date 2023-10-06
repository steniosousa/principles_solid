import { AddressValidade } from "../../respositories/implementation/address/address.validate";
import { addressValidadeController } from "../../useCase/address/validate/address.validate.controller";
import { addressValidateUseCase } from "../../useCase/address/validate/address.validate.useCase";

export function AddressValidate(){
    const IAddressValidade =  new AddressValidade()
    const iUseCase = new addressValidateUseCase(IAddressValidade)
    const iController = new addressValidadeController(iUseCase)
    return iController
}