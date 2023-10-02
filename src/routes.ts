import { Request, Response, Router } from 'express'
import { MakeCustomerFactore } from './factories/customer/make.create.customer'
import { createCustomerSchema } from './useCase/costumer/create/create.costumer.dto'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'

const routes = Router()

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
routes.post('/customer', schemaValidator(createCustomerSchema), (req:Request,res:Response) => createCustomer.execute(req,res))
routes.get('/login',schemaValidator(loginSchema),(req:Request, res:Response) => iLogin.execute(req,res))
export { routes }