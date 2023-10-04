import { NextFunction, Request, Response, Router } from 'express'
import { MakeCustomerFactore } from './factories/customer/customer.create'
import { createCustomerSchema } from './useCase/costumer/create/create.costumer.dto'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'
import { AuthMiddleware } from './Middleware/Authentication/Auth.contract'
import { DeleteCustomer } from './factories/customer/customer.delete'

const routes = Router()

// if route necessary auth (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
const deleteCustomer = DeleteCustomer()
routes.post('/customer', schemaValidator(createCustomerSchema), (req: Request, res: Response) => createCustomer.execute(req, res))
routes.post('/login', schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))
routes.delete('/customer',(req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),(req,res) => deleteCustomer.execute(req,res))

export { routes }