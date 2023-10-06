import { Request } from "express";
import { updateAddress } from "../../../respositories/contracts/address/update";
import { Address } from "../../../entities/address";
import { finById } from "../../../respositories/contracts/address/findById";

export class useCase {
    constructor(
        private readonly iUpdateAddress: updateAddress,
        private readonly iFindById: finById
    ) { }

    async execute(req: Request) {
        try {

            const findAddress = await this.iFindById.find(req.body.id)
            if (!findAddress) throw new Error('Address not found')
            const { cep, city, country, district, number, street, id } = req.body
            const newAddress = new Address({
                cep,
                city,
                country,
                district,
                number,
                street,
                id,
            }, id)
            await this.iUpdateAddress.update(newAddress)

        } catch (error: unknown) {
            let message = "Undefined Error"

            if (error instanceof Error) {
                message = error.message
            }

            throw new Error(message)
        }
    }
}