import { Clinic } from "../../../entities/clinic";
import { Dentist } from "../../../entities/dentist";
import { findByEmail } from "../../contracts/dentist/findByEmail";
import { JwtContract } from "../../contracts/login/jwt.contract";
import { LoginContract } from "../../contracts/login/login.contract";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export class LoginUserOrClinic implements findByEmail, LoginContract, JwtContract {
    async findDentis(email: string): Promise<Clinic | Dentist> {
        try {
            const responseClinic = await prisma.clinic.findFirst({
                where: {
                    cnpj: email
                }
            })

            if (responseClinic) {
                const returNewAddress: any = responseClinic
                return returNewAddress
            }
            const reponseDentist = await prisma.doctor.findFirst({
                where: {
                    email
                }
            })
            if (reponseDentist) {
                const returNewAddress: any = reponseDentist
                return returNewAddress
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