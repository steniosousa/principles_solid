import { Address } from "../../../entities/address";
import { updateAddress } from "../../contracts/address/update";
import { finById } from "../../contracts/address/findById";
import { prisma } from "../../prisma/prisma.service";

export class update implements updateAddress, finById {

    async find(id: string): Promise<Address> {
        try {
            const response = await prisma.address.findUnique({
                where: {
                    id
                }
            })
            const returNewAddress: Address = response
            return returNewAddress
        }
        catch (error) {
            throw new Error('Address not found')
        }
    }


    async update(newAddress: Address): Promise<Address> {
        try {
            const response = await prisma.address.update({
                where: {
                    id: newAddress.id
                },
                data: {
                    ...newAddress
                }
            })

            return response

        } catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}