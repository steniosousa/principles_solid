import { Clinic } from "../../../entities/clinic";

export interface List {
    list(): Promise<Clinic[]>
}