import { NextFunction, Request, Response, Router, response } from 'express'
import { MakeCustomerFactore } from './factories/customer/customer.create'
import { createCustomerSchema } from './useCase/customer/create/create.costumer.dto'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'
import { AuthMiddleware } from './Middleware/Authentication/Auth.contract'
import { DeleteCustomer } from './factories/customer/customer.delete'
import { UpdateCustomer } from './factories/customer/customer.update'
import { updateCustomerSchema } from './useCase/customer/update/customer.update.dto'

const routes = Router()

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
const deleteCustomer = DeleteCustomer()
const updateCustomer = UpdateCustomer()

routes.post('/login', schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))

// routes for customer
routes.post('/customer', schemaValidator(createCustomerSchema), (req: Request, res: Response) => createCustomer.execute(req, res))
routes.delete('/customer',(req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),(req,res) => deleteCustomer.execute(req,res))
routes.patch('/customer',schemaValidator(updateCustomerSchema),(req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),(req:any,res:Response) => updateCustomer.execute(req,res))






export { routes }


