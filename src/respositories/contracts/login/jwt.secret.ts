import jwt from 'jsonwebtoken'
import { JwtContract } from './jwt.contract';
import 'dotenv/config'
export class JwtSecretToken implements JwtContract {
    sign(userId: string): any {
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