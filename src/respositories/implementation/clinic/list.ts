import { ZodError } from "zod";
import { Clinic } from "../../../entities/clinic";
import { List } from "../../contracts/clinic/list";
import { prisma } from "../../prisma/prisma.service";

export class ListClinics implements List {
    async list(): Promise<Clinic[]> {
        try {
            const response = await prisma.clinic.findMany({
                orderBy: {
                    id: 'asc'
                }
            });

            const allClinics: Clinic[] = response.map((clinic) => ({
                addressId: clinic.addressId,
                cnpj: clinic.cnpj,
                name: clinic.name,
                phone: clinic.phone,
                id: clinic.id,
                bio: clinic.bio,
                email: clinic.email,
                password: clinic.password,
                photo: clinic.photo
            }));

            return allClinics;

        } catch (error) {
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }

    }


}