import { NextFunction, Request, Response, Router } from 'express'
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
import { createServiceFactore } from './factories/service/create'
import { serviceListDTO } from './useCase/service/list/dto'
import { ListServiceFactore } from './factories/service/list'
import { UpdateService } from './factories/service/update'
import { serviceUpdateDTO } from './useCase/service/edit/dto'
import { ListDentist } from './factories/dentist/list'
import { findDentist } from './factories/dentist/find'
import { updateDentist } from './factories/dentist/update'
import { updateImage } from './factories/dentist/updateImage'
import { updateImageDentistSchema } from './useCase/dentist/updateImage/dto'
import { updateImageClinc } from './factories/clinic/updateImage'
import { createVacationFactore } from './factories/vacation/createVacation'
import { createVocationDto } from './useCase/vacation/create/dto'
import { findVacationFactore } from './factories/vacation/findVacation'

const routes = Router()

const iLogin = LoginFactore()
const createCustomer = MakeCustomerFactore()
const deleteCustomer = DeleteCustomer()
const updateCustomer = UpdateCustomer()


const createClinic = ClinicCreate()
const deleteClinic = DeleteClinic()
const updateClinic = Update()
const listClinics = ListClinic()
const updateImageClinic = updateImageClinc()


const UpdateAddress = updateAddress()
const validateCep = AddressValidate()


const CreateDentist = createDentist()
const recoverDentist = ListDentist()
const ifindDentist = findDentist()
const iupdateDentist = updateDentist()
const iUpdateImageDentist = updateImage()

const createService = createServiceFactore()
const listService = ListServiceFactore()
const editService = UpdateService()


const createVacation = createVacationFactore()
const findVacation = findVacationFactore()
routes.post('/login', schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))

// routes for customer
routes.post('/customer', schemaValidator(createCustomerSchema), (req: Request, res: Response) => createCustomer.execute(req, res))
routes.delete('/customer', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => deleteCustomer.execute(req, res))
routes.patch('/customer', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateCustomerSchema), (req: any, res: Response) => updateCustomer.execute(req, res))


//routes for clinic
routes.post('/create/clinic', schemaValidator(clinicCreateDTO), (req, res) => createClinic.execute(req, res))
routes.delete('/clinic/delete', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(deleteClinicSchema), (req, res) => deleteClinic.execute(req, res))
routes.patch('/clinic/update', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateClinicSchema), (req, res) => updateClinic.execute(req, res))
routes.get('/clinic/list', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => listClinics.execute(req, res))
routes.patch('/clinic/update/image/', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateImageDentistSchema), (req, res) => updateImageClinic.execute(req, res))


//routes for address
routes.patch('/address/update', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateAddressSchema), (req, res) => UpdateAddress.execute(req, res))
routes.post('/address/validate-cep', schemaValidator(addressValidateSchema), (req, res) => validateCep.execute(req, res))


//routes for dentist
routes.post('/create/dentist', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(createDentistSchema), (req, res) => CreateDentist.execute(req, res))
routes.get('/recover/dentist', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => recoverDentist.execute(req, res))
routes.get('/find/dentist', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => ifindDentist.execute(req, res))
routes.patch('/update/dentist', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => iupdateDentist.execute(req, res))
routes.patch('/update/image/dentist', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(updateImageDentistSchema), (req, res) => iUpdateImageDentist.execute(req, res))


routes.post('/service/create', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), (req, res) => createService.execute(req, res))
routes.get('/service/list', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(serviceListDTO), (req, res) => listService.execute(req, res))
routes.post('/service/update', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(serviceUpdateDTO), (req, res) => editService.execute(req, res))


routes.post('/vacation/create', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(createVocationDto), (req, res) => createVacation.execute(req, res))
routes.get('/vacation/find', (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), schemaValidator(createVocationDto), (req, res) => findVacation.execute(req, res))

export { routes }


