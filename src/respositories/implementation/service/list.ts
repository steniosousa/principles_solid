import { Service } from "../../../entities/service";
import { ListServiceContrat } from "../../contracts/service/list";
import { prisma } from "../../prisma/prisma.service";

export class ListServicesImplementation implements ListServiceContrat {
    async List(ClinicId: string): Promise<Service[]> {
        try {
            const list = await prisma.services.findMany({
                where: {
                    ClinicId
                },
                select: {
                    id: true,
                    name: true,
                    cost: true,
                    ClinicId: true,
                    doctorServices: {
                        include: {
                            doctor: true
                        }
                    },
                }
            })
            const allServices: Service[] = list.map((item) => ({
                clinicId: item.ClinicId,
                cost: item.cost,
                name: item.name,
                id: item.id
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