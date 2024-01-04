import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function AuthMiddleware(req: Request & { user: any }, res: Response, next: NextFunction) {
    const keyJwtSecret = process.env.JWT_SECRET_TOKEN as string
    try {
        const response = jwt.verify(req.headers.authorization as string, keyJwtSecret)
        req.user = response
        next()
    } catch (error) {
        res.status(400).send('Chave de acesso inválida')
    }

}