import { listDentist } from "../../contracts/dentist/list";
import { prisma } from "../../prisma/prisma.service";

export class ListDentistImplementation implements listDentist {
    async list(clinicId: string, page: number): Promise<any> {
        try {
            const totalRecords = await prisma.doctor.count({
                where: {
                  clinicId: clinicId,
                },
              });
              
              const professionals = await prisma.doctor.findMany({
                where: {
                  clinicId: clinicId,
                },
                select: {
                  name: true,
                  phone: true,
                  photo:true,
                  doctorServices: {
                    include: {
                      service: true,
                    },
                  },
                  room: true,
                  id: true,
                  appointments: true,
                },
                orderBy: {
                  name: "asc",
                },
                skip: (page - 1) * 5,
                take: 5,
              });
              
              if (!professionals) return null;
              
              return {
                professionals: professionals,
                totalRecords: totalRecords,
              };
              
        } catch (error: unknown) {

            let message = "Não foi possível listar profissional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}