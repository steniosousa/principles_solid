import { Request } from "express";
import { findAddress } from "../../../respositories/contracts/address/address.find";
import { findByName } from "../../../respositories/contracts/clinic/clinic.find.name";
import { addressSave } from "../../../respositories/contracts/address/address.create";
import { clinicSave } from "../../../respositories/contracts/clinic/clinic.create";

export class ClinicUseCase {
    constructor(
        private readonly iFindByName: findByName,
        private readonly iFindByCep: findAddress,
        private readonly iSaveAddress: addressSave,
        private readonly iclinicSave: clinicSave
    ) { }

    async execute(req: Request) {
        const { name, cep, street, number, district, city, country } = req.body
        try {
            const clinicAlreadyExist = await this.iFindByName.find(name)
            if (clinicAlreadyExist) {
                throw new Error("Clinic already exist")
            }

            const addressAlreadyExist = await this.iFindByCep.find(cep, street, number)
            if (addressAlreadyExist) {
                throw new Error("Address already in use")
            }

            const address = await this.iSaveAddress.save({
                cep,
                street,
                number,
                district,
                city,
                country
            })

            if (!address) throw new Error('Unable to save address')

            const clinic = await this.iclinicSave.save({
                adressId: address.id as string,
                name,
            })
            return clinic

        } catch {
            throw new Error('Failed to save clinic')
        }
    }
}