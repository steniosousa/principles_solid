export interface JwtContract {
    sign(userId: string): Promise<any>
}