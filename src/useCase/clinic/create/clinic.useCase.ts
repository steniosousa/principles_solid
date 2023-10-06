import { Request } from "express";
import { findAddress } from "../../../respositories/contracts/address/address.find";
import { findByName } from "../../../respositories/contracts/clinic/clinic.find.name";
import { addressSave } from "../../../respositories/contracts/address/address.create";
import { clinicSave } from "../../../respositories/contracts/clinic/clinic.create";
import { Address } from "../../../entities/address";
import { Clinic } from "../../../entities/clinic";

export class ClinicUseCase {
    constructor(
        private readonly iFindByName: findByName,
        private readonly iFindByCep: findAddress,
        private readonly iSaveAddress: addressSave,
        private readonly iclinicSave: clinicSave
    ) { }

    async execute(req: Request) {
        try {
            const { name, cep, street, number, district, city, country } = req.body


            const clinicAlreadyExist = await this.iFindByName.findClinic(name)

            if (clinicAlreadyExist) {
                throw new Error("Clinic already exist")
            }

            const addressAlreadyExist = await this.iFindByCep.findAddress(cep, street, number)
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

            const address = await this.iSaveAddress.saveAddress(newAddress)

            if (!address) throw new Error('Unable to save address')

            const newClinic = new Clinic({
                adressId: address.id as string,
                name
            })
            const clinic = await this.iclinicSave.save(newClinic)
            return new Clinic({
                adressId:clinic.adressId,
                name:clinic.name,
                id:clinic.id
            },clinic.id)

        } catch  {
            throw new Error('Failed to save clinic')
        }
    }
}