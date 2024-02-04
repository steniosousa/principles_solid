import { Vacation } from "../../../entities/vacation";

export interface findVacation {
    find(doctorId: string): Promise<Vacation | null>
}