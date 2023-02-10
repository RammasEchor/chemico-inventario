interface UserFields {
    name?: string,
    password?: string,
    rol?: string,
    email?: string,
    plant?: string,
    userKey?: string
}

const cols = [
    'Nombre',
    'Rol',
    'Email',
    'Planta',
    'CveUsuario'
]

export type { UserFields }
export { cols }

