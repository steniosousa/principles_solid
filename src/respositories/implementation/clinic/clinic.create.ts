import axios from "axios";
import { Address } from "../../../entities/address";
import { findAddress } from "../../contracts/address/address.find";
import { clinicSave } from "../../contracts/clinic/clinic.create";
import { findByName } from "../../contracts/clinic/clinic.find.name";
import { Clinic } from "../../../entities/clinic";
import { addressSave } from "../../contracts/address/address.create";

export class ClinicCreateImplementation implements findAddress, clinicSave, findByName, addressSave {

    async findAddress(cep: string, street: string, number: number): Promise<Address | null> {
        try {
            const addressAlreadyExist = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Address/`)
            const addressFound = addressAlreadyExist.data

            const filterAdress = addressFound.find((item: Address) => item.cep == cep && item.street == street && item.number == number)
            const returnJson = new Address({
                cep: filterAdress.cep,
                city: filterAdress.city,
                country: filterAdress.country,
                district: filterAdress.district,
                number: filterAdress.number,
                street: filterAdress.street,
            })

            if (filterAdress) return returnJson

            return null
        }
        catch (error) {
            return null
        }
    }



    async findClinic(name: string): Promise<Clinic | null> {
        try {
            const addressAlreadyExist = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic?name=${name}`)
            const addresFound: Clinic = addressAlreadyExist.data[0]
            return addresFound

        } catch (error) {
            return null
        }

    }

    async save(clinic: Clinic): Promise<Clinic> {
        try {
            const newClinic = new Clinic({
                adressId: clinic.adressId,
                name: clinic.name,
            })
            const newClinicSave = await axios.post(`${process.env.DATABASE_JSON_SERVER}/Clinic/`, {
                adressId: newClinic.adressId,
                name: newClinic.name,
                id: newClinic.id
            })
            const returnNewClinic:Clinic = newClinicSave.data
            return returnNewClinic
        } catch {
            return null
        }

    }

    async saveAddress(address: Address): Promise<Address> {
        try {
            const newAddress = new Address({
                cep: address.cep,
                city: address.city,
                country: address.country,
                district: address.country,
                number: address.number,
                street: address.street,
            })
            const newAddressSave = await axios.post(`${process.env.DATABASE_JSON_SERVER}/Address/`, {
                cep: newAddress.cep,
                city: newAddress.city,
                country: newAddress.country,
                district: newAddress.district,
                number: newAddress.number,
                street: newAddress.street,
                id: newAddress.id
            })
            const saveAddress: Address = newAddressSave.data
            return saveAddress
        } catch {
            return null
        }

    }
}