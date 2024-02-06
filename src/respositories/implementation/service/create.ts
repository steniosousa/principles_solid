import { Dentist } from "../../../entities/dentist";
import { Service } from "../../../entities/service";
import { findDentistById } from "../../contracts/dentist/findById";
import { CreateService } from "../../contracts/service/create";
import { FindService } from "../../contracts/service/find";
import { prisma } from "../../prisma/prisma.service";

export class createServiceImplementation implements CreateService, FindService, findDentistById {
    async findById(id: string): Promise<Partial<Dentist>> {
        try {
            const doctorAlredyExist = await prisma.doctor.findFirst({
                where: {
                    id
                }
            })
            return doctorAlredyExist
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }

    async findService(name: string, clinicId: string): Promise<Service> {
        try {
            const existService = await prisma.services.findFirst({
                where: {
                    name,
                    clinicId: clinicId,
                }
            })
            const returnDatas: Service = existService
            return returnDatas

        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }

    async createService(service: Service, clinicId: string, id: string): Promise<Service> {
        try {
            const createService = await prisma.services.create({
                data: {
                    cost: service.cost,
                    name: service.name,
                    clinicId,
                    doctorServices: {
                        create: {
                            doctorId: id
                        }
                    }
                }
            })
            const newService = new Service({
                clinicId: createService.clinicId,
                cost: createService.cost,
                name: createService.name,
                id: createService.id
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