import { updateDentist } from "../../contracts/dentist/update";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'

interface body {
    room: number,
    name: string,
    password: string,
    email: string,
}
export class UpdateDentist implements updateDentist {
    async update(datas: body, doctorId: string): Promise<null> {
        if (datas.password) {
            const hashPassword = await bcrypt.hash(datas.password, 10)
            datas['password'] = hashPassword
        }
        try {
            await prisma.doctor.update({
                where: {
                    id: doctorId
                },
                data: {
                    ...datas,
                    firstAccess: false
                }
            })
            return null
        } catch (error) {
            console.log(error)
        }
    }
}