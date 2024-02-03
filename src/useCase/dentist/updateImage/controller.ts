import {  Response } from "express";
import { prisma } from "../../../respositories/prisma/prisma.service";

export class updateImageDentistController {

    async execute(req: any, res: Response) {
        try {
            await prisma.doctor.update({
                where:{
                    id:req.user.id
                },
                data: {
                    photo:req.body.file
                }
            })
            res.status(200).send('Foto atualizada com sucesso')

        } catch (error: unknown) {
            let message = "Falha ao salvar a imagem"
            if (error instanceof Error) {
                message = error.message
            }
            res.status(400).send(message)
        }
    }
}