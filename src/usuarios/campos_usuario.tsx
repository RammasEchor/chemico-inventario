interface UserFields {
    name?: string,
    password?: string,
    rol?: string,
    email?: string,
    plant?: string,
    userKey?: string,
    aprobador1?: string,
    aprobador2?: string
}

const cols = [
    'Nombre',
    'Rol',
    'Email',
    'Planta',
    'CveUsuario'
]

enum Role {
    Cliente,
    Chemico,
    Admin
};

function getUserRoleFromString(rawString: string | null) {
    switch (rawString) {
        case "Admin": return Role.Admin
        case "Chemico": return Role.Chemico
        default: return Role.Cliente
    }
}

export type { UserFields }
export { cols, Role, getUserRoleFromString }

