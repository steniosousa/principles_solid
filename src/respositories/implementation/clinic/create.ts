import { Address } from "../../../entities/address";
import { findAddress } from "../../contracts/address/find";
import { clinicSave } from "../../contracts/clinic/create";
import { findByName } from "../../contracts/clinic/findByName";
import { Clinic } from "../../../entities/clinic";
import { addressSave } from "../../contracts/address/create";
import cep from 'cep-promise'
import { ValidateCep } from "../../contracts/address/valid.cep";
import { cnpj } from 'cpf-cnpj-validator';
import { validateCnpj } from "../../contracts/clinic/validate.cnpj";
import { prisma } from "../../prisma/prisma.service";
import bcrypt from 'bcryptjs'
export class ClinicCreateImplementation implements findAddress, clinicSave, findByName, addressSave, ValidateCep, validateCnpj {

    async findAddress(cep: string, street: string, number: number): Promise<Address | null> {
        try {
            const addressAlreadyExist = await prisma.address.findFirst({
                where: {
                    cep, street, number
                }
            })
            return addressAlreadyExist
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async findClinic(name: string): Promise<Clinic | null> {
        try {
            const addressAlreadyExist = await prisma.clinic.findFirst({
                where: {
                    name
                }
            })
            if (addressAlreadyExist) {
                const returnClinic = new Clinic({
                    addressId: addressAlreadyExist.addressId,
                    cnpj: addressAlreadyExist.cnpj,
                    name: addressAlreadyExist.name,
                    phone: addressAlreadyExist.phone,
                    id: addressAlreadyExist.id,
                    password: addressAlreadyExist.password,
                    email: addressAlreadyExist.email,
                    bio: addressAlreadyExist.bio,
                    photo: addressAlreadyExist.photo,
                    pay: addressAlreadyExist.pay
                })
                return returnClinic
            }
            return null

        } catch (error) {

            let message;
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }

    async validate(clinicCep: string): Promise<boolean> {
        try {
            const returnCep = await cep(clinicCep)
            return true
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }

    async validateCnpjInterface(cnpjRe: string): Promise<any> {
        try {
            const validate = cnpj.isValid(cnpjRe);
            return validate

        } catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }

    async save(clinic: Clinic, addressId: string): Promise<Clinic> {
        try {
            const hashPassword = await bcrypt.hash(clinic.password, 10)
            const newClinic = new Clinic({
                addressId: clinic.addressId,
                name: clinic.name,
                cnpj: clinic.cnpj,
                phone: clinic.phone,
                password: hashPassword,
                email: clinic.email,
                bio: clinic.bio,
                photo: clinic.photo,
                pay: clinic.pay
            })
            const newClinicSave = await prisma.clinic.create({
                data: {
                    id: newClinic.id,
                    addressId: newClinic.addressId,
                    name: newClinic.name,
                    cnpj: newClinic.cnpj,
                    phone: newClinic.phone,
                    password: newClinic.password,
                    email: newClinic.email,
                    bio: newClinic.bio
                }
            })
            const returnNewClinic: Clinic = new Clinic({
                addressId: newClinicSave.addressId,
                cnpj: newClinicSave.cnpj,
                name: newClinicSave.name,
                phone: newClinicSave.phone,
                id: newClinicSave.id,
                password: newClinicSave.password,
                email: newClinicSave.email,
                bio: newClinicSave.bio,
                photo: newClinicSave.photo,
                pay: newClinicSave.pay
            })
            return returnNewClinic
        } catch (error) {
            await prisma.address.delete({
                where: {
                    id: addressId
                }
            })
            let message = "Não foi possível executar operação";

            throw new Error(message)
        }

    }

    async saveAddress(address: Address): Promise<Address> {

        try {
            const newAddress = new Address({
                cep: address.cep,
                city: address.city,
                country: address.country,
                district: address.district,
                number: address.number,
                street: address.street,
            })
            const newAddressSave = await prisma.address.create({
                data: {
                    cep: newAddress.cep,
                    city: newAddress.city,
                    country: newAddress.country,
                    district: newAddress.district,
                    number: newAddress.number,
                    street: newAddress.street,
                    id: newAddress.id
                }
            })
            const saveAddress: Address = newAddressSave
            return saveAddress
        } catch (error) {
            let message
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }

    }




}