import axios from "axios";
import { Address } from "../../../entities/address";
import { updateAddress } from "../../contracts/address/update";
import { finById } from "../../contracts/address/findById";

export class update implements updateAddress, finById {


    async find(id: string): Promise<Address> {
        try {
            const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Address/${id}`)
            const returNewAddress: Address = response.data
            return returNewAddress
        }
        catch (error) {
            throw new Error('Address not found')
        }
    }


    async update(newAddress: Address): Promise<Address> {
        const response = await axios.patch(`${process.env.DATABASE_JSON_SERVER}/Address/${newAddress.id}`, {
            cep: newAddress.cep,
            number: newAddress.number,
            street: newAddress.street,
            district: newAddress.district,
            city: newAddress.city,
            country: newAddress.country
        })

        return response.data
    }
}