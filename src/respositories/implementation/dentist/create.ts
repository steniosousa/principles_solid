import axios from "axios";
import { Dentist } from "../../../entities/dentist";
import { findById } from "../../contracts/clinic/findById";
import { createDentist } from "../../contracts/dentist/create";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import { Clinic } from "../../../entities/clinic";
import bcrypt from 'bcryptjs'

export class create implements findByEmail, createDentist, findById {
    async findDentis(email: string): Promise<Dentist> {
        const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Dentist?email=${email}`)
        const dentistAlreadyExist: Dentist = response.data[0]
        return dentistAlreadyExist
    }
    async find(id: string): Promise<Clinic> {
        const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic/${id}`)
        const clinicAlreadyExist: Clinic = response.data[0]
        return clinicAlreadyExist

    }

    async create(datas: Dentist): Promise<Dentist> {
        const hashPassword = await bcrypt.hash(datas.password, 10)

        try {
            const response = await axios.post(`${process.env.DATABASE_JSON_SERVER}/Dentist/`, {
                name: datas.name,
                clinicId: datas.clinicId,
                email: datas.email,
                password: hashPassword
            })
            const newDentist: Dentist = response.data
            return newDentist

        } catch {
            throw new Error('Unable to create professional')
        }
    }
}