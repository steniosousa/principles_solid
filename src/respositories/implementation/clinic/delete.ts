import { deleteClinic } from "../../contracts/clinic/delete";
import { Clinic } from "../../../entities/clinic";
import { prisma } from "../../prisma/prisma.service";
import { findClinicById } from "../../contracts/clinic/findById";

export class deleteClinicImplementation implements findClinicById, deleteClinic {
    async find(id: string): Promise<Clinic> {
        try{
            const search = await prisma.clinic.findUnique({
                where:{
                    id
                }
            })
            const response: Clinic = new Clinic({
                addressId:search.addressId,
                cnpj:search.cnpj,
                name:search.name,
                phone:search.phone,
                id:search.id,
                email:search.email,
                password:search.password
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