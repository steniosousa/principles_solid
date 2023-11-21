import { deleteClinic } from "../../contracts/clinic/delete";
import { findById } from "../../contracts/clinic/findById";
import { Clinic } from "../../../entities/clinic";
import { prisma } from "../../prisma/prisma.service";

export class deleteClinicImplementation implements findById, deleteClinic {
    async find(id: string): Promise<Clinic> {
        try{
            const search = await prisma.clinic.findUnique({
                where:{
                    id
                }
            })
            const response: Clinic = new Clinic({
                adressId:search.addresId,
                cnpj:search.cnpj,
                name:search.name,
                phone:search.phone,
                id:search.id
            })
    
            return response

        }catch(error){
            let message;
            if(error instanceof Error){
                message = error.message
            }
            throw new Error(message)
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.clinic.delete({
                where:{
                    id
                }
            })

        }catch (error){
            let message;
            if(error instanceof Error){
                message = error.message
            }
            throw new Error(message)
        }

    }
}