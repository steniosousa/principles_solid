import axios from "axios";
import { Clinic } from "../../../entities/clinic";
import { findById } from "../../contracts/clinic/findById";
import { updateClinic } from "../../contracts/clinic/update";

export class update implements findById, updateClinic {
    async find(id: string): Promise<Clinic> {
        try {
            const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic/${id}`)
            const clinicFound: Clinic = response.data
            return clinicFound

        } catch {
            throw new Error('Clinic not found')

        }
    }

    async update(datas: Clinic): Promise<Clinic> {
        try{
            const response = await axios.patch(`${process.env.DATABASE_JSON_SERVER}/Clinic/${datas.id}`, {
                name: datas.name,
                phone: datas.phone,
                cnpj: datas.cnpj
            })
    
            const returAfterUpdate: Clinic = response.data
    
            return returAfterUpdate

        }catch(error:unknown){
            let message = 'Failed update clinic'

            if(error instanceof Error){
                message = error.message
            }
            throw new Error(message)
        }
    }
}