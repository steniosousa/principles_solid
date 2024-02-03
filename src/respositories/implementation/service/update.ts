import { Service } from "../../../entities/service";
import { ListWithId } from "../../contracts/service/listWithId";
import { UpdateService } from "../../contracts/service/update";
import { prisma } from "../../prisma/prisma.service";

export class UpdateServiceImplementatio implements ListWithId, UpdateService {

    async List(id: string): Promise<Service> {
        try {
            const serviceFound = await prisma.services.findUnique({
                where: {
                    id
                }
            })
            const returnService = new Service({
                clinicId: serviceFound.clinicId,
                cost: serviceFound.cost,
                name: serviceFound.name,
                id: serviceFound.id
            })
            return returnService

        } catch (error) {
            let message = ''
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async update(servicedatas: Service): Promise<null> {
        try {
            await prisma.services.update({
                where: {
                    id: servicedatas.id
                },
                data: { ...servicedatas }
            })
            return null
        } catch (error) {
            let message = ''
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}