import { Situation } from "../../enum/Situation";

export class ClientResponseDTO{
    id: number;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: Date;
    email: string;
    situation: Situation;
    apelido: string;
}