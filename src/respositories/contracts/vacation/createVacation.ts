import { Vacation } from "../../../entities/vacation";

export interface createVacation {
    create(start: Date, end: Date, reason: string, doctorId: string): Promise<Vacation>
}