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

            if (reponseDentist) {
                const returNewAddress = new Dentist({
                    clinicId: reponseDentist.clinicId,
                    email: reponseDentist.email,
                    firstAccess: reponseDentist.firstAccess,
                    name: reponseDentist.name,
                    password: reponseDentist.password,
                    room: reponseDentist.room,
                    id: reponseDentist.id,
                    phone: reponseDentist.phone
                })
                return returNewAddress
            }
            return null
        }
        catch (error) {
            throw new Error('Usuário não encontrado')
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

            const returNewAddress = new Clinic({
                adressId: responseClinic.addresId,
                cnpj: responseClinic.cnpj,
                name: responseClinic.name,
                password: responseClinic.password,
                phone: responseClinic.phone,
                id: responseClinic.id,
                email: responseClinic.email
            })

            return returNewAddress

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