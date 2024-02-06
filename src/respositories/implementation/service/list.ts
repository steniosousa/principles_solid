import { ZodError } from "zod";
import { Dentist } from "../../../entities/dentist";
import { Service } from "../../../entities/service";
import { findDentistById } from "../../contracts/dentist/findById";
import { ListServiceContrat } from "../../contracts/service/list";
import { prisma } from "../../prisma/prisma.service";
import { ListWithDoctorId } from "../../contracts/service/listWithDoctorId";

export class ListServicesImplementation implements ListServiceContrat, findDentistById, ListWithDoctorId {
    async ListWithDoctorId(id: string): Promise<Service[]> {
        try {
            const list = await prisma.services.findMany({
                where: {
                    doctorServices: {
                        some: {
                            doctorId: id
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    cost: true,
                    clinicId: true,
                    doctorServices: {
                        include: {
                            doctor: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    },
                }
            })
           
            return list
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
    async findById(id: string): Promise<Partial<Dentist>> {
        try {
            const foundDentist = await prisma.doctor.findUnique({
                where: {
                    id
                }
            })
            if(!foundDentist) return null
            return foundDentist
        } catch (error) {
            let message = "Erro";
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
    async List(clinicId: string): Promise<Service[]> {
        try {
            const list = await prisma.services.findMany({
                where: {
                    clinicId
                },
                select: {
                    id: true,
                    name: true,
                    cost: true,
                    clinicId: true,
                    doctorServices: {
                        include: {
                            doctor: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    },
                }
            })
            const allServices: Service[] = list.map((item) => ({
                clinicId: item.clinicId,
                cost: item.cost,
                name: item.name,
                id: item.id,
                doctor: item.doctorServices
            }));
            return allServices
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage)
        }
    }
}