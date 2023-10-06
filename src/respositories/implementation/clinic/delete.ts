import axios from "axios";
import { deleteClinic } from "../../contracts/clinic/delete";
import { findById } from "../../contracts/clinic/findById";
import { Clinic } from "../../../entities/clinic";

export class deleteClinicImplementation implements findById, deleteClinic {
    async find(id: string): Promise<Clinic> {
        const search = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic/${id}`)
        const response: Clinic = search.data

        console.log(search)
        return response
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`${process.env.DATABASE_JSON_SERVER}/Clinic/${id}`)

    }
}