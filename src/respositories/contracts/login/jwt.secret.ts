import jwt from 'jsonwebtoken'
import { JwtContract } from './jwt.contract';

export class JwtSecretToken implements JwtContract {
    sign(userId: string): any {
        const jwtSecret = '8702d8678d6ea827e3f578f09fd807ae0acc59e269c876013ea30514685125dc5d8b95'
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