import { test, expect, } from "vitest";
import { Customer } from "../../../entities/costumer";

test('Create a customer', () => {
    const iCustomer = new Customer({
        clinicId: 'oi',
        email: 'steniosousaf@gmail.com',
        name: 'stenio',
        password: 'stenio123',
        phone: '9877893076',
        profileImg:''
    })

    expect(iCustomer).toBeInstanceOf(Customer)

    expect(iCustomer.email).toEqual('steniosousaf@gmail.com')
    expect(iCustomer.name).toEqual('stenio')
    expect(iCustomer.clinicId).toEqual('oi')
    expect(iCustomer.password).toEqual('stenio123')
    expect(iCustomer.phone).toEqual('9877893076')
    expect(iCustomer.profileImg).toEqual('')
})

