import { Dentist } from "../../../entities/dentist";
import { findById } from "../../contracts/clinic/findById";
import { createDentist } from "../../contracts/dentist/create";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import { Clinic } from "../../../entities/clinic";
import bcrypt from 'bcryptjs'
import { prisma } from "../../prisma/prisma.service";
import { ZodError } from "zod";

export class create implements findByEmail, createDentist, findById {

    async findDentis(email: string): Promise<Dentist> {
        try {

            const response = await prisma.doctor.findFirst({
                where: {
                    email
                }
            })
            const dentistAlreadyExist: Dentist = new Dentist({
                clinicId: response.clinicId,
                email: response.email,
                name: response.name,
                password: response.password,
                id: response.id,
                room: response.room
            })
            return dentistAlreadyExist
        } catch (error) {
            let message
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async find(id: string): Promise<Clinic> {
        try {
            const response = await prisma.clinic.findUnique({
                where: {
                    id
                }
            })
            const clinicAlreadyExist: Clinic = new Clinic({
                adressId: response.addresId,
                cnpj: response.cnpj,
                name: response.name,
                phone: response.phone,
                id: response.id,
                password: response.id
            })
            return clinicAlreadyExist

        } catch (error) {
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }

    }

    async create(datas: Dentist): Promise<Dentist> {

        try {
            const hashPassword = await bcrypt.hash(datas.password, 10)
            const response = await prisma.doctor.create({
                data: {
                    name: datas.name,
                    clinicId: datas.clinicId,
                    email: datas.email,
                    password: hashPassword,
                    room: datas.room
                }
            })
            const newDentist: Dentist = new Dentist({
                clinicId: response.clinicId,
                email: response.email,
                name: response.name,
                password: response.password,
                id: response.id,
                room: response.room
            })
            return newDentist

        } catch (error) {
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}