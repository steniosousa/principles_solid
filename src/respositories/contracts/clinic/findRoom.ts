
export interface findRoom {
    findRoom(number: number, clinicId: string): Promise<boolean>
}