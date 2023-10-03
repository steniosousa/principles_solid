import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';

export function schemaValidator(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const options: ErrorMessageOptions = {
            message: {
                enabled: true,
            },
        };
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = generateErrorMessage(error.issues, options);
                res.status(400).json(errorMessage)
            }
        }
    }
}