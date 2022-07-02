export class UserRequestDTO{
    name: string;
    email: string;
    username: string;
    password: string;
    role: Set<RoleRequestDTO>;
}

export class RoleRequestDTO{
    roleName: string;
}