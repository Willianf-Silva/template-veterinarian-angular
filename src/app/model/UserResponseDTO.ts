export class UserResponseDTO{
    id: number;
    name: string;
    email: string;
    username: string;
    active: boolean;
    role: Set<RoleResponseDTO>;
}

export class RoleResponseDTO{
    id: number;
    roleName: string;
}