interface body {
    room: number,
    name: string,
    password: string,
    email: string,
}
export interface updateDentist {
    update(datas: body, doctorId: string): Promise<null>
}