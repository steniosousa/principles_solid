import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const keyJwtSecret = process.env.JWT_SECRET_TOKEN as string

    try {
        jwt.verify(req.headers.authorization as string, keyJwtSecret)
        next()

    } catch {
        res.status(400).send('Chave de acesso inválida')

    }

}