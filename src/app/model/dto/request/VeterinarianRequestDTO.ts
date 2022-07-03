import { RoleRequestDTO } from "./RoleRequestDTO";

export class VeterinarianRequestDTO{
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: Date;
    email: string;
    crmv: string;
    username: string;
    password: string;
    roles: Set<RoleRequestDTO>;
}