import { ZodError } from "zod";
import { Clinic } from "../../../entities/clinic";
import { Dentist } from "../../../entities/dentist";
import { findByCNPJ } from "../../contracts/clinic/findByCNPJ";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import { JwtContract } from "../../contracts/login/jwt.contract";
import { LoginContract } from "../../contracts/login/login.contract";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export class LoginUserOrClinic implements findByEmail, LoginContract, JwtContract, findByCNPJ {
    async findDentis(email: string): Promise<Dentist> {
        try {
            const reponseDentist = await prisma.doctor.findFirst({
                where: {
                    email
                }
            })
            if (reponseDentist && reponseDentist.desactive) {
                throw new Error('Usuário desativado ')
            }
            if (reponseDentist) {
                const returNewAddress = new Dentist({
                    clinicId: reponseDentist.clinicId,
                    email: reponseDentist.email,
                    firstAccess: reponseDentist.firstAccess,
                    name: reponseDentist.name,
                    password: reponseDentist.password,
                    room: reponseDentist.room,
                    phone: reponseDentist.phone,
                    id: reponseDentist.id,
                    photo: reponseDentist.photo,
                    bio: reponseDentist.bio,
                    active: reponseDentist.active,
                    desactive: reponseDentist.desactive
                })
                return returNewAddress
            }
            return null
        }
        catch (error) {
            let message = "Usuário não encontrado";
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async findClinic(cnpj: string): Promise<Clinic> {
        try {
            let responseClinic;
            responseClinic = await prisma.clinic.findFirst({
                where: {
                    cnpj
                }
            })
            if (!responseClinic) {
                responseClinic = await prisma.clinic.findFirst({
                    where: {
                        email: cnpj
                    }
                })
            }

            const newClinic: Clinic = responseClinic
            return newClinic

        }
        catch (error) {
            throw new Error('Usuário não encontrado')
        }
    }

    async login(bdPass: string, password: string): Promise<Boolean | null> {

        const matchPassword = await bcrypt.compare(password, bdPass)
        if (!matchPassword) return null


        return matchPassword
    }

    async sign(userId: string) {

        const jwtSecret = process.env.JWT_SECRET_TOKEN as string
        const maxAge = 5 * 60 * 60;
        const token = jwt.sign(
            { id: userId },
            jwtSecret,
            {
                expiresIn: maxAge,
            }
        );

        return token
    }
}