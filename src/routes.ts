import { NextFunction, Request, Response, Router, response } from 'express'
import { MakeCustomerFactore } from './factories/customer/customer.create'
import { createCustomerSchema } from './useCase/customer/create/dto'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'
import { AuthMiddleware } from './Middleware/Authentication/Auth.contract'
import { DeleteCustomer } from './factories/customer/customer.delete'
import { UpdateCustomer } from './factories/customer/customer.update'
import { updateCustomerSchema } from './useCase/customer/update/dto'
import { ClinicCreate } from './factories/clinic/create'
import { clinicCreateDTO } from './useCase/clinic/create/dto'
import { AddressValidate } from './factories/address/address.validate'
import { DeleteClinic } from './factories/clinic/delete'
import { deleteClinicSchema } from './useCase/clinic/delete/dto'
import { addressValidateSchema } from './useCase/address/validate/address.validate.dto'
import { updateAddress } from './factories/address/update'
import { updateAddressSchema } from './useCase/address/update/dto'
import { Update } from './factories/clinic/update'
import { updateClinicSchema } from './useCase/clinic/update/dto'
import { createDentist } from './factories/dentist/create'
import { createDentistSchema } from './useCase/dentist/create/dto'
import { ListClinic } from './factories/clinic/list'

const routes = Router()

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
const deleteCustomer = DeleteCustomer()
const updateCustomer = UpdateCustomer()


const createClinic = ClinicCreate()
const deleteClinic = DeleteClinic()
const updateClinic = Update()
const listClinics = ListClinic()


const UpdateAddress = updateAddress()
const validateCep = AddressValidate()


const CreateDentist = createDentist()

routes.post('/login', schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))

// routes for customer
routes.post('/customer', schemaValidator(createCustomerSchema), (req: Request, res: Response) => createCustomer.execute(req, res))
routes.delete('/customer', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => deleteCustomer.execute(req, res))
routes.patch('/customer', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateCustomerSchema), (req: any, res: Response) => updateCustomer.execute(req, res))


//routes for clinic
routes.post('/clinic', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(clinicCreateDTO), (req, res) => createClinic.execute(req, res))
routes.delete('/clinic', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(deleteClinicSchema), (req, res) => deleteClinic.execute(req, res))
routes.patch('/clinic', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateClinicSchema), (req, res) => updateClinic.execute(req, res))
routes.get('/clinic/list',(req,res) => listClinics.execute(req,res))


//routes for address
routes.patch('/address', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateAddressSchema), (req, res) => UpdateAddress.execute(req, res))
routes.post('/address/validate-cep', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(addressValidateSchema), (req, res) => validateCep.execute(req, res))


//routes for dentist
routes.post('/dentist', schemaValidator(createDentistSchema), (req, res) => CreateDentist.execute(req, res))

export { routes }


