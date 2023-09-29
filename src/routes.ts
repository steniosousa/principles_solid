import { Router } from 'express'
import { MakeCustomerFactore } from './factories/customer/make.create.customer'

const routes = Router()

const createCustomer = MakeCustomerFactore()
routes.post('/customer',(req,res) => createCustomer.execute(req,res))

export { routes }