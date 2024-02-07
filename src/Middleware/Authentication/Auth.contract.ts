import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../respositories/prisma/prisma.service'

export async function AuthMiddleware(req: Request & { user: any }, res: Response, next: NextFunction) {
    const keyJwtSecret = process.env.JWT_SECRET_TOKEN as string
    try {
        const response: any = jwt.verify(req.headers.authorization as string, keyJwtSecret)
        const user = await prisma.doctor.findFirst({
            where: {
                id: response.id
            }
        })

        const clinic = await prisma.clinic.findFirst({
            where: {
                id: response.id
            }
        })
        if (user && user.desactive) {
            res.status(403).send('Usuário desativado')
            return
        }
        if (clinic && !clinic.pay) {
            res.status(406).send('Sem acesso')
            return
        }
        if (!response.id) {
            throw new Error('Conta não autorizada')
        }
        req.user = response
        next()
    } catch (error) {
        res.status(401).send('Chave de acesso inválida')
    }

}