import { NextFunction, Request, Response, Router } from 'express'
import { MakeCustomerFactore } from './factories/customer/make.create.customer'
import { createCustomerSchema } from './useCase/costumer/create/create.costumer.dto'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'
import { AuthMiddleware } from './Middleware/Authentication/Auth.contract'

const routes = Router()

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
routes.post('/customer', (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(createCustomerSchema), (req: Request, res: Response) => createCustomer.execute(req, res))
routes.get('/login', (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))
export { routes }