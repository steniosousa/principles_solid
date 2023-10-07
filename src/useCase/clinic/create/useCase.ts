import { Request } from "express";
import { findAddress } from "../../../respositories/contracts/address/find";
import { findByName } from "../../../respositories/contracts/clinic/findByName";
import { addressSave } from "../../../respositories/contracts/address/create";
import { clinicSave } from "../../../respositories/contracts/clinic/create";
import { Address } from "../../../entities/address";
import { Clinic } from "../../../entities/clinic";
import { ValidateCep } from "../../../respositories/contracts/address/valid.cep";
import { validateCnpj } from "../../../respositories/contracts/clinic/validate.cnpj";

export class ClinicUseCase {
    constructor(
        private readonly iFindByName: findByName,
        private readonly iFindAddress: findAddress,
        private readonly iSaveAddress: addressSave,
        private readonly iclinicSave: clinicSave,
        private readonly ivalidateCep: ValidateCep,
        private readonly ivalidateCnpj: validateCnpj
    ) { }

    async execute(req: Request) {
        try {
            const { name, cep, street, number, district, city, country, cnpj,phone } = req.body


            const clinicAlreadyExist = await this.iFindByName.findClinic(name)

            if (clinicAlreadyExist) {
                throw new Error("Clinic already exist")
            }

            const addressAlreadyExist = await this.iFindAddress.findAddress(cep, street, number)
            if (addressAlreadyExist) {
                throw new Error("Address already in use")
            }
            const newAddress = new Address({
                cep,
                city,
                country,
                district,
                number,
                street,
            })
            const validateCep = await this.ivalidateCep.validate(newAddress.cep)
            if (!validateCep) throw new Error('CEP not found')

           
            const validateCnpj = await this.ivalidateCnpj.validateCnpjInterface(cnpj)
            if(!validateCnpj) throw new Error('CNPJ not found')
            
            const address = await this.iSaveAddress.saveAddress(newAddress)

            if (!address) throw new Error('Unable to save address')

            const newClinic = new Clinic({
                adressId: address.id as string,
                name,
                cnpj,
                phone
            })
            const clinic = await this.iclinicSave.save(newClinic)
            return new Clinic({
                adressId: clinic.adressId,
                name: clinic.name,
                id: clinic.id,
                cnpj: clinic.cnpj,
                phone:clinic.phone
            }, clinic.id)

        } catch (error){
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
}