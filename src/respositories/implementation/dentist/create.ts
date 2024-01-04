import { Dentist } from "../../../entities/dentist";
import { createDentist } from "../../contracts/dentist/create";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import bcrypt from 'bcryptjs'
import { prisma } from "../../prisma/prisma.service";
import { ZodError } from "zod";
import { findClinicById } from "../../contracts/clinic/findById";
import { Clinic } from "../../../entities/clinic";
import { findRoom } from "../../contracts/clinic/findRoom";

export class create implements findByEmail, createDentist, findClinicById, findRoom {

    async findDentis(email: string): Promise<Dentist> {

        try {

            const response = await prisma.doctor.findFirst({
                where: {
                    email
                }
            })
            if (response) {
                const dentistAlreadyExist: Dentist = new Dentist({
                    clinicId: response.clinicId,
                    email: response.email,
                    name: response.name,
                    password: response.password,
                    id: response.id,
                    room: response.room,
                    firstAccess: response.firstAccess
                })
                return dentistAlreadyExist
            }
            return null
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

            const response = await prisma.clinic.findFirst({
                where: {
                    id
                }
            })
            if (response) {
                const clinicAlredyExist: Clinic = new Clinic({
                    cnpj: response.cnpj,
                    adressId: response.addresId,
                    name: response.name,
                    password: response.password,
                    phone: response.phone,
                    id: response.id
                })
                return clinicAlredyExist

            } return null
        } catch (error) {
            let message
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
            if (response) {
                const newDentist: Dentist = new Dentist({
                    clinicId: response.clinicId,
                    email: response.email,
                    name: response.name,
                    password: response.password,
                    id: response.id,
                    room: response.room,
                    firstAccess: response.firstAccess
                })
                return newDentist

            } return null

        } catch (error) {
            console.log(error)
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async findRoom(number: number, clinicId: string): Promise<boolean> {
        try {
            const response = await prisma.clinic.findFirst({
                where: {
                    id: clinicId,
                    AND: {
                        doctors: {
                            some: {
                                room: number
                            }
                        }
                    }
                }
            })
            if (response) return true
            return false

        } catch (error) {
            let message;
            if (error instanceof ZodError) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}