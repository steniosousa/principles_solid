import { Service } from "../../../entities/service";
import { CreateService } from "../../contracts/service/create";
import { FindService } from "../../contracts/service/find";
import { prisma } from "../../prisma/prisma.service";

export class createServiceImplementation implements CreateService, FindService {

    async findService(service: Service, clinicId: string): Promise<Service> {
        try {
            const existService = await prisma.services.findFirst({
                where: {
                    name: service.name,
                    ClinicId: clinicId
                }
            })
            return existService

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }

    async createService(service: Service, ClinicId: string): Promise<Service> {
        try {
            const newService = await prisma.services.create({
                data: {
                    cost: service.cost,
                    name: service.name,
                    ClinicId
                }
            })
            return newService

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }

}