import { CalendarResponseDTO } from "./CalendarResponseDTO";
import { Situation } from "../../enum/Situation";

export class VeterinarianResponseDTO{
    id: number;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: Date;
    email: string;
    situation: Situation;
    crmv: string;
    username: string;
    roles: Set<RoleResponseDTO>;
    calendar: CalendarResponseDTO;
}

export class RoleResponseDTO{
    id: number;
    roleName: string;
}