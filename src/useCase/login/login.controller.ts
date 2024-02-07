import { Request, Response } from "express";
import { LoginUseCase } from "./login.useCase";

export class loginController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    async execute(req: Request, res: Response) {
        const { password, email } = req.body
        try {
            const login = await this.loginUseCase.execute(password, email)
            res.status(200).send(login)
        } catch (error) {
            let message = "Email ou senha inválidos"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }

    }

}