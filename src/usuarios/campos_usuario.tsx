interface UserFields {
    [index: string]: string | undefined,
    id: string,
    nombre: string,
    contraseña: string,
    rol: string,
    email: string,
    planta: string,
    cveUsuario: string,
    aprobador1: string,
    aprobador2: string,
    monto_aprobador: string
}

const cols = [
    'Nombre',
    'Rol',
    'Email',
    'Planta',
    'CveUsuario'
]

enum Role {
    UsuarioGen,
    Cliente,
    Aprobador,
    Chemico,
    Admin
};

function getUserRoleFromString(rawString: string | null) {
    switch (rawString) {
        case "Admin": return Role.Admin
        case "Chemico": return Role.Chemico
        case "Aprobador": return Role.Aprobador
        case "Cliente": return Role.Cliente
        default: return Role.UsuarioGen
    }
}

export type { UserFields }
export { cols, Role, getUserRoleFromString }

