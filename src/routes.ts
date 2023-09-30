import { Request, Response, Router } from 'express'
import { MakeCustomerFactore } from './factories/customer/make.create.customer'
import { createCustomerSchema } from './useCase/costumer/create/create.costumer.dto'
import { schemaValidator } from './validator/schemaValidator'

const routes = Router()


const createCustomer = MakeCustomerFactore()
routes.post('/customer', schemaValidator(createCustomerSchema), (req:Request,res:Response) => createCustomer.execute(req,res))

export { routes }