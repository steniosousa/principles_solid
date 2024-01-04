import { Clinic } from "../../../entities/clinic";
import { Dentist } from "../../../entities/dentist";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import { JwtContract } from "../../contracts/login/jwt.contract";
import { LoginContract } from "../../contracts/login/login.contract";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export class LoginUserOrClinic implements findByEmail, LoginContract,JwtContract {
    async findDentis(email: string): Promise<Clinic | Dentist> {
        try {
            const responseClinic = await prisma.clinic.findFirst({
                where: {
                    cnpj: email
                }
            })
            if (responseClinic) {
                const returnClinic = new Clinic({
                    adressId: responseClinic.addresId,
                    cnpj: responseClinic.cnpj,
                    name: responseClinic.name,
                    phone: responseClinic.phone,
                    password: responseClinic.password
                })
                return returnClinic
            }
            const reponseDentist = await prisma.doctor.findFirst({
                where: {
                    email
                }
            })
            if (reponseDentist) {
                const returnDoctor = new Dentist({
                    clinicId: reponseDentist.clinicId,
                    email: reponseDentist.email,
                    name: reponseDentist.name,
                    room: reponseDentist.room,
                    id: responseClinic.id,
                    password: reponseDentist.password
                })
                return returnDoctor
            }
            return null
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

    sign(userId: string): any {
        console.log(userId)
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